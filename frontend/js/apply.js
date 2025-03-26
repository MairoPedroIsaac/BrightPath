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
        const response = await axios.post(
            "http://localhost:5000/housing/apply",
            { fullName, email, phone, reason },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
            alert("Application submitted successfully!");
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        alert("Application Failed: " + (error.response?.data?.error || "Server error"));
    }
});
