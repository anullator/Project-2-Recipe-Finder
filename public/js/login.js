const loginHandler = async (event) => {
    event.preventDefault();
    
    // gets username and password input from form
    const username = document.querySelector('#user-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // sends request to server for user that matches the login info
    if (username && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Login unsuccessful. Please try again');
    }
    }
};
    
const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Sign up unsuccessful. Please try again');
        }
    }
};
    
document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupHandler);
