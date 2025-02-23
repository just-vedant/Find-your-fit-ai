// Select chatbot elements
const chatButton = document.getElementById("chatbot-button");
const chatContainer = document.getElementById("chatbot-container");
const minimizeChat = document.getElementById("minimize-chat");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

// ✅ Hide or show chatbot when clicking the chat button
chatButton.addEventListener("click", function () {
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "flex"; // Show chatbot
    } else {
        chatContainer.style.display = "none"; // Hide chatbot
    }
});

// ✅ Hide chatbot when minimize button is clicked
minimizeChat.addEventListener("click", function () {
    chatContainer.style.display = "none";
});

// ✅ Function to send messages to Gemini API
async function getGeminiResponse(userInput) {
    const GEMINI_API_KEY = "AIzaSyB91YbLca7ji9PXVISct-tmlFDl5OTqy2A";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
        contents: [{ role: "user", parts: [{ text: userInput }] }]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log("Gemini API Response:", data); // Debugging

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return `Error: ${data.error.message}`;
        }

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
        } else {
            return "No response received.";
        }
    } catch (error) {
        console.error("Error fetching response:", error);
        return "Error: Unable to fetch response.";
    }
}


function formatText(text) {
    // Prevent unwanted HTML tag display and ensure safe formatting
    const tempDiv = document.createElement("div");
    tempDiv.innerText = text;  // Encode raw text to prevent HTML injection
    let safeText = tempDiv.innerHTML; // Get safe HTML version

    return safeText
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
        .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // Convert *bold* to <strong>
        .replace(/_(.*?)_/g, "<em>$1</em>") // Convert _italic_ to <em>
        .replace(/`(.*?)`/g, "<code>$1</code>") // Convert `code` to <code>
        .replace(/<strong><\/strong>/g, ""); // Remove empty <strong> tags
}

async function sendMessage() {
    const userText = chatInput.value.trim();
    if (userText === "") return;

    // Add user message to chat
    const userMessageElement = document.createElement("div");
    userMessageElement.classList.add("user-message");
    userMessageElement.innerText = userText;
    chatMessages.appendChild(userMessageElement);
    chatInput.value = ""; 

    // Create bot message placeholder
    const botMessageElement = document.createElement("div");
    botMessageElement.classList.add("bot-message");
    botMessageElement.innerHTML = "Thinking...";
    chatMessages.appendChild(botMessageElement);

    // Fetch bot response
    const botResponse = await getGeminiResponse(userText);
    botMessageElement.innerHTML = formatText(botResponse);
    
    // Auto-scroll to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}



// ✅ Event listeners
sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") sendMessage();
});
