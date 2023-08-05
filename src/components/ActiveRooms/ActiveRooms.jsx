import { OneActiveRoom } from "./OneActiveRoom";
import { FilterRooms } from "./FilterRooms";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { IoAccessibilitySharp } from "react-icons/io5";
import { useActiveRooms, useCurrentRoom, useMessages, useModal } from "../../hooks/contextHooks";

export const ActiveRooms = ({
  areActiveRoomsOpen,
  setAreActiveRoomsOpen,
  leaveRoom,
}) => {
  const { setOpenedModal } = useModal();
  const {messages} = useMessages();
  const {currentRoom, setCurrentRoom} = useCurrentRoom();
  const rooms = useActiveRooms().openedRooms;
  return (
    <div className="flex flex-col justify-between h-full text-dkPrimaryTextC">
      <div className="relative">
        {areActiveRoomsOpen && <h2 className="text-center">Активні кімнати</h2>}
        {/* {areActiveRoomsOpen && <SearchForm placeholder={"Пошук кімнат..."} />} */}

        {areActiveRoomsOpen && <FilterRooms />}

        {areActiveRoomsOpen ? (
          <button
            className="absolute -right-6"
            onClick={() => setAreActiveRoomsOpen(false)}
          >
            <BsFillArrowLeftCircleFill />
          </button>
        ) : (
          <button
            className="absolute -right-6"
            onClick={() => setAreActiveRoomsOpen(true)}
          >
            <BsFillArrowRightCircleFill />
          </button>
        )}

        {rooms.map((room) => {
          const thisRoomMessages = messages.filter(
            (message) => message.roomId === room?._id
          );
          const lastMessage =
            thisRoomMessages[thisRoomMessages.length - 1]?.content;
          return (
            <div
              key={room?._id}
              onClick={() => setCurrentRoom(room)}
              className={currentRoom._id === room?._id ? `bg-dkGeneralBgC border rounded-xl border-dkPrimaryBorderC` : ""}
            >
              <OneActiveRoom
                id={room?._id}
                name={name}
                amountOfActiveUsers={room?.activeUsers.length}
                lastMessage={lastMessage}
                areActiveRoomsOpen={areActiveRoomsOpen}
                type={room?.type}
                leaveRoom={leaveRoom}
              />
            </div>
          );
        })}
      </div>

      {areActiveRoomsOpen && <>
      <div className="flex flex-col gap-[5px]">
        <button onClick={() => setOpenedModal("AllRooms")}>
          {areActiveRoomsOpen ? (
            "знайти кімнату "
          ) : (
            <div className="flex justify-center items-center">
              <PiMagnifyingGlassBold />
            </div>
          )}
        </button>

        <button onClick={() => setOpenedModal("OnlineUsers")}>
          {areActiveRoomsOpen ? (
            "знайти користувача "
          ) : (
            <div className="flex justify-center items-center">
              <IoAccessibilitySharp />
            </div>
          )}
        </button>

        <button onClick={() => setOpenedModal("CreateNewRoom")}>
          {areActiveRoomsOpen ? "створити кімнату +" : "+"}
        </button>
      </div>
      </>}
    </div>
  );
};
