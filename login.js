document.addEventListener('DOMContentLoaded', function() {
    // 3D card effect (existing code remains the same)
    const card = document.querySelector('.login-card');
    const container = document.querySelector('.login-container');

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

    // Form validation and submission
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('pword');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Add loading state to button
        const submitButton = document.querySelector('.sign-in-btn');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Signing in...</span>';
        submitButton.disabled = true;

        // Get stored users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user exists and password matches
        const userFound = storedUsers.find(
            (user) => user.username === usernameInput.value && user.password === passwordInput.value
        );

        setTimeout(() => {
            if (userFound) {
                // Success animation
                submitButton.innerHTML = '<span>Success!</span>';
                submitButton.style.background = 'linear-gradient(135deg, #06d6a0, #1b9aaa)';
                
                // Store logged in user info
                localStorage.setItem('currentUser', JSON.stringify({
                    username: userFound.username,
                    fullname: userFound.fullname
                }));
                
                setTimeout(() => {
                    // Redirect to the index page
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                // Error animation
                submitButton.innerHTML = '<span>Failed</span>';
                submitButton.style.background = 'linear-gradient(135deg, #ef476f, #ff6b6b)';
                
                setTimeout(() => {
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                    
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Invalid username or password';
                    form.insertBefore(errorMessage, submitButton.parentElement);
                    
                    // Remove error message after 3 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 3000);
                }, 1000);
            }
        }, 1500);
    });

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