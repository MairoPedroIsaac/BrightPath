// Logout Functionality
document.getElementById('logout').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Clear session or token (example for localStorage)
    localStorage.removeItem('authToken'); // Replace 'authToken' with your actual session/token key

    // Redirect to login page
    window.location.href = 'auth.html';
});
