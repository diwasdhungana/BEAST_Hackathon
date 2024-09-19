Overview
The College Recommendation System is designed to help users find suitable colleges based on their preferences. It utilizes a React.js frontend for user interaction and a Python backend with FastAPI for processing and generating recommendations.
System Architecture
The system consists of the following components:

User Interface (React.js)
FastAPI Backend
Query Formulation Module
LLM (Language Model) Output with Relevance Check
Data Scraping Module

The flow of data is as follows:

User inputs preferences through the UI
FastAPI processes the input
Query Formulation Module generates prompts
LLM processes the prompts and scraped data
System outputs college recommendations and details

Technologies Used

Frontend: React.js
Backend: Python, FastAPI
Data Processing: Custom LLM implementation
Data Source: Web scraping (technology not specified)

Setup and Installation
Prerequisites

Node.js and npm (for React.js)
Python 3.8+
pip (Python package manager)



Frontend Setup


1. Install dependencies in this directory:
npm install

2.Start the development server:
npm run dev
go to provided host link



Backend Setup

1. Navigate to the pyscripts directory:
cd pyscripts

2. Create a virtual environment:
python -m venv venv

3.Activate the virtual environment:

On Windows: venv\Scripts\activate
On macOS and Linux: source venv/bin/activate

4.Install required packages
pip install -r requirements.txt

5.Start the FastAPI server:
uvicorn main:app --reload