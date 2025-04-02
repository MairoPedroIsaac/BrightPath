document.addEventListener("DOMContentLoaded", function () {
    console.log("register.js loaded successfully!");

    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.createElement("p");
    const successMessage = document.createElement("p");

    if (registerForm) {
        // Add autocomplete attributes to password fields
        document.getElementById("password").autocomplete = "new-password";
        document.getElementById("confirmPassword").autocomplete = "new-password";

        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Register button clicked!");

            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            // Clear previous messages
            errorMessage.textContent = "";
            successMessage.textContent = "";

            if (!fullName || !email || !password || !confirmPassword) {
                errorMessage.textContent = "Please fill in all fields.";
                errorMessage.style.color = "red";
                registerForm.appendChild(errorMessage);
                return;
            }

            if (password !== confirmPassword) {
                errorMessage.textContent = "Passwords do not match.";
                errorMessage.style.color = "red";
                registerForm.appendChild(errorMessage);
                return;
            }

            try {
                const response = await fetch("http://https://brightpath-zp6i.onrender.com/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ full_name: fullName, email, password})
                });

                const data = await response.json();
                console.log("Server Response:", data);

                if (response.ok) {
                    successMessage.textContent = "Registration successful! Redirecting...";
                    successMessage.style.color = "green";
                    registerForm.appendChild(successMessage);

                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 2000); // Redirect after 2 seconds
                } else {
                    errorMessage.textContent = data.error || "Registration failed.";
                    errorMessage.style.color = "red";
                    registerForm.appendChild(errorMessage);
                }
            } catch (error) {
                console.error("Registration Error:", error);
                errorMessage.textContent = "Server error. Please try again later.";
                errorMessage.style.color = "red";
                registerForm.appendChild(errorMessage);
            }
        });
    } else {
        console.log("Register form not found. Check your register.html file.");
    }
});
