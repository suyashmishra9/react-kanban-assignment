import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Tailwind CSS Test
        </h1>
        <p className="text-gray-700 text-lg">
          If this text is styled with blue heading and gray background, Tailwind
          is working!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Tailwind Button
        </button>
      </div>
    </>
  );
}

export default App;
