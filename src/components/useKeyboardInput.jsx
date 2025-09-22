import { useEffect } from "react";

function useKeyboardInput(onKeyPress) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            let key = e.key.toUpperCase();

            if (key === "ENTER") {
                e.preventDefault();
                onKeyPress("ENTER");
            } else if (key === "BACKSPACE") {
                e.preventDefault();
                onKeyPress("DELETE");
            } else if (/^[A-Z]$/.test(key) && key.length === 1) {
                e.preventDefault();
                onKeyPress(key);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onKeyPress]);
}

export default useKeyboardInput;
