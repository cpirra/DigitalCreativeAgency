class Service {
    constructor(title, image, category) {
        this.title = title;
        this.image = image;
        this.category = category;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = `url(${this.image})`;

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';

        const cardTitle = document.createElement('h3');
        cardTitle.innerHTML = this.title;

        cardContent.appendChild(cardTitle);
        card.appendChild(cardContent);

        return card;
    }
}

const services = [
    new Service('Strategy, Idea & Concept', '/photos/our-services/service1.JPG', 'Strategy'),
    new Service('UX, Design & Technology','/photos/our-services/service2.JPG', 'Design'),
    new Service('Social Media & Performance Marketing',  '/photos/our-services/service3.JPG', 'Marketing')
];

// Hamburger menu toggle functionality
document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success');
    const backToTopButton = document.querySelector('.back-to-top');
    const nameInput = document.getElementById('name');
    const termsCheckbox = document.getElementById('terms');
    const termsLabel = document.getElementById('terms-label');

    // Check if user name is stored
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        console.log(`Welcome back, ${storedName}!`);
        nameInput.value = storedName;
    }

    // Check if terms cookie exists
    const termsCookie = document.cookie.split('; ').find(row => row.startsWith('termsAccepted='));
    if (termsCookie) {
        termsCheckbox.checked = true;
        if (termsLabel) {
            termsLabel.style.display = 'none'; // Hide the terms checkbox and label
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;
            if (successMessage) {
                successMessage.style.display = 'none';
                successMessage.innerText = '';
            }

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const terms = document.getElementById('terms');

            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(function(el) {
                el.innerText = '';
            });

            // Validate name
            if (name && name.value.trim() === '') {
                document.getElementById('name-error').innerText = 'Name is required.';
                isValid = false;
            }

            // Validate email
            if (email && email.value.trim() === '') {
                document.getElementById('email-error').innerText = 'Email is required.';
                isValid = false;
            } else if (email && !/\S+@\S+\.\S+/.test(email.value)) {
                document.getElementById('email-error').innerText = 'Email format is invalid.';
                isValid = false;
            }

            // Validate message
            if (message && message.value.trim() === '') {
                document.getElementById('message-error').innerText = 'Message is required.';
                isValid = false;
            }

            // Validate terms
            if (terms && !terms.checked) {
                document.getElementById('terms-error').innerText = 'You must accept the terms and conditions.';
                isValid = false;
            }

            if (isValid) {
                // If the form is valid, display a success message
                if (successMessage) {
                    successMessage.innerText = 'Thank you for contacting us. We will get back to you soon.';
                    successMessage.style.display = 'block';
                }

                // Log the form values in the console
                console.log(`Name: ${name.value}`);
                console.log(`Email: ${email.value}`);
                console.log(`Subject: ${subject.value}`);
                console.log(`Message: ${message.value}`);
                console.log(`Terms Accepted: ${terms.checked}`);

                // Store name in local storage
                localStorage.setItem('userName', name.value);

                // Set cookie for terms acceptance
                document.cookie = "termsAccepted=true; path=/; max-age=" + (60*60*24*365); // Cookie expires in 1 year

                // Clear the form fields
                contactForm.reset();
            }
        });
    }

    // Back to top button functionality
    window.onscroll = function() {
        if (backToTopButton) {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        }
    };

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const headerText = document.getElementById('header-text');
    if (headerText) {
        let focusedOnVision = true;

        setInterval(() => {
            if (focusedOnVision) {
                headerText.innerHTML = 'We are a Digital Web Agency <br> focused on Product.';
            } else {
                headerText.innerHTML = 'We are a Digital Web Agency <br> focused on Vision.';
            }
            focusedOnVision = !focusedOnVision;
        }, 5000); // Change text every 5 seconds
    }

    const loadMoreButton = document.querySelector('.team .load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', async function() {
            const cardContainer = this.closest('.load-more-container')?.previousElementSibling;

            if (cardContainer) {
                const fetchTeamMembers = async () => {
                    try {
                        const response = await fetch('https://picsum.photos/v2/list?page=2&limit=3');
                        if (!response.ok) throw new Error('Network response was not ok');
                        const data = await response.json();
                        return data;
                    } catch (error) {
                        console.error('Fetch operation error:', error);
                    }
                };

                const generateRandomSeed = () => {
                    return Math.floor(Math.random() * 10000);
                };

                const teamMembers = await fetchTeamMembers();

                if (teamMembers) {
                    teamMembers.forEach(member => {
                        const newCard = document.createElement('div');
                        newCard.className = 'card';

                        const newImage = document.createElement('img');
                        const randomSeed = generateRandomSeed();
                        newImage.src = `https://picsum.photos/seed/${randomSeed}/200/300`;
                        newImage.alt = `Team Image ${member.id}`;

                        newCard.appendChild(newImage);
                        cardContainer.appendChild(newCard);
                    });
                }
            }
        });
    }

    // Generate services dynamically
    const servicesContainer = document.querySelector('.services .card-container');
    if (servicesContainer){
        services.forEach(service => {
            servicesContainer.appendChild(service.render());
        });
    }
});
