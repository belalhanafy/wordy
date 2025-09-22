import React from "react";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import HelpIns from "../components/HelpIns";

const Game = () => {
    return (
        <div className="lg:p-0 flex flex-col gap-4 items-center justify-center h-[calc(100vh-70px)] dark:bg-gray-900 transition-colors">
            <HelpIns />
            <Board />
            <Keyboard />
        </div>
    );
};

export default Game;
