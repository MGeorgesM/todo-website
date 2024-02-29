const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'AdminSEF123' && password === 'SeF@ctORy$$456') {
        window.location.href = '../pages/todo.html';
    } else {
        alert('Invalid username or password');
    }
});
