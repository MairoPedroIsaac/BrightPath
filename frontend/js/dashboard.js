document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "auth.html"; // Remove alert
        return;
    }

    try {
        const response = await axios.get("http://https://brightpath-zp6i.onrender.com/auth/user", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            document.getElementById("welcomeMessage").innerText = `Welcome, ${response.data.full_name}!`;
        } else {
            localStorage.removeItem("token");
            window.location.href = "auth.html";
        }
    } catch (error) {
        console.error("Failed to load user data:", error);
        localStorage.removeItem("token");
        window.location.href = "auth.html";
    }
});

// Logout Functionality
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "auth.html";
        });
    }
});
