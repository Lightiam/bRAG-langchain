"""
XyLo.Dev: Simple Groq API Integration Example

This script demonstrates how to use the Groq API with langchain for RAG applications.
"""

import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings

# Load environment variables
load_dotenv()

# Set up Groq API key
groq_api_key = os.getenv('GROQ_API_KEY')
if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found in environment variables. Please set it in your .env file.")

os.environ['GROQ_API_KEY'] = groq_api_key

# Set up Groq model
groq_model = "llama3-70b-8192"

# Initialize Groq LLM
llm = ChatGroq(model_name=groq_model, temperature=0.1)

# Use HuggingFace embeddings as an alternative to OpenAI embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

def get_response(prompt):
    """
    Get a response from the Groq LLM.
    
    Args:
        prompt (str): The prompt to send to the LLM.
        
    Returns:
        str: The response from the LLM.
    """
    response = llm.invoke(prompt)
    return response.content

if __name__ == "__main__":
    # Example usage
    prompt = "What is Retrieval-Augmented Generation (RAG) and how does it work?"
    response = get_response(prompt)
    print(f"Prompt: {prompt}")
    print(f"Response: {response}")
