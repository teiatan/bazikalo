import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { socket } from "../../api/socket";

export const OnlineUsersContext = createContext();

export const OnlineUsersContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {

    // отримання даних по користувачу, який доєднався
    socket.on("userConnect", (user) => {
      const index = onlineUsers.findIndex(
        (presentUser) => presentUser._id === user._id
      );
      if (index === -1) {
        setOnlineUsers((prev) => [...prev, user]);
      } else {
        const arr = onlineUsers.splice(index, 1, user);
        setOnlineUsers(arr);
      }
    });

    // отримання даних по користувачу, який покинув чат
    socket.on("userDisconnect", (user) => {
      const index = onlineUsers.findIndex(
        (presentUser) => presentUser._id === user._id
      );
      if (index === -1) {
        return;
      } else {
        const arr = onlineUsers.splice(index, 1);
        setOnlineUsers(arr);
      }
    });

    // отримання всіх користувачів онлайн
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

  }, [onlineUsers]);

  return (
    <OnlineUsersContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      {children}
    </OnlineUsersContext.Provider>
  );
};

OnlineUsersContextProvider.propTypes = {
  children: PropTypes.node,
};
