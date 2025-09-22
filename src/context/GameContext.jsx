import React, { createContext, useState, useEffect } from "react";
import { boardDefaults } from "../components/Words";
import useKeyboardInput from "../components/useKeyboardInput";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [board, setBoard] = useState(boardDefaults.map(r => r.map(c => ({ ...c }))));
    const [colors, setColors] = useState(Array(6).fill(null).map(() => Array(5).fill("")));
    const [currRow, setCurrRow] = useState(0);
    const [currCol, setCurrCol] = useState(0);
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(true);
    const [help, setHelp] = useState(false);
    const [hintsLeft, setHintsLeft] = useState(1);
    const [flippingRow, setFlippingRow] = useState(-1);

    useEffect(() => {
        const fetchWord = async () => {
            try {
                const res = await fetch("/wordle-bank.txt");
                const text = await res.text();

                const words = text
                    .split("\n")
                    .map((w) => w.trim().toUpperCase())
                    .filter((w) => w.length === 5);

                const randomWord = words[Math.floor(Math.random() * words.length)];
                setWord(randomWord);
                setLoading(false);
            } catch (err) {
                console.error("Error loading word list:", err);
            }
        };

        fetchWord();
    }, []);


    const handleKeyPress = (key) => {
        console.log(key);
        
        if (loading) return;

        if (key === "ENTER") {
            if (currCol === 5) {
                const guess = board[currRow].map((c) => c.letter).join("");

                // evaluate with duplicate-safe logic
                const evaluateGuess = (guessWord, targetWord) => {
                    const result = Array(5).fill("absent");
                    const targetArr = targetWord.split("");

                    for (let i = 0; i < 5; i++) {
                        if (guessWord[i] === targetArr[i]) {
                            result[i] = "correct";
                            targetArr[i] = null;
                        }
                    }

                    const counts = {};
                    for (let t of targetArr) {
                        if (t) counts[t] = (counts[t] || 0) + 1;
                    }

                    for (let i = 0; i < 5; i++) {
                        if (result[i] === "correct") continue;
                        const g = guessWord[i];
                        if (g && counts[g] > 0) {
                            result[i] = "present";
                            counts[g] -= 1;
                        }
                    }

                    return result;
                };

                const newColors = evaluateGuess(guess, word);

                setFlippingRow(currRow);

                newColors.forEach((color, i) => {
                    setTimeout(() => {
                        setColors((prev) => {
                            const updated = [...prev];
                            updated[currRow] = [...updated[currRow]];
                            updated[currRow][i] = color;
                            return updated;
                        });
                        if (i === 4) setFlippingRow(-1);
                    }, i * 300);
                });

                setTimeout(() => {
                    if (guess === word) {
                        alert("Congratulations! You've guessed the word!");
                        resetGame();
                    } else if (currRow === 5) {
                        alert(`Game Over! The word was: ${word}`);
                        resetGame();
                    } else {
                        setCurrRow((prev) => prev + 1);
                        setCurrCol(0);
                    }
                }, 300 * 5 + 100);
            }
            return;
        }



        if (key === "DELETE") {
            if (currCol > 0) {
                const newBoard = board.map((r) => r.map((c) => ({ ...c })));

                const prevIndex = currCol - 1;
                if (!newBoard[currRow][prevIndex].isHint) {
                    newBoard[currRow][prevIndex].letter = "";
                    setBoard(newBoard);
                    setCurrCol((prev) => prev - 1);
                }
            }
            return;
        }

        if (currCol < 5 && /^[A-Z]$/.test(key)) {
            const newBoard = board.map((r) => r.map((c) => ({ ...c })));
            let nextCol = currCol;

            while (nextCol < 5 && newBoard[currRow][nextCol].isHint) {
                nextCol++;
            }

            if (nextCol < 5) {
                newBoard[currRow][nextCol].letter = key;
                setBoard(newBoard);
                setCurrCol(nextCol + 1);
            }
        }

    };

    useKeyboardInput(handleKeyPress);

    const resetGame = async () => {
        setBoard(boardDefaults.map(r => r.map(c => ({ ...c }))));
        setColors(Array(6).fill(null).map(() => Array(5).fill("")));
        setCurrRow(0);
        setCurrCol(0);
        setHintsLeft(1);

        const res = await fetch("/wordle-bank.txt");
        const text = await res.text();
        const words = text
            .split("\n")
            .map((w) => w.trim().toUpperCase())
            .filter((w) => w.length === 5);
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
    };

    const giveHint = () => {
        if (hintsLeft <= 0 || !word) return;

        console.log("board before hint:", board[currRow]);

        const emptyIndices = board[currRow]
            .map((c, i) => {
                const wasCorrectBefore = colors
                    .slice(0, currRow)
                    .some((row) => row?.[i] === "correct");

                if (c.letter === "" && !wasCorrectBefore) {
                    return i;
                }
                return null;
            })
            .filter((i) => i !== null);



        console.log("Empty indices for hints:", emptyIndices);

        if (emptyIndices.length === 0) return;

        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const letter = word[randomIndex];

        const newBoard = board.map((r) => r.map((c) => ({ ...c })));
        newBoard[currRow][randomIndex] = { letter, isHint: true };

        const newColors = [...colors];
        newColors[currRow] = [...newColors[currRow]];
        newColors[currRow][randomIndex] = "correct";

        setBoard(newBoard);
        setColors(newColors);
        setHintsLeft((prev) => prev - 1);
    };

    return (
        <GameContext.Provider
            value={{
                board,
                colors,
                handleKeyPress,
                currRow,
                currCol,
                word,
                resetGame,
                help,
                setHelp,
                giveHint,
                hintsLeft,
                flippingRow,
                setFlippingRow
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
