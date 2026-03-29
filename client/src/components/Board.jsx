import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import API from "../services/api";
import List from "./List";

function Board({ boardId }) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Drag overlay
  const [activeCard, setActiveCard] = useState(null);

  // ➕ Add List state
  const [showInput, setShowInput] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const listRes = await API.get(`/lists/${boardId}`);
        setLists(listRes.data);

        const cardPromises = listRes.data.map((l) => API.get(`/cards/${l.id}`));

        const results = await Promise.all(cardPromises);
        const allCards = results.flatMap((res) => res.data);

        setCards(allCards);
      } catch (err) {
        console.error("Error loading board:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [boardId]);

  // ================= ADD LIST =================
  const handleAddList = async () => {
    if (!newListTitle.trim()) return;

    try {
      const res = await API.post("/lists", {
        title: newListTitle,
        boardId,
      });

      setLists((prev) => [...prev, res.data]);
      setNewListTitle("");
      setShowInput(false);
    } catch (err) {
      console.error("Add list failed:", err);
    }
  };

  // ================= DELETE LIST =================
  const handleDeleteList = (listId) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
    setCards((prev) => prev.filter((c) => c.listId !== listId));
  };

  // ================= DRAG START =================
  const handleDragStart = (event) => {
    const cardId = Number(event.active.id);
    const card = cards.find((c) => c.id === cardId);
    setActiveCard(card);
  };

  // ================= DRAG END =================
  const handleDragEnd = async ({ active, over }) => {
    if (!over) {
      setActiveCard(null);
      return;
    }

    const cardId = Number(active.id);

    let listId;
    if (over.data?.current?.listId) {
      listId = over.data.current.listId;
    } else {
      listId = Number(over.id);
    }

    if (!cardId || !listId) {
      setActiveCard(null);
      return;
    }

    // UI update
    setCards((prev) =>
      prev.map((card) => (card.id === cardId ? { ...card, listId } : card)),
    );

    // backend update
    try {
      await API.put("/cards/move", { cardId, listId });
    } catch (err) {
      console.error("Move failed:", err);
    }

    setActiveCard(null);
  };

  // ================= UI =================
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* 🧊 Lists Container */}
        <div
          className="
            flex flex-col md:flex-row
            gap-4 md:gap-6
            p-4 md:p-6
            md:overflow-x-auto
          "
        >
          {/* 🔄 Loading */}
          {loading && (
            <div className="text-gray-500 text-lg animate-pulse">
              Loading board...
            </div>
          )}

          {/* 📋 Lists */}
          {!loading &&
            lists.map((list) => (
              <div key={list.id} className="flex-shrink-0">
                <List
                  list={list}
                  cards={cards.filter((c) => c.listId === list.id)}
                  onDelete={handleDeleteList}
                />
              </div>
            ))}

          {/* ➕ Add List */}
          {!loading && (
            <div className="w-full md:w-72 flex-shrink-0">
              {!showInput ? (
                <button
                  onClick={() => setShowInput(true)}
                  className="
                    w-full p-3 rounded-xl
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    shadow-sm text-sm font-medium
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    transition
                  "
                >
                  + Add List
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-white dark:bg-gray-800 border shadow-md">
                  <input
                    type="text"
                    placeholder="Enter list title..."
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleAddList}
                      className="flex-1 bg-blue-600 text-white py-1 rounded-lg text-sm"
                    >
                      Add
                    </button>

                    <button
                      onClick={() => setShowInput(false)}
                      className="flex-1 bg-gray-300 dark:bg-gray-600 py-1 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🔥 Drag Overlay */}
      <DragOverlay>
        {activeCard ? (
          <div
            className="
              px-4 py-2 rounded-xl
              bg-white dark:bg-gray-800
              shadow-2xl border
              text-sm font-medium
            "
          >
            {activeCard.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Board;
