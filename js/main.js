// Hamburger menu toggle functionality
document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const terms = document.getElementById('terms').checked ? "Accepted" : "Not accepted";

        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log(`Terms: ${terms}`);
    });
}
