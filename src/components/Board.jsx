import React, { useContext } from "react";
import Words from "./Words";
import { GameContext } from "../context/GameContext";

const Board = () => {
    const { board, colors, word, flippingRow } = useContext(GameContext);

    return (
        <div className="grid grid-rows-6 gap-2">
            {board.map((row, rowIndex) => (
                <Words
                    key={rowIndex}
                    row={row}
                    colorRow={colors[rowIndex]}
                    isFlipping={flippingRow === rowIndex}
                />
            ))}
        </div>
    );
};

export default Board;
