import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
     const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("mode")) ?? true
    );
     useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(darkMode));
     }, [darkMode]);
    
      const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
    return (
        <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
      { children }      
   </ThemeContext.Provider>  
)
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};