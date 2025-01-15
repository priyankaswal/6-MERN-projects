import { useContext } from "react";
import TodoItem from "./TodoItem";
import TodoItemsContext from "../store/TodoItemsContext";

function TodoItems() {
  const { todoItems } = useContext(TodoItemsContext);

  return (
    <div className="max-w-4xl mx-auto mt-4 space-y-4">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoText={item.todoText}
          todoDate={item.todoDate}
          completed={item.completed}
        />
      ))}
    </div>
  );
}

export default TodoItems;

// in the above code why it is not working when i am writing todoItems.map inside {}
// This won't work because you're not returning JSX anymore—you're returning an object (the result of map() is wrapped inside {}).

//  but if i directly return the map, will it not treat it as JS
// When you directly return the map() function,
// React knows you're returning JSX elements as the result of map(). Even though you're writing JavaScript code, map() produces JSX components (<TodoItem />), and React automatically knows how to handle it without needing extra curly braces.
// You are directly returning the result of map(). React sees that you are returning a list of JSX elements, and it knows how to handle this correctly. No need for extra curly braces because you’re not embedding JavaScript inside another JSX block.
