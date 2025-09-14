import React from "react";
const Words = ({ row, colorRow, isFlipping }) => {
    return (
        <div className="grid grid-cols-5 gap-2">
            {row.map((cell, colIndex) => {
                const { letter, isHint } = cell;

                const color =
                    colorRow?.[colIndex] === "correct"
                        ? "bg-green-500 text-white"
                        : colorRow?.[colIndex] === "present"
                            ? "bg-yellow-500 text-white"
                            : colorRow?.[colIndex] === "absent"
                                ? "bg-gray-500 text-white"
                                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300";

                return (
                    <div
                        key={colIndex}
                        className={`w-16 h-16 border flex items-center justify-center text-3xl rounded-md font-bold uppercase
              ${color}
              ${isHint ? "border-3 border-green-700" : ""}
              ${isFlipping ? "tile-flip" : ""}
            `}
                        style={{ animationDelay: `${colIndex * 0.2}s` }}
                    >
                        {letter}
                    </div>
                );
            })}
        </div>
    );
};


export const boardDefaults = Array(6)
    .fill(null)
    .map(() =>
        Array(5)
            .fill(null)
            .map(() => ({ letter: "", isHint: false }))
    );

export default Words;
