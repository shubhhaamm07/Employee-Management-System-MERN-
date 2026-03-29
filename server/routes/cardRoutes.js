import express from "express";
import {
    createCard,
    getCards,
    moveCard,
    deleteCard,
    updateCard
} from "../controllers/cardController.js";

const router = express.Router();

router.post("/", createCard);        // create
router.get("/:listId", getCards);    // get cards of a list
router.put("/move", moveCard);       // move card

// ✅ ADD THESE
router.delete("/:id", deleteCard);   // delete card
router.put("/update", updateCard);   // update card

export default router;