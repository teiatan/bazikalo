import PropTypes from "prop-types";
import { useState } from "react";
import { RoomDropDownMenu } from "../Common/RoomDropDownMenu";

export const OneActiveRoom = ({
  name,
  amountOfActiveUsers,
  lastMessage,
  areActiveRoomsOpen,
  type,
  leaveRoom,
  id,
}) => {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

  const handleDropDownMenuButton = (e) => {
    e.stopPropagation();
    setIsDropDownMenuOpen(!isDropDownMenuOpen);
  };

  const handleLeaveRoom = () => {
    leaveRoom(id);
  };

  return (
    <div className="relative w-full p-4 flex gap-2">
      <div className="flex justify-center items-center p-4 text-dkSecondaryTextC  border rounded-sm bg-dkSecondaryBgC dark:bg-dkGeneralBgC border-dkPrimaryBorderC">
        {name.slice(0, 2).toUpperCase()}
      </div>

      {areActiveRoomsOpen && (
        <div className="w-full flex flex-col justify-between">
          <p className="absolute bottom-0 right-1">{amountOfActiveUsers}</p>

          <button
            type="button"
            className="absolute top-0 right-1"
            onClick={handleDropDownMenuButton}
          >
            ...
          </button>

          <h3 className="font-bold">{name}</h3>
          <p className="text-xs">{lastMessage}</p>
        </div>
      )}

      {areActiveRoomsOpen && isDropDownMenuOpen && (
        <div className="absolute top-[20px] right-[13px]">
          <RoomDropDownMenu
            type={type}
            closeDropDownMenu={() => setIsDropDownMenuOpen(false)}
            leaveRoom={handleLeaveRoom}
          />
        </div>
      )}
    </div>
  );
};

OneActiveRoom.propTypes = {
  name: PropTypes.string,
  amountOfActiveUsers: PropTypes.number,
  lastMessage: PropTypes.string,
  areActiveRoomsOpen: PropTypes.bool,
  type: PropTypes.string,
  leaveRoom: PropTypes.func,
  id: PropTypes.string,
};
