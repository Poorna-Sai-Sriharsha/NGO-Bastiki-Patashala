// Initialize AOS (Animate On Scroll) for scroll-triggered animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Horizontal scrolling testimonials are handled by CSS animations

// Animated counters functionality
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        counter.innerText = '0';
        
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + '+';
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
});

// Progress bar animation
document.addEventListener('DOMContentLoaded', () => {
    const progressFill = document.querySelector('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            progressFill.style.width = '75%';
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.progress-bar'));
});

// Mobile navigation functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });
});

// Volunteer form validation
const volunteerForm = document.getElementById('volunteerForm');

volunteerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const fullname = document.getElementById('fullname');
    const fullnameError = document.getElementById('fullname-error');
    if (fullname.value.trim() === '') {
        fullnameError.classList.remove('hidden');
        isValid = false;
    } else {
        fullnameError.classList.add('hidden');
    }
    
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.classList.remove('hidden');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
    }
    
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone.value)) {
        phoneError.classList.remove('hidden');
        isValid = false;
    } else {
        phoneError.classList.add('hidden');
    }
    
    const interest = document.getElementById('interest');
    const interestError = document.getElementById('interest-error');
    if (interest.value === '') {
        interestError.classList.remove('hidden');
        isValid = false;
    } else {
        interestError.classList.add('hidden');
    }
    
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('Please agree to the terms and conditions');
        isValid = false;
    }
    
    if (isValid) {
        alert('Thank you for your volunteer application! We will contact you soon.');
        volunteerForm.reset();
    }
});

// Volunteer search functionality
const volunteerSearch = document.getElementById('volunteer-search');
const volunteerList = document.getElementById('volunteer-list');

const volunteers = [
    { name: 'Rohan Gupta', skills: 'Teaching, Construction', location: 'Uttar Pradesh, India', image: 'https://t3.ftcdn.net/jpg/03/77/30/16/360_F_377301660_ClhyVNc3ThqShLjkfk7zq0SeCenc4xb7.jpg' },
    { name: 'Priya Mehra', skills: 'Medical, Spanish', location: 'Rajasthan, India', image: 'https://media.istockphoto.com/id/1987655119/photo/smiling-young-businesswoman-standing-in-the-corridor-of-an-office.jpg?s=612x612&w=0&k=20&c=5N_IVGYsXoyj-H9vEiZUCLqbmmineaemQsKt2NTXGms=' },
    { name: 'Aditya Chopra', skills: 'IT, Web Development', location: 'Punjab, India', image: 'https://t4.ftcdn.net/jpg/06/13/28/69/360_F_613286945_BJ7rUxmhftMxfNtyyfnwDwuD2CxK8YQM.jpg' },
    { name: 'Riya Banerjee', skills: 'Fundraising, Marketing', location: 'West Bengal, India', image: 'https://www.shutterstock.com/image-photo/cheerful-young-indian-woman-outdoors-260nw-520322230.jpg' },
    { name: 'Vikram Malhotra', skills: 'Translation, Korean', location: 'Punjab, India', image: 'https://t3.ftcdn.net/jpg/05/31/32/36/360_F_531323691_ai5HJlsq7BC7wChtR21DDmhunXC35YG6.jpg' },
    { name: 'Shreya Pillai', skills: 'Education, Childcare', location: 'Kerala, India', image: 'https://media.istockphoto.com/id/917499044/photo/portrait-of-a-beautiful-young-indian-woman.jpg?s=612x612&w=0&k=20&c=VLeLPJ-Mda6Kz9OdT02_U0Cix0UCwDadtALEzIoKv7I=' }
];

function displayVolunteers(volunteersToDisplay) {
    volunteerList.innerHTML = '';
    volunteersToDisplay.forEach(volunteer => {
        const volunteerCard = document.createElement('div');
        volunteerCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
        volunteerCard.innerHTML = `
            <img src="${volunteer.image}" alt="${volunteer.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="font-bold text-gray-800">${volunteer.name}</h4>
                <p class="text-blue-600 text-sm mb-2">Skills: ${volunteer.skills}</p>
                <p class="text-gray-600 text-sm">Location: ${volunteer.location}</p>
                <button class="mt-4 btn-primary text-sm font-bold py-2 px-4 rounded w-full">Contact</button>
            </div>
        `;
        volunteerList.appendChild(volunteerCard);
    });
}

displayVolunteers(volunteers);

volunteerSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredVolunteers = volunteers.filter(volunteer => 
        volunteer.name.toLowerCase().includes(searchTerm) || 
        volunteer.skills.toLowerCase().includes(searchTerm) || 
        volunteer.location.toLowerCase().includes(searchTerm)
    );
    displayVolunteers(filteredVolunteers);
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        lightboxImage.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// View more gallery button
const viewMoreBtn = document.getElementById('view-more-gallery');
viewMoreBtn.addEventListener('click', function() {
    alert('This would load more gallery items in a real implementation.');
});

// Smooth scrolling navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const isMobile = window.innerWidth < 768;
            const offset = isMobile ? 60 : 80;
            
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

