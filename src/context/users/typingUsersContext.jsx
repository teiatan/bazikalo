import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const TypingUsersContext = createContext();

export const TypingUsersContextProvider = ({ children }) => {
  const [typingUsers, setTypingUsers] = useState([]);
  return (
    <TypingUsersContext.Provider value={{ typingUsers, setTypingUsers }}>
      {children}
    </TypingUsersContext.Provider>
  );
};

TypingUsersContextProvider.propTypes = {
  children: PropTypes.node,
};
