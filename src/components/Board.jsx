import React, { useContext } from "react";
import Words from "./Words";
import { GameContext } from "../context/GameContext";

const Board = () => {
    const { board, colors, flippingRow } = useContext(GameContext);

    return (
        <div className="grid grid-rows-6 gap-2">
            {board.map((row, rowIndex) => {
                const isRowCorrect = colors[rowIndex]?.every(c => c === "correct");

                return (
                    <Words
                        key={rowIndex}
                        row={row}
                        colorRow={colors[rowIndex]}
                        isFlipping={flippingRow === rowIndex}
                        isCorrectWord={isRowCorrect}
                    />
                );
            })}
        </div>
    );
};

export default Board;
