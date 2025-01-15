import AddTodo from "./components/AddTodo";
import AppName from "./components/AppName";
import LoadItems from "./components/LoadItems";
import TodoItems from "./components/TodoItems";
import { TodoItemsProvider } from "./store/TodoItemsContext";

function App() {
  return (
    <TodoItemsProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col  items-center">
        <header className="w-full bg-blue-600 py-4 shadow-md">
          <div className="text-center text-white">
            <AppName />
          </div>
        </header>
        <main className="w-full max-w-4xl px-4 mt-6 space-y-6">
          <AddTodo />
          <LoadItems />
          <TodoItems />
        </main>
      </div>
    </TodoItemsProvider>
  );
}

export default App;
