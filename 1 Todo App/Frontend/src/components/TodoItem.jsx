import React, { useContext, useState } from "react";
import Buttons from "./Buttons";
import TodoItemsContext from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";

function TodoItem({ id, todoText, todoDate, completed }) {
  const { deleteTodoItem } = useContext(TodoItemsContext);
  const [isComplete, setIsComplete] = useState(completed || false); // Ensure `completed` has a default value

  const formattedDate = new Date(todoDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleComplete = () => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !isComplete }),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        const clientUpdatedItem = todoItemToClientModel(updatedItem);
        setIsComplete(clientUpdatedItem.completed);
      })
      .catch((err) => {
        console.error("Error updating todo item:", err);
      });
  };

  const deleteHandler = () => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((deletedItem) => {
        const clientDeletedItem = todoItemToClientModel(deletedItem);
        deleteTodoItem(clientDeletedItem.id);
      })
      .catch((err) => {
        console.error("Error deleting todo item:", err);
      });
  };

  return (
    <div className="flex items-start justify-between bg-gray-50 shadow-lg p-4 mb-4 rounded-lg transition-all hover:shadow-xl">
      <input
        type="checkbox"
        className="w-5 h-5 mt-1 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
        checked={isComplete}
        onChange={toggleComplete}
      />
      <div
        className={`flex-1 ml-4 ${
          isComplete ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        <p className="truncate font-medium text-lg mb-1">{todoText}</p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <div className="ml-4">
        <Buttons
          type="danger"
          btnText="Delete"
          handler={deleteHandler}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        />
      </div>
    </div>
  );
}

export default TodoItem;
