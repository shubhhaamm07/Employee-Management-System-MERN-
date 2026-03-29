import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";

import boardRoutes from "./routes/boardRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

// ✅ CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// ✅ JSON Parser (safe)
app.use(express.json());

// ================= ROUTES =================

// 🔹 Home Route (API info)
app.get("/", (req, res) => {
    res.json({
        message: "🚀 Kanban API running",
        routes: {
            boards: "/api/boards",
            lists: "/api/lists",
            cards: "/api/cards",
        },
    });
});

// 🔹 Test Route
app.get("/test", (req, res) => {
    res.json({ status: "OK ✅" });
});

// 🔹 API Routes
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);

// ================= ERROR HANDLER =================

// 🔥 Handles invalid JSON (important fix)
app.use((err, req, res, next) => {
    console.error("Error:", err.message);

    if (err instanceof SyntaxError) {
        return res.status(400).json({
            error: "Invalid JSON body ❌",
        });
    }

    next();
});

// ================= DB CONNECT =================

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log("DB Connected ✅");

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running 🚀`);
        });
    })
    .catch((err) => {
        console.error("DB Error:", err);
    });