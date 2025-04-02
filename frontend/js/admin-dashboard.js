document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "auth.html";
        return;
    }

    try {
        const response = await axios.get("http://localhost:5000/admin/applications", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            const tableBody = document.getElementById("applicationsTable");
            response.data.forEach((app) => {
                const row = `<tr>
                    <td>${app.fullName}</td>
                    <td>${app.email}</td>
                    <td>${app.status}</td>
                    <td><button onclick="approveApplication(${app.id})" class="btn btn-success">Approve</button></td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("Failed to load applications:", error);
    }
});

async function approveApplication(appId) {
    const token = localStorage.getItem("token");

    try {
        await axios.put(`http://localhost:5000/admin/applications/${appId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Application Approved!");
        location.reload();
    } catch (error) {
        alert("Approval Failed: " + (error.response?.data?.error || "Server error"));
    }
}
