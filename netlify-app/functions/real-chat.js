import dotenv from 'dotenv';
import { ChatGroq } from '@langchain/groq';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { PineconeClient } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/pinecone';

// Load environment variables
dotenv.config();

// Initialize Groq LLM
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-70b-8192",
  temperature: 0.1,
});

// Initialize embeddings model
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.LANGCHAIN_API_KEY,
  model: "sentence-transformers/all-mpnet-base-v2",
});

// Initialize Pinecone client
const pinecone = new PineconeClient();

// Function to initialize Pinecone
const initPinecone = async () => {
  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_API_HOST.split('.')[1],
  });
  
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
  return pineconeIndex;
};

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    // Parse the request body
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
    
    // For now, use mock data since we don't have a real Pinecone index set up
    const documents = [
      {
        content: "XyLo.Dev provides advanced AI assistance with state-of-the-art language models.",
        metadata: {
          source: "XyLo.Dev Documentation",
          score: 0.95
        }
      },
      {
        content: "Our technology leverages the latest advancements in artificial intelligence to deliver accurate and helpful responses.",
        metadata: {
          source: "XyLo.Dev Technology Overview",
          score: 0.87
        }
      },
      {
        content: "XyLo.Dev can be used in various scenarios such as customer support, research assistance, content creation, and data analysis.",
        metadata: {
          source: "XyLo.Dev Use Cases",
          score: 0.92
        }
      },
      {
        content: "The XyLo.Dev architecture uses vector embeddings to efficiently retrieve relevant information from knowledge bases.",
        metadata: {
          source: "XyLo.Dev Technical Whitepaper",
          score: 0.97
        }
      }
    ];
    
    // Simulate document retrieval based on query
    const relevantDocs = documents.filter(doc => 
      doc.content.toLowerCase().includes(message.toLowerCase().substring(0, 5))
    ).slice(0, 2);
    
    // If no relevant docs found, use the first two documents
    const docsToUse = relevantDocs.length > 0 ? relevantDocs : documents.slice(0, 2);
    
    // Generate context from relevant documents
    const context = docsToUse.map(doc => doc.content).join('\n\n');
    
    // Create prompt with context
    const prompt = `
You are XyLo.Dev, an advanced AI assistant. Use the following context to answer the user's question.
If the context doesn't contain relevant information, just answer based on your knowledge.

CONTEXT:
${context}

USER QUESTION:
${message}

ANSWER:
`;
    
    // Get response from Groq
    const response = await llm.invoke(prompt);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        response: response.content,
        sources: docsToUse
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Error:', error.message, error.stack);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};
