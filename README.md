
# 📝 ToDo Web Application

A full-featured ToDo web application built with **React**, featuring authentication, CRUD functionality, and a modern UI.

[🔗 Live Demo](https://todoapp-xi-hazel.vercel.app/) | [📦 GitHub Repo](https://github.com/YouSry3/ToDoFront)

---

## 🚀 Features

- 🔐 **Authentication** using JWT (Login/Register with token stored in localStorage)
- 🔄 **CRUD Operations** on ToDos (Create, Read, Update, Delete)
- 🌐 **React Router v6** with Private & Public Route Protection
- ⚙️ **Custom Hook**: `useAuth()` for managing authentication state
- 🎨 **Tailwind CSS** for modern responsive UI
- 📡 **Axios Integration** with a Strapi backend API
- 🔔 **Toast Notifications** for success/error feedback
- 🧼 Clean Code & Component-Based Architecture

---

## 📁 Project Structure

```
src/
│
├── components/          # Reusable UI components
├── pages/               # Main views (Home, Login, Register, etc.)
├── context/             # Auth context provider
├── hooks/               # Custom hook: useAuth()
├── utils/               # API helpers for auth & todos
├── App.js               # Main App with routing setup
└── main.jsx             # Entry point
```

---

## 🧪 Tech Stack

- **Frontend**: React, React Router, Context API, Axios, Tailwind CSS
- **Backend**: Strapi (External)
- **Auth**: JWT (stored in localStorage)

---

## 🛠️ Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/YouSry3/ToDoFront.git
   cd ToDoFront
   ```

2. Install dependencies:
   ```bash
   npm install
   yarn dev
   ```

3. Add environment variables:
   - Create a `.env` file for your API base URL (if needed)

4. Start the app:
   ```bash
   npm run dev
   ```

---

## 📌 Notes

- Make sure the Strapi backend is running and accessible via the correct base URL.
- JWT is stored in localStorage and used to protect routes via `useAuth`.

---

## 📷 Screenshots

(Include screenshots here if available for the UI)

---

## 👨‍💻 Author

Developed by [@YouSry3](https://github.com/YouSry3)
