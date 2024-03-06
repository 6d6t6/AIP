const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Function to send a message to the chatbot
function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    displayMessage(userMessage, true); // Display user's message in chat
    userInput.value = ''; // Clear input field
    // Send user's message to the chatbot and display response
    // Replace the following line with your actual code to send message to Cohere API
    // For testing, we'll just echo the user's message back as the response
    displayMessage(`Echo: ${userMessage}`, false); // Display chatbot's response
  }
}

// Function to display a message in the chat interface
function displayMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.className = isUser ? 'user-message' : 'chatbot-message';
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom of chat box
}
