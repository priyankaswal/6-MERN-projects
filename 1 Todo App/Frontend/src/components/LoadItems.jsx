import { useContext, useEffect, useState } from "react";
import TodoItemsContext from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((items) => {
        const newItems = items.map(todoItemToClientModel);
        addAllTodoItems(newItems);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <div className="loader w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <h2 className="text-center text-gray-600 mt-6">Enjoy Your Day</h2>
      )}
    </>
  );
};

export default LoadItems;
