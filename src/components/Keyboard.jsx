import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"];

const Keyboard = () => {
    const { handleKeyPress, colors, board } = useContext(GameContext);

    const letterStatuses = {};
    board.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
            if (cell.letter) {
                const status = colors[rIdx]?.[cIdx];
                if (!status) return;

                const prevStatus = letterStatuses[cell.letter];

                if (prevStatus === "correct") return; // don't downgrade
                if (status === "correct") {
                    letterStatuses[cell.letter] = "correct";
                } else if (status === "present") {
                    if (!prevStatus || prevStatus === "absent") {
                        letterStatuses[cell.letter] = "present";
                    }
                } else if (status === "absent") {
                    if (!prevStatus) {
                        letterStatuses[cell.letter] = "absent";
                    }
                }
            }
        });
    });

    return (
        <div className="flex flex-col gap-2 mt-6 w-full max-w-3xl mx-auto px-1">
            {/* Row 1 */}
            <div className="flex justify-center gap-1">
                {keys1.map((keyLetter) => (
                    <Key
                        key={keyLetter}
                        keyVal={keyLetter}
                        onKeyPress={handleKeyPress}
                        status={letterStatuses[keyLetter]}
                    />
                ))}
            </div>

            {/* Row 2 */}
            <div className="flex justify-center gap-1 md:ml-6">
                {keys2.map((keyLetter) => (
                    <Key
                        key={keyLetter}
                        keyVal={keyLetter}
                        onKeyPress={handleKeyPress}
                        status={letterStatuses[keyLetter]}
                    />
                ))}
            </div>

            {/* Row 3 */}
            <div className="flex justify-center gap-1">
                {keys3.map((keyLetter) => (
                    <Key
                        key={keyLetter}
                        keyVal={keyLetter}
                        onKeyPress={handleKeyPress}
                        status={letterStatuses[keyLetter]}
                    />
                ))}
            </div>
        </div>
    );
};

const Key = ({ keyVal, onKeyPress, status }) => {
    const isWide = keyVal === "ENTER" || keyVal === "DELETE";

    let extraClasses = "";
    if (status === "correct") extraClasses = "bg-green-500 text-white";
    else if (status === "present") extraClasses = "bg-yellow-500 text-white";
    else if (status === "absent") extraClasses = "bg-gray-500 text-white";
    else
        extraClasses =
            "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100";

    return (
        <button
            onClick={() => onKeyPress(keyVal)}
            className={`
        h-12 sm:h-14 flex items-center justify-center 
        rounded-md font-semibold text-sm sm:text-base 
        hover:bg-gray-300 dark:hover:bg-gray-600 transition
        ${extraClasses}
        w-full
        md:w-12 ${isWide ? "md:w-20" : ""}
      `}
        >
            {keyVal}
        </button>
    );
};

export default Keyboard;
