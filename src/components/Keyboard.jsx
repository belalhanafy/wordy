import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

const Keyboard = () => {
    const { handleKeyPress } = useContext(GameContext);

    return (
        <div className="flex-col gap-2 mt-6 flex md:hidden">
            <div className="flex justify-center gap-2">
                {keys1.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>

            <div className="flex justify-center gap-2">
                {keys2.map((keyLetter) => (
                    <Key key={keyLetter} keyVal={keyLetter} onKeyPress={handleKeyPress} />
                ))}
            </div>

            <div className="flex justify-center gap-2">
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
            className={`${keyVal === "ENTER" || keyVal === "DELETE" ? "lg:w-18 w-15" : "w-8"}
        h-12 flex items-center justify-center rounded-md font-semibold 
        bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
        hover:bg-gray-300 dark:hover:bg-gray-600 transition
      `}
        >
            {keyVal}
        </button>
    );
};

export default Keyboard;
