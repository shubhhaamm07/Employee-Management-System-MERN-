# 🚀 Kanban-Style Project Management Web App

## 📌 Overview

This is a **full-stack Kanban-style project management application** that allows users to organize tasks efficiently using boards, lists, and cards.

It works similar to tools like Trello, where users can:

- Create boards for projects
- Add lists (To Do, In Progress, Done)
- Manage tasks as cards
- Drag and drop tasks between lists

---

## 🎯 Features

### 🟦 Boards

- Create multiple boards
- Organize different projects
- Delete boards

### 🟨 Lists

- Add lists inside a board (e.g., To Do, In Progress)
- Delete lists
- Each list belongs to a specific board

### 🟩 Cards

- Add tasks inside lists
- Drag & drop cards between lists
- Delete cards
- Update card details

### 🔄 Drag & Drop

- Smooth drag-and-drop functionality
- Real-time UI updates (with improvements)

### 🌙 UI Features

- Dark/Light mode toggle
- Glassmorphism UI design
- Responsive layout (mobile + desktop)

---

## 🛠️ Tech Stack

### 💻 Frontend

- React.js
- Tailwind CSS
- DnD Kit (Drag and Drop)
- Axios (API calls)

### ⚙️ Backend

- Node.js
- Express.js

### 🗄️ Database

- MySQL
- Sequelize ORM

### 🔐 Environment Management

- dotenv (.env file)

---

## 🧠 Architecture

```plaintext
Frontend (React)
        ↓
Backend API (Express)
        ↓
Database (MySQL via Sequelize)
```

---

## 📂 Project Structure

```plaintext
client/
  ├── components/
  │     ├── Board.jsx
  │     ├── List.jsx
  │     ├── Card.jsx
  ├── pages/
  │     └── Home.jsx
  ├── services/
  │     └── api.js

server/
  ├── routes/
  ├── controllers/
  ├── models/
  ├── config/
  └── server.js
```

---

## 🚀 How to Run the Project

### 🔹 1. Clone the Repository

```bash
git clone <your-repo-url>
```

---

### 🔹 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
DB_NAME=kanban_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
PORT=8000
```

Run server:

```bash
node server.js
```

---

### 🔹 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔗 API Endpoints

### 📌 Boards

```http
POST   /api/boards
GET    /api/boards
DELETE /api/boards/:id
```

---

### 📌 Lists

```http
POST   /api/lists
GET    /api/lists/:boardId
DELETE /api/lists/:id
```

---

### 📌 Cards

```http
POST   /api/cards
GET    /api/cards/:listId
PUT    /api/cards/move
DELETE /api/cards/:id
```

---

## 📊 Database Design

### Boards

- id (Primary Key)
- title

### Lists

- id
- title
- boardId (Foreign Key)

### Cards

- id
- title
- listId (Foreign Key)

---

## 💡 Use Cases

This project can be used in:

### 🎓 Students

- Manage assignments
- Track study progress

### 💼 Teams

- Task management
- Sprint planning
- Agile workflows

### 🧑‍💻 Developers

- Feature tracking
- Bug management

### 🏢 Organizations

- Project tracking
- Workflow management

---

## 🔥 Key Concepts Implemented

- REST API design
- CRUD operations
- Relational database (Foreign Keys)
- Drag and Drop UX
- State management in React
- Full-stack integration

---

## ⚠️ Current Limitations

- Uses page reload for updates (can be improved)
- No authentication system
- No real-time sync (WebSockets not used)

---

## 🚀 Future Improvements

- Add authentication (JWT)
- Real-time updates (Socket.io)
- Card editing & priority levels
- File attachments
- Notifications system
- Deployment (Vercel + Render)

---

## 💯 Conclusion

This project demonstrates a **complete full-stack application** with:

- Frontend (React)
- Backend (Node + Express)
- Database (MySQL)

It is a strong portfolio project for:

- Software Engineering roles
- Full Stack Development
- Web Development internships/jobs

---

## 🙌 Author

**Shubham Rana**

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
