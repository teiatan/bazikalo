import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const defaultUser = {
    userName: "",
    _id: "",
    colors: {
      background: "#ffffff",
      text: "#000000",
    },
  };
  const [user, setUser] = useState(
    () =>
      JSON.parse(localStorage.getItem("user")) ?? defaultUser
  );
  useEffect(() => {
    if (user._id === "") {
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

  }, [user]);

  const exitUser = () => {
    setUser(defaultUser)
  }

  return (
    <UserContext.Provider value={{ user, setUser, exitUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
