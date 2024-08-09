document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    fetch('data/auth.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                sessionStorage.setItem('isAuthenticated', 'true');
                window.location.href = 'index.html';
            } else {
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des identifiants:', error);
        });
});
