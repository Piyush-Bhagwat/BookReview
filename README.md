# BookReview
# 📚 Book Review Platform
Live:
client: https://bookreviewcli.netlify.app/
server:  https://bookreviewapi.onrender.com/

A full-stack MERN-based application where users can browse books, read and write reviews, and rate books. The frontend is built with React and Tailwind CSS, and the backend is powered by Node.js, Express, and MongoDB.

---

## 🚀 Features

- 🧑‍💻 User Authentication (JWT)
- 📚 Book Listing with Author Details
- 📝 Add & View Reviews (with Ratings)
- 🟡 Average Rating + Review Count Display
- 🔒 Protected Routes
- 🧩 Modal UI for Book Details
- 💬 Live Refresh after Adding Reviews

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Auth

---

## 📁 Project Structure
```
book-review-platform/
├── client/ # React frontend
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── context/ # Global context (auth, books)
│ └── App.jsx
├── server/ # Node.js backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
└── README.md
```
---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform
```
2. Setup the backend
```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_jwt_secret
node server.js
```
3. Setup the frontend
```bash
cd ../client
npm install
npm start
```
Make sure both the frontend and backend are running on separate ports.

🔐 API Routes (Backend)
POST /api/register – Register user

POST /api/login – Login user

GET /api/books – Fetch all books (protected)

POST /api/reviews/:bookId – Add review (protected)

GET /api/reviews/book/:bookId – Get reviews for a book

🧪 Sample Credentials (for testing)
```
Email: test@example.com
Password: 123456
```
🙌 Credits
Built with love by Piyush
MCA | Web Developer | MERN Stack Enthusiast
