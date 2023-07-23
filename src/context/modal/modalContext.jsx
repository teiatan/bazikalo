import { createContext, useState } from "react";

import PropTypes from "prop-types";
import { Modal } from "./Modal";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [ openedModal, setOpenedModalState] = useState(
    () => JSON.parse(localStorage.getItem("user")) ?? "Auth"
  );

 const setOpenedModal = (type) => {
    setOpenedModalState(type);
    const modalTypes = ["Auth", "AllRooms", "CreateNewRoom", "OnlineUsers", "Settings", "Rules"];
    if(modalTypes.includes(type)) {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  };

  const ModalMarkup = (joinExistingRoom, addNewRoom) => isModalOpen && (
    <Modal openedModal={openedModal} joinExistingRoom={joinExistingRoom} addNewRoom={addNewRoom}/>
  );

  const closeModal = () => {
    setOpenedModal("");
  };

  return (
    <ModalContext.Provider
      value={{ ModalMarkup, openedModal, setOpenedModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalContextProvider.propTypes = {
  children: PropTypes.node,
};
