const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Function to send a message to the chatbot
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage !== '') {
    displayMessage(userMessage, true); // Display user's message in chat
    userInput.value = ''; // Clear input field
    try {
      // Send user's message to the chatbot and display response
      const response = await sendToCohere(userMessage);
      displayMessage(response, false); // Display chatbot's response
    } catch (error) {
      console.error('Error sending message to Cohere:', error);
      displayMessage('Sorry, an error occurred. Please try again.', false);
    }
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

// Event listener to send message when 'Send' button is clicked
document.getElementById('send-button').addEventListener('click', sendMessage);
