document.addEventListener("DOMContentLoaded", function () {
    console.log("auth.js loaded successfully!");

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Login button clicked!");

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            console.log("Email:", email, "Password:", password);

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                console.log("Server Response:", data);

                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    // Remove alert and add immediate redirection
                    window.location.href = data.roleId === 1 ? "dashboard.html" : "admin-dashboard.html";
                } else {
                    alert("Login Failed: " + (data.error || "Server error"));
                }
            } catch (error) {
                console.error("Login Error:", error);
                alert("Server error. Please try again later.");
            }
        });
    } else {
        console.log("Login form not found. Check your auth.html file.");
    }
});
