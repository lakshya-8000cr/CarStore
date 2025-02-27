document.addEventListener('DOMContentLoaded', function() {
    // 3D card effect
    const card = document.querySelector('.signup-card');
    const container = document.querySelector('.signup-container');

    container.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    container.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    container.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });

    // Form validation
    const form = document.getElementById('signupForm');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthIndicator = this.parentElement.querySelector('.password-strength');
        
        // Reset strength indicator
        strengthIndicator.className = 'password-strength';
        
        if (password.length === 0) {
            return;
        }
        
        // Check password strength
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        
        // Contains number
        if (/\d/.test(password)) strength++;
        
        // Contains letter
        if (/[a-zA-Z]/.test(password)) strength++;
        
        // Contains special character
        if (/[!@#$%^&*]/.test(password)) strength++;
        
        // Update strength indicator
        if (strength <= 2) {
            strengthIndicator.classList.add('weak');
        } else if (strength === 3) {
            strengthIndicator.classList.add('medium');
        } else {
            strengthIndicator.classList.add('strong');
        }
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        
        let isValid = true;
        
        // Validate full name
        if (fullnameInput.value.trim().length < 2) {
            showError(fullnameInput, 'Please enter your full name');
            isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate username
        if (usernameInput.value.trim().length < 3) {
            showError(usernameInput, 'Username must be at least 3 characters long');
            isValid = false;
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Validate confirm password
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'Please accept the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Add loading state to button
            const submitButton = document.querySelector('.sign-up-btn');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Creating Account...</span>';
            submitButton.disabled = true;
            
            // Get existing users or initialize empty array
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if username already exists
            if (existingUsers.some(user => user.username === usernameInput.value)) {
                showError(usernameInput, 'Username already exists');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                return;
            }
            
            // Create new user object
            const newUser = {
                fullname: fullnameInput.value,
                email: emailInput.value,
                username: usernameInput.value,
                password: passwordInput.value
            };
            
            // Add new user to array
            existingUsers.push(newUser);
            
            // Save updated users array to localStorage
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            // Show success modal after delay
            setTimeout(() => {
                const successModal = document.querySelector('.success-modal');
                successModal.classList.add('active');
                
                // Add click event to continue button
                document.querySelector('.continue-btn').addEventListener('click', () => {
                    window.location.href = 'login.html';
                });
            }, 1500);
        }
    });

    // Helper functions
    function showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.classList.add('error');
        
        // Remove error state after 3 seconds
        setTimeout(() => {
            input.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }, 3000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Input focus effects
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
});