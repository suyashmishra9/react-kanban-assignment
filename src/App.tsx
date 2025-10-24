import "./App.css";
import Board from "./pages/Board";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Board />
      </div>
    </ThemeProvider>
  );
}

export default App;
