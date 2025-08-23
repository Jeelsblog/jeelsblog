// Form handling for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = '⏳ Sending...';
            submitBtn.disabled = true;
            
            try {
                const formObject = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    projectType: formData.get('project-type'),
                    budget: formData.get('budget'),
                    timeline: formData.get('timeline'),
                    description: formData.get('description'),
                    timestamp: new Date().toISOString(),
                    source: 'Vibe Coding Portfolio'
                };
                
                const response = await fetch('https://n8n-sdmn.onrender.com/webhook/jeelsblog/form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formObject)
                });
                
                if (response.ok) {
                    // Success
                    submitBtn.textContent = '✅ Message Sent!';
                    submitBtn.style.background = '#10b981';
                    this.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '#06b6d4';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                // Error handling
                submitBtn.textContent = '❌ Try Again';
                submitBtn.style.background = '#ef4444';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '#06b6d4';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        nav.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});
