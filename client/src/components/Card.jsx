import { useSortable } from "@dnd-kit/sortable";

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(card.id),
    data: {
      listId: card.listId,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
      : undefined,
    transition: isDragging ? "none" : transition,
    willChange: "transform",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        relative px-3 py-2 md:px-4 md:py-3 mb-3
        rounded-xl

        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        shadow-sm hover:shadow-md

        transition-all duration-200

        cursor-grab active:cursor-grabbing

        break-words

        ${isDragging ? "opacity-50 scale-[1.02] shadow-lg" : ""}
      `}
    >
      {/* 🔴 Priority Badge */}
      {card.priority && (
        <span
          className={`
            absolute top-1 right-2 text-[10px] px-2 py-[2px] rounded-full font-medium
            ${
              card.priority === "high"
                ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                : card.priority === "medium"
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            }
          `}
        >
          {card.priority}
        </span>
      )}

      {/* 📝 Title */}
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 break-words">
        {card.title}
      </p>

      {/* 📅 Due Date */}
      {card.dueDate && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          📅 {card.dueDate}
        </p>
      )}
    </div>
  );
}

export default Card;
