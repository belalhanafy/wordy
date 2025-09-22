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
            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100";

        const borderColor = letter
          ? "border-black border-2 dark:border-gray-400"
          : "border-gray-300 dark:border-gray-600";

        const showPop = Boolean(letter && !isFlipping);

        const flipDelayStyle = isFlipping
          ? { animationDelay: `${colIndex * 0.2}s` }
          : undefined;

        return (
          <div key={colIndex} className="tile-container">
            <div
              className={`w-14 h-14 border flex items-center justify-center text-3xl rounded-md font-bold uppercase
                ${color}
                ${borderColor}
                ${isHint ? "border-3 border-green-700" : ""}
                ${isFlipping ? "tile-flip" : ""}
                ${showPop ? "tile-pop" : ""}
              `}
              style={flipDelayStyle}
            >
              {letter}
            </div>
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
