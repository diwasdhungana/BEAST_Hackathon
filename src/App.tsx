import { useState } from "react";
import axios from "axios";
import CourseSelector from "./pages/course";
import Location from "./pages/location";
import ProgramSelector from "./pages/program";
import { Button } from "./components/ui/button";
import CarouselPage from "./pages/carosel";
import { cardsData } from "@/dummydata/colleges";
import Modal from "./components/modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { ScrollArea } from "./components/ui/scroll-area";
import { Bot, MessageCircle, Send, User, Loader2 } from "lucide-react"; // Added Loader2 for rotating circle
import { Textarea } from "./components/ui/textarea";

// Loading Animation Component
const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-2xl font-bold animate-bounce">Loading</div>
      <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      <div className="text-lg">Analyzing...</div>
      <div className="text-lg">Optimizing Outputs...</div>
    </div>
  );
};

// Chat Loading Component (rotating circle)
const ChatLoading = () => {
  return (
    <div className="flex justify-center mt-4">
      <Loader2 className="animate-spin text-blue-500 w-6 h-6" />
    </div>
  );
};

type Message = {
  content: string;
  isUser: boolean;
};

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dataIndex, setDataIndex] = useState<number>();
  const [caroselCardData, setCaroselCardData] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // Main loading state
  const [chatLoading, setChatLoading] = useState(false); // Chat loading state

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! How can I assist you with your college search today?",
      isUser: false,
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = async () => {
    const formData = {
      subjects: selectedSubjects,
      stream,
      intrest: program,
      location,
    };

    setIsLoading(true); // Start loading

    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:8000/recommend",
    //     formData
    //   );
    //   console.log("Form submitted successfully:", response.data);
    //   setCaroselCardData(response.data);
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // } finally {
    //   setIsLoading(false); // Stop loading
    // }

    try {
      // Simulating server response with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay
      console.log("Form submitted successfully");

      // Set caroselCardData to local cardsData
      setCaroselCardData(cardsData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prev) => [...prev, { content: inputMessage, isUser: true }]);
    setInputMessage("");
    setChatLoading(true); // Show chat loading

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content:
            "Thank you for your question. I'm here to help you with your college search. Could you please provide more details about what you're looking for in a college?",
          isUser: false,
        },
      ]);
      setChatLoading(false); // Hide chat loading
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-red-50 flex flex-col justify-start items-center relative">
      <header className="w-full text-center py-12">
        <h1 className="text-3xl font-bold mb-3">What Next?</h1>
        <h3 className="text-lg text-gray-700">
          A guide for highschool graduates in Nepal
        </h3>
      </header>

      {/* Main Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <LoadingAnimation />
        </div>
      ) : (
        <main className="w-full flex flex-col items-center gap-8">
          <section className="w-full flex flex-col items-center">
            <CourseSelector
              props={{
                selectedSubjects,
                setSelectedSubjects,
                stream,
                setStream,
              }}
            />
          </section>

          <section className="w-[400px] flex flex-col items-center">
            <Location props={{ location, setLocation }} />
          </section>

          <section className="w-[400px] flex flex-col items-center">
            <ProgramSelector
              props={{ program, setProgram, selectedSubjects }}
            />
          </section>

          <Button
            onClick={handleSubmit}
            disabled={!stream || !location || program === ""}
            variant="default"
          >
            Submit
          </Button>
        </main>
      )}

      <div className="mt-8 w-full">
        <CarouselPage
          props={{ cardsData: caroselCardData, setModalOpen, setDataIndex }}
        />
        {dataIndex !== undefined && (
          <Modal
            props={{
              cardsData: caroselCardData,
              dataIndex: dataIndex,
              modalOpen,
              setModalOpen,
            }}
          />
        )}
      </div>

      {/* Chatbot Icon */}
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chatbot Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[700px] bg-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Chat with our College Advisor
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-[500px]">
            <ScrollArea className="flex-grow pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.isUser ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        message.isUser ? "ml-2" : "mr-2"
                      }`}
                    >
                      {message.isUser ? (
                        <User className="h-8 w-8 text-blue-500" />
                      ) : (
                        <Bot className="h-8 w-8 text-green-500" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg shadow ${
                        message.isUser
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <div className="break-words whitespace-pre-wrap overflow-wrap break-word word-break break-all">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {chatLoading && <ChatLoading />}{" "}
              {/* Show loading spinner in chat */}
            </ScrollArea>
            <div className="flex items-center mt-4">
              <Textarea
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-grow min-h-[100px] bg-white"
              />
              <Button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
