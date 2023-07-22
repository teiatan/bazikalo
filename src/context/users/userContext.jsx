import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    () =>
      JSON.parse(localStorage.getItem("user")) ?? {
        userName: "",
        _id: "",
        colors: {
          background: "#ffffff",
          text: "#000000",
        },
      }
  );
  useEffect(() => {
    if (user._id === "") {
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
