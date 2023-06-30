import { activeRooms } from "../../samples/activeRooms";
import { OneActiveRoom } from "./OneActiveRoom";
import { SearchForm } from "../Common/SearchForm";
import { FilterRooms } from "./FilterRooms";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export const ActiveRooms = ({
  rooms = activeRooms,
  areActiveRoomsOpen,
  setAreActiveRoomsOpen,
  setOpenedModal,
  messages,
  currentRoom,
  setCurrentRoom,
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="relative">
        {areActiveRoomsOpen && <h2 className="text-center">Активні кімнати</h2>}
        {areActiveRoomsOpen && <SearchForm placeholder={"Пошук кімнат..."} />}

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
          const { id, name, activeUsers, type } = room;
          const thisRoomMessages = messages.filter(
            (message) => message.roomId === id
          );
          const lastMessage =
            thisRoomMessages[thisRoomMessages.length - 1]?.content;
          return (
            <div
              key={id}
              onClick={() => setCurrentRoom({ name, id, type })}
              className={currentRoom.id === id ? "bg-[#D9D9D9]" : ""}
            >
              <OneActiveRoom
                id={id}
                name={name}
                amountOfActiveUsers={activeUsers.length}
                lastMessage={lastMessage}
                areActiveRoomsOpen={areActiveRoomsOpen}
                type={type}
              />
            </div>
          );
        })}
      </div>

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
        <button onClick={() => setOpenedModal("CreateNewRoom")}>
          {areActiveRoomsOpen ? "створити кімнату +" : "+"}
        </button>
      </div>
    </div>
  );
};
