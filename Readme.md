🔐 Authentication Backend (Node.js + Express + MongoDB + JWT)

A simple and clean backend authentication system built using Node.js, Express, MongoDB, and JWT.
This project includes Register, Login, Get User, and Logout routes — ideal for beginners learning backend authentication.

📌 Features

User Registration

User Login

JWT-based Authentication

Protected User Route

Secure Cookie Storage

Logout (Clear JWT Cookie)

🚀 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

JWT (jsonwebtoken)

Cookie-Parser

📁 Project Structure
/project-folder
│── /models
│     └── user.model.js
│── /routes
│     └── auth.routes.js
│── server.js
│── .env
│── package.json
│── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

4️⃣ Start the server
npm run dev


Server will run on:

http://localhost:5000

📌 API Routes
🔹 1. Register User

POST /register

Request Body:
{
  "username": "nimesh",
  "password": "123456"
}

Response:
{
  "message": "User Registered Successfully",
  "user": { ... }
}

🔹 2. Login User

POST /login

Request Body:
{
  "username": "nimesh",
  "password": "123456"
}

Response:
{
  "message": "User login Successfully",
  "user": { ... }
}


Cookie token is set automatically.

🔹 3. Get Logged-in User (Protected Route)

GET /user

Requires valid JWT cookie.

Response:
{
  "message": "User data Fetched successfully",
  "user": { ... }
}

🔹 4. Logout User

GET /logout

Clears the JWT cookie.

{
  "message": "User logged out successfully"
}

🛡️ Security Notice

This project uses plain text passwords (for learning purposes).
For real production, always use:

✔ bcrypt hashing
✔ Helmet
✔ CORS protection
✔ Refresh tokens