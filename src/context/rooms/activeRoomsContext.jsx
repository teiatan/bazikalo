// на заміну openedRooms

import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { generalRoom } from "../../samples/activeRooms";

export const ActiveRoomsContext = createContext();

export const ActiveRoomsContextProvider = ({ children }) => {
  const [openedRooms, setOpenedRooms] = useState([generalRoom]);
  return (
    <ActiveRoomsContext.Provider value={{ openedRooms, setOpenedRooms }}>
      {children}
    </ActiveRoomsContext.Provider>
  );
};

ActiveRoomsContextProvider.propTypes = {
  children: PropTypes.node,
};
