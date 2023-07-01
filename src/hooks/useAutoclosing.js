import { useEffect } from "react";

export const useAutoClosing = (closeFunction) => {
    useEffect(() => {
        const handleClick = () => {
            closeFunction();
        };
        document.addEventListener("mouseup", handleClick);
        return () => {
          document.removeEventListener("mouseup", handleClick);
        };
      }, [closeFunction]);
}