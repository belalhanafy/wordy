import Navbar from "./components/Navbar"
import { GameProvider } from "./context/GameContext"
import Game from "./pages/Game"

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navbar />
        <Game />
      </div>
    </GameProvider>
  
  )
}

export default App
