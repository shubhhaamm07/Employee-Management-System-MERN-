import express from "express";
import {
    createList,
    getLists,
    deleteList
} from "../controllers/listController.js";

const router = express.Router();

router.post("/", createList);        // create list
router.get("/:boardId", getLists);   // get lists of a board

// ✅ ADD THIS
router.delete("/:id", deleteList);   // delete list

export default router;