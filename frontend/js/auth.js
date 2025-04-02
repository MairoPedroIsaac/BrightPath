document.addEventListener("DOMContentLoaded", function () {
    console.log("auth.js loaded successfully!");

    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.createElement("p");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Login button clicked!");

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Clear previous messages
            errorMessage.textContent = "";

            if (!email || !password) {
                errorMessage.textContent = "Please fill in all fields.";
                errorMessage.style.color = "red";
                loginForm.appendChild(errorMessage);
                return;
            }

            try {
                const response = await fetch(
                    "https://brightpath-zp6i.onrender.com/auth/login",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    }
                );

                const data = await response.json();
                console.log("Server Response:", data);

                if (response.ok) {
                    localStorage.setItem("token", data.token);

                    // Redirect based on role
                    window.location.href =
                        data.roleId === 1
                            ? "admin-dashboard.html"
                            : "dashboard.html";
                } else {
                    errorMessage.textContent =
                        data.error || "Login failed. Invalid credentials.";
                    errorMessage.style.color = "red";
                    loginForm.appendChild(errorMessage);
                }
            } catch (error) {
                console.error("Login Error:", error);
                errorMessage.textContent =
                    "Server error. Please try again later.";
                errorMessage.style.color = "red";
                loginForm.appendChild(errorMessage);
            }
        });
    } else {
        console.log(
            "Login form not found. Check your auth.html file."
        );
    }
});
