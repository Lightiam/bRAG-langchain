// Client-side Groq API integration
// This is a secure implementation that doesn't expose API keys in client-side code

// Sample documents for context - in production, these would come from a vector database
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

// Function to get relevant documents based on the query
export const getRelevantDocuments = (message) => {
  // Simple relevance matching
  const relevantDocs = documents.filter(doc => 
    doc.content.toLowerCase().includes(message.toLowerCase().substring(0, 5))
  ).slice(0, 2);
  
  // If no relevant docs found, use the first two documents
  return relevantDocs.length > 0 ? relevantDocs : documents.slice(0, 2);
};

// Function to generate response - in production, this would call a secure backend API
export const generateResponse = async (message) => {
  try {
    // Get relevant documents
    const docsToUse = getRelevantDocuments(message);
    
    // Create context from relevant documents
    const context = docsToUse.map(doc => doc.content).join('\n\n');
    
    // In a production environment, we would make a secure API call to a backend
    // that has access to the API keys. For this demo, we'll use a mock response.
    
    // Mock response generation
    const mockResponses = [
      `Based on the information available, XyLo.Dev provides state-of-the-art language models and AI assistance for various use cases including customer support, research, content creation, and data analysis.`,
      `XyLo.Dev is an advanced AI platform that leverages the latest advancements in artificial intelligence to deliver accurate and helpful responses to your queries.`,
      `According to our documentation, XyLo.Dev uses vector embeddings to efficiently retrieve relevant information from knowledge bases, making it a powerful tool for information retrieval and analysis.`,
      `XyLo.Dev can assist you with various tasks such as answering questions, generating content, analyzing data, and providing insights based on the information available.`
    ];
    
    // Select a response based on the message content
    const responseIndex = Math.floor(message.length % mockResponses.length);
    
    return {
      response: mockResponses[responseIndex],
      sources: docsToUse
    };
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please try again.');
  }
};
