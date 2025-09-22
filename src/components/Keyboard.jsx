import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

const Keyboard = () => {
    const { handleKeyPress } = useContext(GameContext);

    return (
        <div className="flex flex-col gap-2 mt-6 sm:hidden w-full px-1">
            {/* Row 1 */}
            <div className="flex gap-1">
                {keys1.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-1 justify-center">
                {keys2.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>

            {/* Row 3 */}
            <div className="flex gap-1">
                {keys3.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>
        </div>
    );
};

const Key = ({ keyVal, onKeyPress }) => {
    // Make ENTER and DELETE larger
    const isWide = keyVal === "ENTER" || keyVal === "DELETE";

    return (
        <button
            onClick={() => onKeyPress(keyVal)}
            className={`flex-1 h-12 sm:h-14 md:h-16 flex items-center justify-center 
      rounded-md font-semibold text-sm sm:text-base 
      bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
      hover:bg-gray-300 dark:hover:bg-gray-600 transition
      ${isWide ? "flex-[1.5]" : ""}`}
        >
            {keyVal}
        </button>
    );
};

export default Keyboard;
