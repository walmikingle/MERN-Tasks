# Task 01 — MERN Product Store

A full-stack product management application built using the MERN stack.

This project was developed as part of my MERN internship training and covers the fundamentals of building a REST API, connecting MongoDB, and consuming the API from a React frontend.

## Tech Stack

### Frontend
- React
- Vite
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- Mongoose
- REST API

### Database
- MongoDB Atlas

### Development Tools
- Git
- GitHub
- VS Code
- Nodemon

---

## Features

- View all products
- Add a new product
- Edit an existing product
- Delete a product
- View product details
- Form validation
- Loading state
- Error handling
- MongoDB persistence
- RESTful API
- Frontend/backend separation

---

## Project Structure

```text
Task-01-Basic-React-App-API/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductList.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── Product.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md