/**
 * FiveM Developer Portfolio - Contact Form JavaScript
 * Author: DevFiveM
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastClose = document.querySelector('.toast-close');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                showToast('Error', 'Por favor completa todos los campos', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Error', 'Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.form-submit');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar Mensaje <i class="fas fa-paper-plane"></i>';
                
                // Show success message
                showToast('¡Éxito!', 'Tu mensaje ha sido enviado correctamente', 'success');
            }, 2000);
        });
    }
    
    // Toast notification function
    function showToast(title, message, type = 'success') {
        if (toast) {
            const toastTitle = toast.querySelector('.toast-title');
            const toastMessage = toast.querySelector('.toast-message');
            const toastIcon = toast.querySelector('.toast-icon');
            
            // Set content
            toastTitle.textContent = title;
            toastMessage.textContent = message;
            
            // Set icon and color based on type
            if (type === 'success') {
                toastIcon.style.backgroundColor = '#00b894';
                toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            } else if (type === 'error') {
                toastIcon.style.backgroundColor = '#d63031';
                toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            }
            
            // Show toast
            toast.classList.add('show');
            
            // Hide toast after 5 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
    }
    
    // Close toast on button click
    if (toastClose) {
        toastClose.addEventListener('click', function() {
            toast.classList.remove('show');
        });
    }
});