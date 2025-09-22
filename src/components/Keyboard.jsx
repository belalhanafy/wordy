import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

const Keyboard = () => {
    const { handleKeyPress } = useContext(GameContext);

    return (
        <div className="flex-col gap-2 mt-6 flex md:hidden w-full px-1">
            {/* Row 1 */}
            <div className="grid grid-cols-10 gap-1 w-full">
                {keys1.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-9 gap-1 w-full">
                {keys2.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-9 gap-1 w-full">
                {keys3.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>
        </div>
    );
};

const Key = ({ keyVal, onKeyPress }) => {
    return (
        <button
            onClick={() => onKeyPress(keyVal)}
            className={`flex items-center justify-center rounded-md font-semibold
        bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
        hover:bg-gray-300 dark:hover:bg-gray-600 transition
        text-xs sm:text-sm md:text-base h-12 w-full`}
        >
            {keyVal}
        </button>
    );
};

export default Keyboard;
