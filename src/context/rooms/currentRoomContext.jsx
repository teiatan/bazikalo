import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { generalRoom } from "../../samples/activeRooms";

export const CurrentRoomContext = createContext();

export const CurrentRoomContextProvider = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState(generalRoom);
  return (
    <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

CurrentRoomContextProvider.propTypes = {
  children: PropTypes.node,
};
