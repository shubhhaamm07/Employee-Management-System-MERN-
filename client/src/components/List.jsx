import { useState } from "react";
import Card from "./Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import API from "../services/api";

function List({ list, cards, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
    data: {
      listId: list.id,
    },
  });

  // ➕ Add Card State
  const [showCardInput, setShowCardInput] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  // ================= ADD CARD =================
  const handleAddCard = async () => {
    // 🔥 VALIDATION (IMPORTANT FIX)
    if (!newCardTitle || newCardTitle.trim() === "") {
      alert("Enter card title ❗");
      return;
    }

    try {
      console.log("Sending card:", newCardTitle);

      const res = await API.post("/cards", {
        title: newCardTitle.trim(),
        listId: list.id,
      });

      console.log("Created:", res.data);

      setNewCardTitle("");
      setShowCardInput(false);

      // 🔥 TEMP (we improve later)
      window.location.reload();
    } catch (err) {
      console.error("Add card failed:", err);
    }
  };

  // ================= DELETE LIST =================
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this list?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/lists/${list.id}`);
      onDelete(list.id);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        w-full md:w-72
        p-3 md:p-4
        rounded-2xl
        min-h-[140px]

        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-md

        transition-all duration-300 flex-shrink-0

        ${isOver ? "bg-blue-100/60 dark:bg-blue-900/40 scale-[1.02]" : ""}
      `}
    >
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
          {list.title}
        </h2>

        <div className="flex items-center gap-2">
          {/* Count */}
          <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            {cards.length}
          </span>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="text-xs text-red-500 hover:text-red-700"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* 🔹 Cards */}
      <SortableContext
        items={cards.map((c) => String(c.id))}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {cards.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Drop cards here…</p>
          ) : (
            cards.map((card) => <Card key={card.id} card={card} />)
          )}
        </div>
      </SortableContext>

      {/* ➕ Add Card */}
      {!showCardInput ? (
        <button
          onClick={() => setShowCardInput(true)}
          className="
            mt-3 w-full text-sm 
            text-gray-600 dark:text-gray-300
            hover:text-blue-600 dark:hover:text-blue-400
            hover:bg-gray-100 dark:hover:bg-gray-700
            rounded-lg py-2 transition
          "
        >
          + Add Card
        </button>
      ) : (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Enter card..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="
              w-full px-3 py-2 
              rounded-lg border 
              text-sm outline-none
              bg-white dark:bg-gray-700
              text-gray-800 dark:text-gray-200
            "
          />

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddCard}
              className="flex-1 bg-blue-600 text-white py-1 rounded-lg text-sm"
            >
              Add
            </button>

            <button
              onClick={() => setShowCardInput(false)}
              className="flex-1 bg-gray-300 dark:bg-gray-600 py-1 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
