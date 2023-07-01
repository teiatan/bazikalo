import { useEffect } from "react";

export const useAutoClosing = (closeFunction) => {
    useEffect(() => {
        const handleClick = (e) => {
          if (e.target !== e.currentTarget) {
            closeFunction();
          }
        };
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, [closeFunction]);
}