document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const signupLink = document.getElementById("signup-link");
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const errorMsg = document.getElementById("error-msg");
    const signupErrorMsg = document.getElementById("signup-error-msg");

    signupLink.addEventListener("click", function() {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });

    loginBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Login successful, redirect to dashboard
                window.location.href = '/dashboard';
            } else {
                // Login failed, display error message
                errorMsg.textContent = data.message;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    signupBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const signupEmail = document.getElementById("signup-email").value;
        const signupPassword = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (signupPassword === confirmPassword) {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: signupEmail, password: signupPassword })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Signup successful, redirect to login page
                    window.location.href = '/login';
                } else {
                    // Signup failed, display error message
                    signupErrorMsg.textContent = data.message;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            signupErrorMsg.textContent = "Passwords do not match";
        }
    });
});