import { ActiveRooms } from "./ActiveRooms/ActiveRooms";
import { MessagesList } from "./MessagesList/MessagesList";
import { AllRoomsModal } from "./Modals/AllRoomsModal";
import { AuthModal } from "./Modals/AuthModal";
import { CreateNewRoomModal } from "./Modals/CreateNewRoomModal";
import { OnlineUsersModal } from "./Modals/OnlineUsersModal";
import { SettingsModal } from "./Modals/SettingsModal";
import { MessageInput } from "./MessageInput/MessageInput";
import { ToolBar } from "./ToolBar/Toolbar";
import { useCallback, useEffect, useState } from "react";
import { RulesModal } from "./Modals/RulesModal";
import { Header } from "./Header/Header";
import {
  openAvtiveRoomsWidth,
  closedAvtiveRoomsWidth,
} from "../utils/variables";
import { socket } from "../api/socket";
import { generalRoom } from "../samples/activeRooms";
import { createNewRoom, joinRoom, leaveNewRoom } from "../api/ajaxRequests";
import { useActiveRooms, useAllRooms, useCurrentRoom, useNotification, useUser } from "../hooks/contextHooks";

function App() {
  const { user } = useUser();
  const { setCurrentRoom } = useCurrentRoom();
  const { openedRooms, setOpenedRooms } = useActiveRooms();
  const { setAllRooms } = useAllRooms();

  const [ openedModal, setOpenedModal] = useState(
    () => JSON.parse(localStorage.getItem("user")) ?? "Auth"
  );
  const [areActiveRoomsOpen, setAreActiveRoomsOpen] = useState(false);

  const handleWindowBeforeUnload = useCallback(() => {
    socket.emit("userDisconnect", { ...user, status: "disconnected" });
  }, [user]);

  useEffect(() => {
    if (user._id === "") {
      return;
    }
    window.addEventListener("beforeunload", handleWindowBeforeUnload);

    socket.emit("userConnect", { ...user, status: "connected" });

  }, [user, handleWindowBeforeUnload]);

  useEffect(() => {
    // отримання всіх кімнат
    socket.on("allRooms", (rooms) => {
      setAllRooms(rooms);
      //оновлення відкритих кімнат
      const refreshedOpenedRooms = openedRooms.map((room) => {
        const indexInAll = rooms.findIndex(
          (refreshedRoom) => refreshedRoom._id === room._id
        );
        return rooms[indexInAll];
      });
      setOpenedRooms(refreshedOpenedRooms);
    });
  }, [openedRooms, setAllRooms, setOpenedRooms]);

  const closeModal = () => {
    setOpenedModal("");
  };

  const leaveRoom = (roomId) => {
    setOpenedRooms((prev) => prev.filter((room) => room._id !== roomId));
    leaveNewRoom(roomId, user._id);
    setCurrentRoom(generalRoom);
  };

  const joinExistingRoom = (roomId) => {
    joinRoom(roomId, user._id).then((res) => {
      setOpenedRooms((prev) => [...prev, res]);
      setCurrentRoom(res);
    });
  };

  const addNewRoom = ({
    name,
    activeUsers = [],
    type = "group",
    backgroundColor = "#ffffff",
    textColor = "#000000",
    isPrivate = false,
    password = "",
    userToChat = [],
  }) => {
    const newRoom = {
      name,
      activeUsers: [user._id, ...userToChat, ...activeUsers],
      type,
      colors: {
        background: backgroundColor,
        text: textColor,
      },
      private: isPrivate,
      password,
    };
    createNewRoom(newRoom).then((room) => {
      setCurrentRoom(room);
      setOpenedRooms((prev) => [...prev, room]);
    });
  };

  const notification = useNotification();

  return (
    <>
      <Header setOpenedModal={setOpenedModal} />

      <div className="flex w-screen h-screen overflow-hidden pt-[80px]">
        <div
          className={`
          p-4 border
          ${
            areActiveRoomsOpen
              ? `w-[${openAvtiveRoomsWidth}]`
              : `w-[${closedAvtiveRoomsWidth}]`
          }
        `}
        >
          <ActiveRooms
            setAreActiveRoomsOpen={setAreActiveRoomsOpen}
            areActiveRoomsOpen={areActiveRoomsOpen}
            setOpenedModal={setOpenedModal}
            leaveRoom={leaveRoom}
            joinExistingRoom={joinExistingRoom}
          />
        </div>

        <div
          className={`
          grid grid-rows-[80px_calc(100vh-80px-80px-160px)_160px] border
          ${
            areActiveRoomsOpen
              ? `w-[calc(100vw-345px)]`
              : `w-[calc(100vw-102px)]`
          }
        `}
        >
          <ToolBar />
          <MessagesList />
          <MessageInput />
        </div>

        {openedModal === "Auth" && (
          <AuthModal
            onClose={closeModal}
            changeModal={setOpenedModal}
          />
        )}
        {openedModal === "AllRooms" && (
          <AllRoomsModal
            setOpenedModal={setOpenedModal}
            onClose={closeModal}
            joinExistingRoom={joinExistingRoom}
          />
        )}
        {openedModal === "CreateNewRoom" && (
          <CreateNewRoomModal onClose={closeModal} addNewRoom={addNewRoom} />
        )}
        {openedModal === "OnlineUsers" && (
          <OnlineUsersModal
            onClose={closeModal}
            addNewRoom={addNewRoom}
          />
        )}
        {openedModal === "Settings" && (
          <SettingsModal onClose={closeModal} />
        )}
        {openedModal === "Rules" && (
          <RulesModal
            onClose={closeModal}
            changeModal={setOpenedModal}
          />
        )}

        {notification.NotificationMarkup}
      </div>
    </>
  );
}

export default App;
