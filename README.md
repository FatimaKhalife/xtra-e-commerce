# Xtra Factory – E-Commerce Website

A full-stack e-commerce web application inspired by the [Xtra Factory WordPress theme](https://xtratheme.com/elementor/factory/), built from scratch using React, TypeScript, and Node.js.

- Live Demo

[https://xtra-e-commerce.vercel.app](https://xtra-e-commerce.vercel.app)

- Preview


---

- Tech Stack

Frontend:
- React
- TypeScript
- React Router DOM
- Vite

Backend:
- Node.js / Express
- MySQL
- JWT Authentication
- Google OAuth
- Resend (email verification)

Deployment:
- Frontend → Vercel
- Backend → Render
- Database → FreeSQLDatabase

---
Features

- Product listing with grid view options and pagination
- Product detail page with image gallery and reviews
- User authentication (email/password + Google OAuth)
- Email verification on signup
- Shopping cart with quantity management
- Checkout with billing details form
- Projects portfolio page
- Contact form


---

- Getting Started

Prerequisites

- Node.js (v16 or higher)
- MySQL
- npm

Installation

```bash
# Clone the repository
git clone https://github.com/FatimaKhalife/xtra-e-commerce.git
cd xtra-e-commerce
```

#### Frontend
```bash
npm install
npm run dev
```

#### Backend
```bash
cd backend
npm install
node server.js
```

Environment Variables

Frontend (`.env`):
```
VITE_API_URL=http://localhost:5000
```

Backend (`backend/.env`):
```
PORT=5000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_PORT=3306
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```
---

- Purpose

This project was built to practice full-stack development using React, TypeScript, Node.js, and MySQL — covering authentication, database design, REST APIs, and deployment.

---

- License

This project is for educational purposes only. Design credit goes to [Xtra Theme](https://xtratheme.com/).
