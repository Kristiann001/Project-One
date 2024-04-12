document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email-input');
    const password = document.getElementById('password-input');
    const confirmPassword = document.getElementById('password2-input');
    const signupButton = document.querySelector('#signuppage .finalbtn');

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });

    signupButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const emailValue = document.getElementById('email-input').value;
        const passwordValue = document.getElementById('password-input').value;
        const confirmPasswordValue = document.getElementById('password2-input').value;

        const userData = {
            "fullname": fullname,
            "user-email": emailValue,
            "user-password": passwordValue,
            "user-confirm-password": confirmPasswordValue
        };

        // POST the user data to the endpoint
        fetch('http://localhost:3000/Names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User data posted successfully:', data);
            // Optionally, you can display a success message to the user
        })
        .catch(error => {
            console.error('Error posting user data:', error);
            // Optionally, you can display an error message to the user
        });
    });

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.remove('error');
        inputControl.classList.add('success');
    }

    const isValidEmail = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = function() {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const password2Value = confirmPassword.value.trim();

        if(usernameValue === ''){
            setError(username, 'Username required');
        } else {
            setSuccess(username);
        }

        if(emailValue === ''){
            setError(email, 'Email required');
        } else if(!isValidEmail(emailValue)) {
            setError(email, 'Invalid email');
        } else {
            setSuccess(email);
        }

        if(passwordValue === ''){
            setError(password, 'Password required');
        } else if (passwordValue.length < 8){
            setError(password, 'Password must be at least 8 characters');
        } else {
            setSuccess(password);
        }   

        if(password2Value === ''){
            setError(confirmPassword, 'Confirm password required');
        } else if(password2Value !== passwordValue) {
            setError(confirmPassword, 'Passwords do not match');
        } else {
            setSuccess(confirmPassword);
        }
    };
});
