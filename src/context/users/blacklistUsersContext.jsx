import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const BlackListUsersContext = createContext();

export const BlackListUsersContextProvider = ({ children }) => {
  const [blackListUsers, setBlackListUsers] = useState(
    () => JSON.parse(localStorage.getItem("blackListUsers")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("blackListUsers", JSON.stringify(blackListUsers));
  }, [blackListUsers]);

  const addToBlackList = (userDataObject) => {
    setBlackListUsers((prev) => [...prev, userDataObject]);
  };

  const removeFromBlackList = (userDataObject) => {
    const index = blackListUsers.findIndex(
      (listUser) => listUser._id === userDataObject._id
    );
    if (index === -1) {
      return;
    } else {
      const arr = blackListUsers.splice(index, 1);
      setBlackListUsers(arr);
    }
  };
  return (
    <BlackListUsersContext.Provider
      value={{ blackListUsers, setBlackListUsers, addToBlackList, removeFromBlackList }}
    >
      {children}
    </BlackListUsersContext.Provider>
  );
};

BlackListUsersContextProvider.propTypes = {
  children: PropTypes.node,
};
