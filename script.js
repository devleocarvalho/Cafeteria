// Header Scroll & Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.topo');
    if (window.scrollY > 50) {
        header.style.height = '70px';
        header.style.background = 'rgba(10, 7, 5, 0.98)';
        header.style.padding = '0 3%';
    } else {
        header.style.height = '80px';
        header.style.background = 'var(--glass-dark)';
        header.style.padding = '0 5%';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Section Reveal Animation
const revealSections = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, main > div').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
};

document.addEventListener('DOMContentLoaded', revealSections);

// Chatbot Logic
function toggleChat() {
    const chat = document.getElementById('chat-container');
    chat.classList.toggle('active');
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        appendMessage('user', message);
        input.value = '';
        
        // Show typing indicator or delay response
        setTimeout(() => {
            respondToUser(message);
        }, 800);
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
    const msg = message.toLowerCase();
    let response = "Lamento, não entendi sua solicitação. Gostaria de saber sobre nossos horários, localização ou ver o cardápio?";

    if (msg.includes('horário') || msg.includes('aberto')) {
        response = 'Estamos abertos de Terça a Sábado das 07:00 às 22:00, e aos Domingos das 08:00 às 22:00. Na Segunda-feira, nossa casa está fechada para manutenção de nossos grãos.';
    } else if (msg.includes('endereço') || msg.includes('onde') || msg.includes('local')) {
        response = 'Você pode nos encontrar na Av. Ayrton Senna, 3000, Barra da Tijuca, Rio de Janeiro. Será um prazer recebê-lo!';
    } else if (msg.includes('cardápio') || msg.includes('menu') || msg.includes('café')) {
        response = 'Nosso cardápio conta com grãos selecionados e torra artesanal. Você pode visualizá-lo clicando no link "CARDÁPIO" em nossa navegação superior.';
    } else if (msg.includes('olá') || msg.includes('oi')) {
        response = 'Olá! Sou seu assistente Madrid. Como posso ajudá-lo hoje?';
    } else if (msg.includes('obrigado') || msg.includes('vlw')) {
        response = 'Por nada! Esperamos por você na Madrid Coffee House.';
    }

    appendMessage('bot', response);
}

// WiFi Logic
document.getElementById('wifi-button').addEventListener('click', function() {
    const passwordSpan = document.getElementById('wifi-password');
    if (passwordSpan.style.display === 'none') {
        passwordSpan.style.display = 'block';
        this.textContent = 'Ocultar Senha';
    } else {
        passwordSpan.style.display = 'none';
        this.textContent = 'Conexão Wi-Fi Grátis';
    }
});