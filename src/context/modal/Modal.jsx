import PropTypes from "prop-types";
import { AuthModal } from "../../components/Modals/AuthModal";
import { AllRoomsModal } from "../../components/Modals/AllRoomsModal";
import { CreateNewRoomModal } from "../../components/Modals/CreateNewRoomModal";
import { OnlineUsersModal } from "../../components/Modals/OnlineUsersModal";
import { SettingsModal } from "../../components/Modals/SettingsModal";
import { RulesModal } from "../../components/Modals/RulesModal";
import { useModal } from "../../hooks/contextHooks";

export const Modal = ({openedModal, joinExistingRoom, addNewRoom}) => {
  return (
    <>
    {openedModal === "Auth" && (
      <AuthModal />
    )}
    {openedModal === "AllRooms" && (
      <AllRoomsModal
        joinExistingRoom={joinExistingRoom}
      />
    )}
    {openedModal === "CreateNewRoom" && (
      <CreateNewRoomModal  addNewRoom={addNewRoom} />
    )}
    {openedModal === "OnlineUsers" && (
      <OnlineUsersModal
        addNewRoom={addNewRoom}
      />
    )}
    {openedModal === "Settings" && (
      <SettingsModal />
    )}
    {openedModal === "Rules" && (
      <RulesModal />
    )}
  </>
  );
};

Modal.propTypes = {
  joinExistingRoom:PropTypes.func, 
  addNewRoom:PropTypes.func
};
