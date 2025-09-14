import React, { useContext } from "react";
import DarkMode from "./DarkMode";
import { GameContext } from "../context/GameContext";

const Navbar = () => {
    const { help, setHelp,hintsLeft, giveHint } = useContext(GameContext);

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
                <img src="/Wordle_Logo.svg.png" alt="Wordy Logo" className="w-8 h-8" />
                <h1 className="text-2xl font-bold tracking-wide text-green-600 dark:text-green-400">
                    Wordy
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button onClick={() => setHelp(!help)} className="px-3 py-1 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition">
                    Help
                </button>
                
                <button
                    onClick={giveHint}
                    disabled={hintsLeft <= 0}
                    className={`px-3 py-1 rounded-lg font-medium transition 
                        ${hintsLeft > 0
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                >
                    Hint ({hintsLeft})
                </button>

                <DarkMode />
            </div>
        </nav>
    );
};

export default Navbar;
