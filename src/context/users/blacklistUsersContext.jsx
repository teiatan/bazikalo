import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const BlackListUsersContext = createContext();

export const BlackListUsersContextProvider = ({ children }) => {
  const [blackListUsers, setBlackListUsers] = useState(
    () => JSON.parse(localStorage.getItem("blackListUsers")) ?? []
  );
  return (
    <BlackListUsersContext.Provider
      value={{ blackListUsers, setBlackListUsers }}
    >
      {children}
    </BlackListUsersContext.Provider>
  );
};

BlackListUsersContextProvider.propTypes = {
  children: PropTypes.node,
};
