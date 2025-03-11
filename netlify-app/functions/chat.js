// Simple mock implementation to avoid API authentication issues
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
    
    // Mock documents for demonstration
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
    
    // Generate mock response based on query
    let response;
    
    if (message.toLowerCase().includes('feature') || message.toLowerCase().includes('offer')) {
      response = "XyLo.Dev offers a range of advanced AI features including natural language understanding, contextual responses, and knowledge retrieval capabilities. Our platform can assist with research, content creation, data analysis, and customer support tasks.";
    } else if (message.toLowerCase().includes('how') || message.toLowerCase().includes('work')) {
      response = "XyLo.Dev works by combining state-of-the-art language models with vector-based knowledge retrieval. When you ask a question, our system searches for relevant information in our knowledge base and uses AI to generate accurate, helpful responses.";
    } else if (message.toLowerCase().includes('benefit') || message.toLowerCase().includes('advantage')) {
      response = "The benefits of XyLo.Dev include faster information retrieval, more accurate responses, and the ability to handle complex queries. Our technology saves time and improves productivity by providing instant access to knowledge.";
    } else {
      response = "XyLo.Dev is an advanced AI assistant that can help with a wide range of tasks. Our technology combines powerful language models with knowledge retrieval capabilities to provide accurate, helpful responses to your questions.";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        response: response,
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
