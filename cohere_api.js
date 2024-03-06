const { CohereClient } = require("cohere-ai");

const apiKey = process.env.COHERE_API_KEY;

const cohere = new CohereClient({
  token: apiKey,
});

(async () => {
  const stream = await cohere.chatStream({
    model: "command-nightly",
    message: "<YOUR MESSAGE HERE>",
    chatHistory: [],
    promptTruncation: "AUTO",
    citationQuality: "accurate",
    connectors: [{"id":"web-search"}],
    documents: []
  });

  for await (const chat of stream) {
      if (chat.eventType === "text-generation") {
          process.stdout.write(chat.text);
      }
  }
})();
