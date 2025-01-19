import AppName from "./components/AppName";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center">
      <header className="w-full bg-blue-600 py-5 shadow-lg">
        <div className="text-center text-white text-2xl font-semibold">
          <AppName />
        </div>
      </header>
      <main className="w-full max-w-4xl px-6 mt-8">
        <CurrencyConverter />
      </main>
    </div>
  );
}

export default App;
