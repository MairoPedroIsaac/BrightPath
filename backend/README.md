BrightPath Backend
The backend of BrightPath handles server-side logic and APIs for managing user authentication, housing applications, donations, and admin functionalities.

Technologies Used
Node.js (v16+)

Express.js (v4+)

PostgreSQL: A robust relational database for structured data storage.

Setup Instructions
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
npm install
Set up environment variables:
Create a .env file in the backend directory and add the following:

PORT=5000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
Start the server:

bash
node server.js
The server will run at http://localhost:5000.

API Endpoints
Authentication Routes
Method	Endpoint	Description
POST	/api/auth/login	User login
POST	/api/auth/register	User registration

Housing Applications Routes
Method	Endpoint	Description
GET	/api/applications	Fetch all applications
POST	/api/applications/apply	Submit a new housing application

Donations Routes
Method	Endpoint	Description
GET	/api/donations	Fetch all donations
POST	/api/donations/add	Submit a new donation

Project Structure
backend/
├── controllers/         # API logic
├── models/              # Database models/schemas
├── routes/              # API routes
├── middleware/          # Authentication middleware
├── utils/               # Utility functions (optional)
├── config/              # Database configuration files
├── .env                 # Environment variables
├── server.js            # Entry point of the application
├── package.json         # Project dependencies and scripts

Notes: 
Ensure PostgreSQL is installed and running on your system.

Replace placeholders in .env with actual values.

Test endpoints using tools like Postman or curl.