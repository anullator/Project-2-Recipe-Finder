const loginHandler = async (event) => {
    event.preventDefault();
    
    // get login inputs
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // send request for the user that matches the information entered
    if (email && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    });

console.log(response);

    if (response.ok) {
        document.location.replace('/home');
    } else {
        alert('Login unsuccessful. Please try again');
    }
    }
};
    
const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    
        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert('Sign up unsuccessful. Please try again');
        }
    }
};
    
document
    .querySelector('#login-form')
    .addEventListener('submit', loginHandler);

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupHandler);
