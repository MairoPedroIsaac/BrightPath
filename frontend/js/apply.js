document.addEventListener('DOMContentLoaded', function() {
    const applyForm = document.getElementById('applyForm');
    const successMessage = document.getElementById('successMessage');

    applyForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const reason = document.getElementById('reason').value;

        // Data to send to the backend
        const applicationData = {
            fullName: fullName,
            email: email,
            phone: phone,
            reason: reason
        };

        try {
            const response = await fetch('http://localhost:5000/applications/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicationData)
            });

            const data = await response.json();

            if (response.ok) {
                successMessage.textContent = data.message; // Display success message
                applyForm.reset(); // Clear the form
            } else {
                successMessage.textContent = 'Application submission failed.';
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            successMessage.textContent = 'An error occurred. Please try again.';
        }
    });
});
