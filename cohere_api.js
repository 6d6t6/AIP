const { CohereClient } = require("cohere-ai");

// Export a function to handle the API call
async function sendToCohere(message) {
  const apiKey = process.env.COHERE_API_KEY;
  const cohere = new CohereClient({
    token: apiKey,
  });

  const stream = await cohere.chatStream({
    model: "command-nightly",
    message: message,
    chatHistory: [],
    promptTruncation: "AUTO",
    citationQuality: "accurate",
    connectors: [{"id":"web-search"}],
    documents: []
  });

  for await (const chat of stream) {
      if (chat.eventType === "text-generation") {
          return chat.text; // Return the response from Cohere API
      }
  }
}

module.exports = { sendToCohere }; // Export the function
