import TodoItemsContext from "../store/TodoItemsContext";
import Buttons from "./Buttons";
import { useContext, useRef } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";

function AddTodo() {
  const { addTodoItem } = useContext(TodoItemsContext);
  const todoTextInput = useRef();
  const todoDateInput = useRef();

  const addHandler = () => {
    const todoText = todoTextInput.current.value;
    const todoDate = todoDateInput.current.value;
    todoTextInput.current.value = "";
    todoDateInput.current.value = "";
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: todoText,
        date: todoDate,
      }),
    })
      .then((res) => res.json())
      .then((serverItem) => {
        const { id, todoText, todoDate } = todoItemToClientModel(serverItem);
        addTodoItem(id, todoText, todoDate);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-gray-50 shadow-md rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Todo Here"
          ref={todoTextInput}
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={todoDateInput}
        />
        <Buttons type="success" btnText="Add" handler={addHandler} />
      </div>
    </div>
  );
}

export default AddTodo;
