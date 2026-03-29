# 🎨 Frontend (Client) — Kanban Project

## 📌 Overview

This is the **frontend of the Kanban-style project management application** built using **React.js**.

It provides an interactive UI where users can:

- View boards
- Manage lists (To Do, In Progress, Done)
- Add and move cards
- Drag & drop tasks between lists

---

## 🛠️ Tech Stack

- ⚛️ React.js
- 🎨 Tailwind CSS
- 🔄 DnD Kit (Drag & Drop)
- 🌐 Axios (API requests)
- ⚡ Vite (Build tool)

---

## 📂 Folder Structure

```plaintext
client/
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── List.jsx
│   │   └── Card.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── api.js
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

---

## 🚀 Features

### 🟦 Boards

- Display multiple boards
- Switch between boards

### 🟨 Lists

- Create new lists
- Delete lists
- View list-wise tasks

### 🟩 Cards

- Add tasks inside lists
- Drag & drop cards between lists
- Dynamic rendering

### 🎯 UI Features

- Responsive design (mobile + desktop)
- Dark mode toggle 🌙
- Smooth animations

---

## 🔗 API Integration

The frontend communicates with backend APIs using Axios.

### Base URL:

```js
http://localhost:8000/api
```

---

### Example API Calls:

```js
// Get Boards
API.get("/boards");

// Create List
API.post("/lists", { title, boardId });

// Create Card
API.post("/cards", { title, listId });

// Move Card
API.put("/cards/move", { cardId, listId });
```

---

## ⚙️ Setup Instructions

### 🔹 1. Install Dependencies

```bash
npm install
```

---

### 🔹 2. Run Development Server

```bash
npm run dev
```

---

### 🔹 3. Open in Browser

```plaintext
http://localhost:5173
```

---

## 🔥 Important Notes

- Backend server must be running on port **8000**
- Ensure correct API base URL in `services/api.js`
- Database must have data (boards, lists, cards)

---

## ⚠️ Current Limitations

- Uses page reload after adding card (can be improved)
- No authentication system
- No real-time updates

---

## 🚀 Future Improvements

- Real-time UI updates (no reload)
- Add authentication (JWT)
- Edit & delete cards
- Search & filter functionality
- Better state management

---

## 💡 Developer Notes

- Uses React hooks (`useState`, `useEffect`)
- Follows component-based architecture
- Drag & Drop handled via `@dnd-kit`

---

## 👨‍💻 Author

**Shubham Rana**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
