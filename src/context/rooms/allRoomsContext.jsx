import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AllRoomsContext = createContext();

export const AllRoomsContextProvider = ({ children }) => {
  const [allRooms, setAllRooms] = useState([]);
  return (
    <AllRoomsContext.Provider value={{ allRooms, setAllRooms }}>
      {children}
    </AllRoomsContext.Provider>
  );
};

AllRoomsContextProvider.propTypes = {
  children: PropTypes.node,
};
