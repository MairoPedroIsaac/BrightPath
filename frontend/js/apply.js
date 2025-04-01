document.getElementById("applyForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to apply.");
        window.location.href = "auth.html";
        return;
    }

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const reason = document.getElementById("reason").value;

    try {
        const response = await fetch("http://localhost:5000/housing", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ fullName, email, phone, reason })
        });

        console.log(response)

        if (response.ok) {
            alert("Application submitted successfully!");
            window.location.href = "dashboard.html";
        } else {
            const data = await response.json();
            alert("Application Failed: " + (data.error || "Server error"));
        }
    } catch (error) {
        alert("Application Failed: " + error.message);
    }
});

// Logout function
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "auth.html";
});
