import { ActiveRooms } from "./ActiveRooms/ActiveRooms";
import { MessagesList } from "./MessagesList/MessagesList";
import { AllRoomsModal } from "./Modals/AllRoomsModal";
import { AuthModal } from "./Modals/AuthModal";
import { CreateNewRoomModal } from "./Modals/CreateNewRoomModal";
import { OnlineUsersModal } from "./Modals/OnlineUsersModal";
import { SettingsModal } from "./Modals/SettingsModal";
import { MessageInput } from "./MessageInput/MessageInput";
import { ToolBar } from "./ToolBar/Toolbar";
import { useEffect, useState } from "react";
import { RulesModal } from "./Modals/RulesModal";
import { Header } from "./Header/Header";
import {
  openAvtiveRoomsWidth,
  closedAvtiveRoomsWidth,
} from "../utils/variables";
import { nanoid } from "nanoid";
import { messagesArray } from "../samples/messagesArray";
import { socket } from "../api/socket";

function App() {
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
  const [messages, setMessages] = useState([...messagesArray]);
  const [currentRoom, setCurrentRoom] = useState({
    name: "general",
    id: "1408",
  });
  const [openedRooms, setOpenedRooms] = useState(["1408"]);
  const [allRooms] = useState(["1408", "111"]);
  const [openedModal, setOpenedModal] = useState(
    () => JSON.parse(localStorage.getItem("user")) ?? "Auth"
  );
  const [areActiveRoomsOpen, setAreActiveRoomsOpen] = useState(false);
  // const [ws, setWs] = useState();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    socket.on("messages", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(message);
    });
  }, []);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:4000");
  //   setWs(ws);
  //   ws.addEventListener("message", handleMessage);

  //   function handleMessage(e) {
  //     console.log(e.data);
  //   }
  // }, []);

  // useEffect(()=>{
  // приймання нових повідомлень з бекенду
  // socket.on("message", message => {
  //   setMessages(prevMessages => [...prevMessages, message])
  // })
  // }, []);

  const closeModal = () => {
    setOpenedModal("");
  };

  const addNewMessage = (messageText, messageUser = user) => {
    const newMessageObject = {
      id: nanoid(),
      owner: messageUser,
      content: messageText,
      createdAt: new Date().toISOString(),
      roomId: currentRoom.id,
    };
    // setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    // відправка на бекенд
    socket.emit("messages", newMessageObject);
  };

  return (
    <>
      <Header user={user} setOpenedModal={setOpenedModal} />

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
            openedRooms={openedRooms}
            setOpenedRooms={setOpenedRooms}
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
            messages={messages}
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
          <ToolBar roomName={currentRoom.name} type={currentRoom.type} />
          <MessagesList
            messages={messages.filter(
              (message) => message.roomId === currentRoom.id
            )}
            user={user}
          />
          <MessageInput addNewMessage={addNewMessage} />
        </div>

        {openedModal === "Auth" && (
          <AuthModal
            onClose={closeModal}
            changeModal={setOpenedModal}
            setUser={setUser}
          />
        )}
        {openedModal === "AllRooms" && (
          <AllRoomsModal
            onClose={closeModal}
            allRooms={allRooms}
            setCurrentRoom={setCurrentRoom}
          />
        )}
        {openedModal === "CreateNewRoom" && (
          <CreateNewRoomModal onClose={closeModal} />
        )}
        {openedModal === "OnlineUsers" && (
          <OnlineUsersModal onClose={closeModal} />
        )}
        {openedModal === "Settings" && (
          <SettingsModal onClose={closeModal} user={user} setUser={setUser} />
        )}
        {openedModal === "Rules" && (
          <RulesModal
            onClose={closeModal}
            user={user}
            changeModal={setOpenedModal}
          />
        )}
      </div>
    </>
  );
}

export default App;
