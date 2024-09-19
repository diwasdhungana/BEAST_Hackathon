import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from langchain_groq import ChatGroq
from langchain.chains import LLMChain, ConversationChain
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
# from langchain.memory import ConversationBufferWindowMemory
import logging
import traceback

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
os.environ["GROQ_API_KEY"]="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"
# Load environment variables and set up API keys
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    logger.error("GROQ_API_KEY is not set in the environment variables")
    raise ValueError("GROQ_API_KEY is not set")

app = FastAPI(title="Nepali College Recommendation and Chat System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Update this with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserPreferences(BaseModel):
    stream: str
    subjects: str
    interest: str
    location: Optional[str] = None
    study_mode: Optional[str] = None

class CollegeRecommendation(BaseModel):
    name: str
    location: str
    eligibility_criteria: List[str]
    course_duration: str
    tuition_fees: str
    programs_offered: List[str]
    scholarships_offered: List[str]
    contact: Dict[str, str]

class ChatInput(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class CollegeRecommender:
    def __init__(self):
        try:
            self.llm = ChatGroq(groq_api_key=GROQ_API_KEY, model_name='llama3-70b-8192')
            logger.info("ChatGroq initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing ChatGroq: {str(e)}")
            raise

    def query_formulation_agent(self, user_preferences: UserPreferences) -> str:
        try:
            query_prompt = PromptTemplate(
                input_variables=["stream", "subjects", "interest", "location", "study_mode"],
                template="""
                Based on the following user preferences, formulate a query to find the top 5 best colleges in Nepal for this student:

                Stream: {stream}
                Subjects: {subjects}
                Interest: {interest}
                Preferred Location: {location}
                Study Mode: {study_mode}

                The query should aim to find colleges that best match these preferences, considering factors such as:
                - Relevance to the student's stream and subjects
                - Alignment with the student's interest
                - Location preference (if specified)
                - Available study modes
                - Potential for career growth and opportunities in Nepal

                Formulated Query:
                """
            )
            query_chain = LLMChain(llm=self.llm, prompt=query_prompt)
            formulated_query = query_chain.run(
                stream=user_preferences.stream,
                subjects=user_preferences.subjects,
                interest=user_preferences.interest,
                location=user_preferences.location or "Any location in Nepal",
                study_mode=user_preferences.study_mode or "Any study mode"
            )
            logger.info(f"Formulated query: {formulated_query}")
            return formulated_query
        except Exception as e:
            logger.error(f"Error in query_formulation_agent: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    def get_detailed_college_info(self, college_basic_info: str, user_preferences: UserPreferences) -> Dict[str, Any]:
        try:
            detail_prompt = PromptTemplate(
                input_variables=["college_info", "stream", "subjects", "interest"],
                template="""
                Provide detailed information for the following college in Nepal:

                {college_info}

                The student is interested in the {stream} stream, specifically in {subjects}, with a focus on {interest}.

                Include the following details:
                1. Eligibility Criteria (be specific)
                2. Course Duration (Specify the exact duration, e.g., "4 years" for a bachelor's degree)
                3. Average Tuition Fees (Provide a specific amount or range in Nepali Rupees)
                4. Programs Offered (focus on programs related to the student's stream, subjects, and interest)
                5. Scholarships Offered (be specific about types and criteria)
                6. Contact Information (Provide a phone number, email, and full address)

                If you don't have specific information for any field, provide a realistic estimate based on typical values for colleges in Nepal offering programs in the student's chosen stream. Do not leave any field blank or use phrases like "Not specified".

                Present the information in this format:

                Eligibility Criteria:
                - [Criterion 1]
                - [Criterion 2]

                Course Duration: [Duration]

                Average Tuition Fees: [Fees]

                Programs Offered:
                - [Program 1]
                - [Program 2]
                - [Program 3]

                Scholarships Offered:
                - [Scholarship 1]
                - [Scholarship 2]

                Contact:
                Phone: [Phone Number]
                Email: [Email Address]
                Address: [Full Address]
                """
            )
            detail_chain = LLMChain(llm=self.llm, prompt=detail_prompt)
            college_details = detail_chain.run(
                college_info=college_basic_info,
                stream=user_preferences.stream,
                subjects=user_preferences.subjects,
                interest=user_preferences.interest
            )
            logger.info(f"Generated college details for {college_basic_info}")
            return self.parse_college_details(college_basic_info, college_details)
        except Exception as e:
            logger.error(f"Error in get_detailed_college_info: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    def parse_college_details(self, college_basic_info: str, details: str) -> Dict[str, Any]:
        try:
            college = {
                "name": college_basic_info.split(',')[0].strip(),
                "location": college_basic_info.split(',')[1].strip() if ',' in college_basic_info else "Location not specified",
                "eligibility_criteria": [],
                "course_duration": "",
                "tuition_fees": "",
                "programs_offered": [],
                "scholarships_offered": [],
                "contact": {}
            }

            current_section = ""
            for line in details.split("\n"):
                line = line.strip()
                if "Eligibility Criteria:" in line:
                    current_section = "eligibility_criteria"
                elif "Course Duration:" in line:
                    current_section = "course_duration"
                elif "Average Tuition Fees:" in line:
                    current_section = "tuition_fees"
                elif "Programs Offered:" in line:
                    current_section = "programs_offered"
                elif "Scholarships Offered:" in line:
                    current_section = "scholarships_offered"
                elif "Contact:" in line:
                    current_section = "contact"
                elif line.startswith("-") and current_section in ["eligibility_criteria", "programs_offered", "scholarships_offered"]:
                    college[current_section].append(line[1:].strip())
                elif ":" in line and current_section == "contact":
                    key, value = line.split(":", 1)
                    college["contact"][key.strip().lower()] = value.strip()
                elif current_section in ["course_duration", "tuition_fees"] and line:
                    college[current_section] = line

            logger.info(f"Parsed college details for {college['name']}")
            return college
        except Exception as e:
            logger.error(f"Error in parse_college_details: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    def post_process_recommendations(self, colleges: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        try:
            processed_colleges = []
            for college in colleges:
                # Ensure all required fields are present
                required_fields = ['name', 'location', 'eligibility_criteria', 'course_duration', 'tuition_fees', 'programs_offered', 'scholarships_offered', 'contact']
                for field in required_fields:
                    if field not in college or not college[field]:
                        college[field] = "Information not available"

                # Standardize contact information
                contact_fields = ['phone', 'email', 'address']
                for field in contact_fields:
                    if field not in college['contact']:
                        college['contact'][field] = "Not provided"

                # Remove duplicates from lists
                for field in ['eligibility_criteria', 'programs_offered', 'scholarships_offered']:
                    college[field] = list(dict.fromkeys(college[field]))

                processed_colleges.append(college)

            logger.info(f"Post-processed {len(processed_colleges)} college recommendations")
            return processed_colleges
        except Exception as e:
            logger.error(f"Error in post_process_recommendations: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    def improved_recommendation_agent(self, formulated_query: str, user_preferences: UserPreferences) -> List[Dict[str, Any]]:
        try:
            college_list_prompt = PromptTemplate(
                input_variables=["query", "stream", "subjects", "location"],
                template="""
                Based on the following query and user preferences, provide a list of the top 5 colleges in Nepal that best match the student's preferences:

                Query: {query}
                Stream: {stream}
                Subjects: {subjects}
                Preferred Location: {location}

                For each college, provide only the name and location:

                1. [College Name], [Location]
                2. [College Name], [Location]
                3. [College Name], [Location]
                4. [College Name], [Location]
                5. [College Name], [Location]

                Ensure that the colleges are relevant to the student's chosen stream and subjects.
                """
            )
            college_list_chain = LLMChain(llm=self.llm, prompt=college_list_prompt)
            college_list = college_list_chain.run(
                query=formulated_query,
                stream=user_preferences.stream,
                subjects=user_preferences.subjects,
                location=user_preferences.location or 'Any location in Nepal'
            )

            logger.info(f"Generated college list: {college_list}")

            colleges = []
            for college_info in college_list.split("\n"):
                if college_info.strip():
                    colleges.append(self.get_detailed_college_info(college_info.strip(), user_preferences))

            return self.post_process_recommendations(colleges)
        except Exception as e:
            logger.error(f"Error in improved_recommendation_agent: {str(e)}")
            logger.error(traceback.format_exc())
            raise

# class CollegeChatbot:
#     def __init__(self):
#         try:
#             self.llm = ChatGroq(groq_api_key=GROQ_API_KEY, model_name='llama3-70b-8192')
#             self.memory = ConversationBufferMemory(return_messages=True, input_key=input, output_key="output")
#             self.prompt = PromptTemplate(
#                 input_variables=["history", "input"],
#                 template="""
#                 You are an AI assistant specialized in helping students with college-related queries in Nepal. 
#                 You have knowledge about various colleges, courses, admission processes, and general higher education information in Nepal.

#                 Previous conversation:
#                 {history}

#                 Human: {input}
#                 AI Assistant: """
#             )
#             self.conversation = ConversationChain(
#                 llm=self.llm,
#                 memory=self.memory,
#                 prompt=self.prompt,
#                 verbose=True
#             )
#             logger.info("Chatbot initialized successfully")
#         except Exception as e:
#             logger.error(f"Error initializing Chatbot: {str(e)}")
#             raise

#     def get_response(self, message: str) -> str:
#         try:
#             print("this is from get_response", message)
#             response = self.conversation({input: message})
#             return response['response']
#         except Exception as e:
#             logger.error(f"Error in chatbot response generation: {str(e)}")
#             logger.error(traceback.format_exc())
#             raise

class CollegeChatbot:
    def __init__(self):
        try:
            self.llm = ChatGroq(groq_api_key=GROQ_API_KEY, model_name='llama3-70b-8192')
            self.memory = ConversationBufferMemory(return_messages=True, input_key="input", output_key="response")
            self.prompt = PromptTemplate(
                input_variables=["history", "input"],
                template="""
                You are an AI assistant specialized in helping students with college-related queries in Nepal. 
                You have knowledge about various colleges, courses, admission processes, and general higher education information in Nepal.

                Previous conversation:
                {history}

                Human: {input}
                AI Assistant: """
            )
            self.conversation = ConversationChain(
                llm=self.llm,
                memory=self.memory,
                prompt=self.prompt,
                verbose=True
            )
            logger.info("Chatbot initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing Chatbot: {str(e)}")
            raise

    def get_response(self, message: str) -> str:
        try:
            print("this is from get_response", message)
            response = self.conversation({"input": message})
            return response['response']
        except Exception as e:
            logger.error(f"Error in chatbot response generation: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    

recommender = CollegeRecommender()
chatbot = CollegeChatbot()

@app.post("/recommend", response_model=List[CollegeRecommendation])
async def recommend_colleges(user_preferences: UserPreferences):
    try:
        logger.info(f"Received recommendation request: {user_preferences}")
        formulated_query = recommender.query_formulation_agent(user_preferences)
        college_recommendations = recommender.improved_recommendation_agent(formulated_query, user_preferences)
        logger.info(f"Generated {len(college_recommendations)} college recommendations")
        return college_recommendations
    except Exception as e:
        logger.error(f"Error in recommend_colleges endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.post("/chatbot", response_model=ChatResponse)
async def chat_with_bot(chat_input: ChatInput):
    print("this is chat input", chat_input)
    try:
        # logger.info(f"Received chat message: {chat_input.message}")
        # logger.info(f"ChatInput object: {chat_input}")
        response = chatbot.get_response(chat_input.message)
        logger.info(f"Generated chatbot response: {response}")
        # response = "this is message from backend."
        return ChatResponse(response=response)
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        logger.error(f"Full traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.get("/test")
async def test_endpoint():
    return {"message": "Test endpoint is working"}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server on http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)