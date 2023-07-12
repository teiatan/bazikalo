import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const OnlineUsersContext = createContext();

export const OnlineUsersContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

OnlineUsersContextProvider.propTypes = {
  children: PropTypes.node,
};
