const { exec } = require('child_process');
const apiKey = process.env.COHERE_API_KEY; // Retrieve API key from environment variable

// Function to send a message to the Cohere AI API using cURL
async function sendToCohere(message) {
  if (!apiKey) {
    console.error('COHERE_API_KEY environment variable not set');
    return;
  }

  // Construct the cURL command with the appropriate parameters
  const curlCommand = `curl --location --request POST 'https://api.cohere.ai/v1/chat' \
    --header 'Authorization: Bearer ${apiKey}' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "model": "command",
        "message": "${message}",
        "temperature": 0.3,
        "chat_history": [],
        "prompt_truncation": "AUTO",
        "stream": true,
        "citation_quality": "accurate",
        "connectors": [{"id":"web-search"}],
        "documents": []
      }'`;

  // Execute the cURL command
  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Response: ${stdout}`);
  });
}

module.exports = { sendToCohere };
