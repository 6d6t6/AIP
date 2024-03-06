// cohere_api.js
const apiKey = env.COHERE_API_KEY; // Retrieve API key from environment variable

// Function to send a message to the Cohere AI API using fetch
async function sendToCohere(message) {
  if (!apiKey) {
    console.error('COHERE_API_KEY environment variable not set');
    return;
  }

  // Construct the request body
  const requestBody = JSON.stringify({
    model: 'command',
    message: message,
    temperature: 0.3,
    chat_history: [],
    prompt_truncation: 'AUTO',
    stream: true,
    citation_quality: 'accurate',
    connectors: [{ id: 'web-search' }],
    documents: []
  });

  try {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Cohere');
    }

    const responseData = await response.json();
    console.log('Response from Cohere:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error sending message to Cohere:', error);
    throw error;
  }
}

export { sendToCohere };
