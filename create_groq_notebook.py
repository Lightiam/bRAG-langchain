import nbformat
from nbformat.v4 import new_notebook, new_markdown_cell, new_code_cell

# Create a new notebook
nb = new_notebook()

# Add markdown and code cells
nb.cells.append(new_markdown_cell('# XyLo.Dev: RAG Implementation with Groq\n\nThis notebook demonstrates a complete implementation of a RAG system using Groq API instead of OpenAI.'))
nb.cells.append(new_code_cell('import os\nfrom dotenv import load_dotenv\n\n# Load environment variables\nload_dotenv()\n\n# Set up Groq API key\ngroq_api_key = os.getenv("GROQ_API_KEY")\nos.environ["GROQ_API_KEY"] = groq_api_key\n\n# Set up Groq model\ngroq_model = "llama3-70b-8192"'))
nb.cells.append(new_code_cell('from langchain_groq import ChatGroq\nfrom langchain_community.embeddings import HuggingFaceEmbeddings\n\n# Initialize Groq LLM\nllm = ChatGroq(model_name=groq_model, temperature=0.1)\n\n# Use HuggingFace embeddings as an alternative to OpenAI embeddings\nembeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")'))

# Write the notebook to a file
with open("notebooks/groq_rag_example.ipynb", "w") as f:
    nbformat.write(nb, f)

print("Groq example notebook created successfully!")
