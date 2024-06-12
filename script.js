document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById('photo-button').addEventListener('click', function() {
    document.getElementById('photo-input').click();
});

document.getElementById('photo-input').addEventListener('change', sendPhoto);

document.getElementById('call-button').addEventListener('click', function() {
    startCall('Voice Call');
});

document.getElementById('video-call-button').addEventListener('click', function() {
    startCall('Video Call');
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText === '') return;

    const chatBox = document.getElementById('chat-box');

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sent');
    messageElement.innerText = messageText;
    chatBox.appendChild(messageElement);

    // Respond to the message
    setTimeout(() => {
        const replyText = getReply(messageText);
        const replyElement = document.createElement('div');
        replyElement.classList.add('message', 'received');
        replyElement.innerText = replyText;
        chatBox.appendChild(replyElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);

    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const chatBox = document.getElementById('chat-box');
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.maxWidth = '100%';
            imgElement.classList.add('message', 'sent');

            chatBox.appendChild(imgElement);

            // Respond to the photo
            setTimeout(() => {
                const replyElement = document.createElement('div');
                replyElement.classList.add('message', 'received');
                replyElement.innerText = "Wow, great picture!";
                chatBox.appendChild(replyElement);
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 1000);

            chatBox.scrollTop = chatBox.scrollHeight;
        }
        reader.readAsDataURL(file);
    }
}

function startCall(callType) {
    const chatBox = document.getElementById('chat-box');
    const ringtone = document.getElementById('ringtone');

    // Create call box element
    const callBox = document.createElement('div');
    callBox.classList.add('call-box');
    callBox.innerText = `${callType} is happening...`;
    
    // Create call decline button
    const declineButton = document.createElement('button');
    declineButton.innerText = 'End Call';
    declineButton.addEventListener('click', function() {
        callBox.remove();
        ringtone.pause();
        ringtone.currentTime = 0;
    });
    
    callBox.appendChild(declineButton);
    chatBox.appendChild(callBox);

    // Play the ringtone sound
    ringtone.play();

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Display the call box
    callBox.style.display = 'block';
}

function getReply(message) {
    const responses = {
        "hi": "Hello! How can I help you today?",
        "hello": "Hi there! What can I do for you?",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "what is your name": "I'm Tandem Chat Application.",
        "bye": "Goodbye! Have a great day!",
        "can you guess where i'm from": "You from Vavuniya, Right..",
        "who designed you?": "I designed by Anoshan Yoganathan.",
        "can i make a call to you?": "Yeah, please.",
        "can i make a video call to you?": "Yeah, of course."


        // Add more responses as needed
    };

    // Simple response logic
    const lowerCaseMessage = message.toLowerCase();
    return responses[lowerCaseMessage] || "I'm not sure how to respond to that.";
}
