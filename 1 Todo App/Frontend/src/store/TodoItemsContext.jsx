import { createContext, useReducer } from "react";
import { TodoItemsReducer } from "./TodoItemsReducer";

const TodoItemsContext = createContext();

export const TodoItemsProvider = ({ children }) => {
  const [todoItems, dispatchTodoItems] = useReducer(TodoItemsReducer, []);

  const addTodoItem = (id , todoText, todoDate) => {
    dispatchTodoItems({
      type: "ADD_ITEM",
      payload: {
        id,
        todoText,
        todoDate,
      },
    });
  };

  const addAllTodoItems = (todoItems) => {
    dispatchTodoItems({
      type: "LOAD_ALL_ITEMS",
      payload: {
        allItems: todoItems,
      },
    });
  };

  const deleteTodoItem = (todoId) => {
    dispatchTodoItems({
      type: "DELETE_ITEM",
      payload: {
        todoId,
      },
    });
  };

  return (
    <TodoItemsContext.Provider
      value={{ todoItems, addTodoItem, deleteTodoItem, addAllTodoItems }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};
export default TodoItemsContext;
