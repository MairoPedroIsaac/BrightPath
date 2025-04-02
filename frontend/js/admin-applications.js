document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout');
    const applicationsTable = document.getElementById('applicationsTable');
  
    // Logout functionality
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('authToken');
      window.location.href = 'auth.html';
    });
  
    // Fetch applications
    async function fetchApplications() {
      try {
        const response = await fetch('http://https://brightpath-zp6i.onrender.com/applications');
        const applications = await response.json();
        
        applicationsTable.innerHTML = applications.map(app => `
          <tr>
            <td>${app.id}</td>
            <td>${app.fullName}</td>
            <td>${app.email}</td>
            <td>${app.phone}</td>
            <td>${app.reason}</td>
            <td>${app.status}</td>
            <td>
              <button class="btn btn-sm ${app.status === 'approved' ? 'btn-success disabled' : 'btn-outline-success'}" 
                onclick="updateStatus(${app.id}, 'approved')">
                Approve
              </button>
              <button class="btn btn-sm ${app.status === 'rejected' ? 'btn-danger disabled' : 'btn-outline-danger'}" 
                onclick="updateStatus(${app.id}, 'rejected')">
                Reject
              </button>
            </td>
          </tr>
        `).join('');
      } catch (error) {
        console.error('Error:', error);
        applicationsTable.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Failed to load applications</td></tr>`;
      }
    }
  
    // Status update function
    window.updateStatus = async function(id, status) {
      try {
        const response = await fetch(`http://https://brightpath-zp6i.onrender.com/applications/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status })
        });
  
        if (response.ok) {
          fetchApplications();
        } else {
          alert('Failed to update status');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    };
  
    // Initial fetch
    fetchApplications();
  });
  