const volunteerBtn = document.querySelector('.volunteer-btn');
if (volunteerBtn) {
    volunteerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const volunteerSection = document.querySelector('#volunteer');
        if (volunteerSection) {
            const isMobile = window.innerWidth < 768;
            const offset = isMobile ? 60 : 80;
            
            window.scrollTo({
                top: volunteerSection.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
}

// AI chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotClear = document.getElementById('chatbot-clear');
const faqBtn = document.getElementById('faq-btn');
const donateBtn = document.getElementById('donate-btn');
const faqPopup = document.getElementById('faqPopup');

const chatbotResponses = {
    "volunteer": "To volunteer with Helping Hands, you can fill out our volunteer form in the 'Volunteer' section above, or contact us directly at info@helpinghands.org. We offer opportunities in education, healthcare, construction, fundraising, translation, and IT support. We'd love to have you join our team! 🌟",
    "donate": "You can donate by clicking the 'Donate Now' button in our hero section, or visit our donation page. We're currently raising funds for our Clean Water Initiative to help 10,000 people in rural areas. Every contribution makes a real difference! 💙",
    "contact": "Our contact information is at the bottom of the page. You can reach us at info@helpinghands.org or +91 9876543210. Our office is located at 42, MG Road, Karnataka, India. We're available Monday-Friday, 9:00 AM - 5:00 PM.",
    "programs": "Helping Hands offers programs in Education, Healthcare, Clean Water, Economic Development, and Disaster Relief. We operate in 25 countries and have completed 120+ projects helping over 10,000 people worldwide.",
    "impact": "Since 2010, Helping Hands has helped over 10,000 people across 25 countries through 120+ projects. We have 1,500+ volunteers and our programs focus on sustainable development in education, healthcare, clean water, and economic opportunity.",
    "locations": "Helping Hands operates in 25 countries worldwide, with major projects in India, Kenya, and other developing nations. Our headquarters is in Karnataka, India, and we have field offices in multiple countries.",
    "default": "I'm here to help with questions about volunteering, donations, our programs, or how to get involved with Helping Hands. Try asking about volunteering, donating, or our impact! 🤝"
};

chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('translate-y-4');
    chatbotContainer.classList.toggle('opacity-0');
    chatbotContainer.classList.toggle('opacity-100');
    chatbotContainer.classList.toggle('translate-y-0');
    if (chatbotContainer.classList.contains('opacity-100')) {
        sendBotMessage(randomGreeting());
    }
});

chatbotClose.addEventListener('click', function() {
    chatbotContainer.classList.add('translate-y-4');
    chatbotContainer.classList.add('opacity-0');
    chatbotContainer.classList.remove('opacity-100');
    chatbotContainer.classList.remove('translate-y-0');
});

faqBtn.addEventListener('click', function() {
    faqPopup.classList.toggle('hidden');
});

function selectFaq(question) {
    faqPopup.classList.add('hidden');
    addMessage(question, 'user');
    setTimeout(() => {
        const response = getBotAnswer(question);
        addMessage(response, 'bot');
    }, 500);
}

donateBtn.addEventListener('click', function() {
    addMessage("I'd like to donate to Helping Hands", 'user');
    setTimeout(() => {
        addMessage("Thank you for your interest in donating! You can donate by clicking the 'Donate Now' button in our hero section, or visit our donation page. We're currently raising funds for our Clean Water Initiative. Every contribution makes a real difference! 💙", 'bot');
    }, 500);
});

function getBotAnswer(input) {
    input = input.toLowerCase();
    if (input.includes('volunteer') || input.includes('join') || input.includes('help')) {
        return chatbotResponses.volunteer;
    } else if (input.includes('donate') || input.includes('money') || input.includes('fund')) {
        return chatbotResponses.donate;
    } else if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
        return chatbotResponses.contact;
    } else if (input.includes('program') || input.includes('offer') || input.includes('service')) {
        return chatbotResponses.programs;
    } else if (input.includes('impact') || input.includes('achievement') || input.includes('success')) {
        return chatbotResponses.impact;
    } else if (input.includes('where') || input.includes('location') || input.includes('operate')) {
        return chatbotResponses.locations;
    } else if (input.includes('hi') || input.includes('hello')) {
        return "Hi there! 👋 I'm your Helping Hands assistant. How can I help you today? You can ask me about volunteering, donating, our programs, or our impact!";
    }
    return chatbotResponses.default;
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bg-white rounded-lg p-3 mb-2 shadow-sm max-w-[80%]';
        typingIndicator.innerHTML = '<div class="typing flex space-x-1"><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div><div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></div></div>';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.remove();
            const response = getBotAnswer(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-white'} rounded-lg p-3 mb-2 shadow-sm max-w-[80%]`;
    messageDiv.innerHTML = `<p class="text-sm">${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendBotMessage(message) {
    addMessage(message, 'bot');
}

function randomGreeting() {
    const greetings = [
        "Hi there! 👋 I'm your Helping Hands assistant. How can I help you today?",
        "Welcome to Helping Hands! 🤝 How can I assist you with volunteering or donations?",
        "Hello! I'm here to help with questions about our programs and how to get involved!",
        "Welcome! Ask me about volunteering, donating, or our impact around the world! 🌍"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}

document.addEventListener('click', function(e) {
    if (!faqPopup.contains(e.target) && !e.target.matches('#faq-btn')) {
        faqPopup.classList.add('hidden');
    }
});

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

chatbotClear.addEventListener('click', function() {
    chatbotMessages.innerHTML = `
        <div class="chatbot-message bg-white rounded-lg p-3 mb-2 shadow-sm max-w-[80%]">
            <p class="text-sm">Hello! I'm your Helping Hands assistant. How can I help you today? 😊</p>
        </div>
    `;
});

// Back to top button functionality
const backToTopBtn = document.getElementById('back-to-top');
const footer = document.querySelector('footer');

window.addEventListener('scroll', function() {
    const footerTop = footer.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition >= footerTop) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Button hover effects
const buttons = document.querySelectorAll('.btn-hover-effect');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px)';
    });
});