import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const MessagesContext = createContext();

export const MessagesContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

MessagesContextProvider.propTypes = {
  children: PropTypes.node,
};
