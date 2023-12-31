import PropTypes from "prop-types";
import { RoomDropDownMenu } from "../Common/RoomDropDownMenu";
import { useState } from "react";
import { useCurrentRoom } from "../../hooks/contextHooks";

export const ToolBar = () => {
  const roomName = useCurrentRoom().name;
  const type = useCurrentRoom().type;
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 relative dark:bg-dkPrimaryBgC">
      <h2>{roomName}</h2>
      <button
        type="button"
        onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
      >
        ...
      </button>
      <div className="absolute top-[50px] right-[25px]">
        {isDropDownMenuOpen && (
          <RoomDropDownMenu
            type={type}
            closeDropDownMenu={() => setIsDropDownMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

ToolBar.propTypes = {
  roomName: PropTypes.string,
  type: PropTypes.string,
};
