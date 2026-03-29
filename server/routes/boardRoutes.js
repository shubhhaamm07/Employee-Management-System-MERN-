import express from "express";
import {
    createBoard,
    getBoards,
    deleteBoard
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);     // create
router.get("/", getBoards);        // get all
router.delete("/:id", deleteBoard); // ✅ delete

export default router;