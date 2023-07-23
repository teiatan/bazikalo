import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
     const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("mode")) ?? true
    );
    
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