import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const HelpIns = () => {
    const { help, setHelp } = useContext(GameContext);

    if (!help) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-2xl shadow-xl max-w-md w-full relative">
                <h2 className="text-2xl font-bold mb-4 text-center">How to Play</h2>

                <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Guess the hidden word in 6 tries.</li>
                    <li>Each guess must be a valid 5-letter word.</li>
                    <li>
                        After each guess, the color of the tiles will change to show how
                        close your guess was:
                    </li>
                    <ul className="list-inside ml-4 space-y-1">
                        <li>
                            <span className="font-bold text-green-500">Green</span>: Letter in
                            correct spot
                        </li>
                        <li>
                            <span className="font-bold text-yellow-500">Yellow</span>: Letter
                            in the word, but wrong spot
                        </li>
                        <li>
                            <span className="font-bold text-gray-500">Gray</span>: Letter not
                            in the word
                        </li>
                    </ul>
                </ul>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setHelp(false)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpIns;
