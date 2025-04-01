document.getElementById("donationForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to donate.");
        window.location.href = "auth.html";
        return;
    }

    const donorName = document.getElementById("donorName").value;
    const email = document.getElementById("email").value;
    const amount = document.getElementById("amount").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    try {
        const response = await axios.post(
            "http://localhost:5000/user/donations",
            { donorName, email, amount, paymentMethod },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
            alert("Donation successful! Thank you for your support.");
            location.reload();
        }
    } catch (error) {
        alert("Donation Failed: " + (error.response?.data?.error || "Server error"));
    }
});
