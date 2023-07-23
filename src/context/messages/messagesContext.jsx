import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { socket } from "../../api/socket";
import { useCurrentRoom, useUser } from "../../hooks/contextHooks";
import { nanoid } from "nanoid";

export const MessagesContext = createContext();

export const MessagesContextProvider = ({ children }) => {
  const {user} = useUser();
  const {currentRoom} = useCurrentRoom();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // отримання нових повідомлень
    socket.on("messages", (message) => {
      setMessages((prevMessages) => {
        const index = prevMessages.findIndex((mes) => mes.id === message.id);
        if (index === -1) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    });

  });

  const addNewMessage = (messageText, messageUser = user, taggedUser) => {
    const newMessageObject = {
      id: nanoid(),
      owner: messageUser,
      content: messageText,
      createdAt: new Date().toISOString(),
      roomId: currentRoom._id,
      tag: {
        status: taggedUser ? true : false,
        whom: {
          _id: taggedUser?._id,
          userName: taggedUser?._userName,
        },
      },
    };
    socket.emit("messages", newMessageObject);
  };

  return (
    <MessagesContext.Provider value={{ messages, setMessages, addNewMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

MessagesContextProvider.propTypes = {
  children: PropTypes.node,
};
