function toggleChat() {
    document.getElementById('chat-container').classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        appendMessage('user', message);
        input.value = '';
        setTimeout(() => {
            respondToUser(message);
        }, 1000);
    }
}

function appendMessage(sender, text) {
    const chatBody = document.getElementById('chat-body');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerHTML = `<span class="message-bubble">${text}</span>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function respondToUser(message) {
    let response = "Desculpe, não entendi. Tente perguntar sobre 'horário', 'endereço' ou 'cardápio'.";
    if (message.toLowerCase().includes('horário')) {
        response = 'Nosso horário de funcionamento é de Terça a Domingo, das 07:00 às 22:00.';
    } else if (message.toLowerCase().includes('endereço')) {
        response = 'Estamos localizados na Av Ayrton Senna, 3000 - Barra da Tijuca - Rio de Janeiro.';
    } else if (message.toLowerCase().includes('cardápio')) {
        response = 'Você pode ver nosso cardápio completo clicando em "CARDÁPIO" no topo da página!';
    }
    appendMessage('bot', response);
}

document.getElementById('wifi-button').addEventListener('click', function() {
    const passwordSpan = document.getElementById('wifi-password');
    if (passwordSpan.style.display === 'none') {
        passwordSpan.style.display = 'inline-block';
    } else {
        passwordSpan.style.display = 'none';
    }
});