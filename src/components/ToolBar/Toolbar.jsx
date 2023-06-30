import { RoomDropDownMenu } from "../Common/RoomDropDownMenu";
import { useState } from "react";

export const ToolBar = ({ roomName, type }) => {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

  return (
    <div className="border flex justify-between items-center p-4 relative">
      <h2>{roomName}</h2>
      <button
        type="button"
        onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
      >
        ...
      </button>
      <div className="absolute top-[50px] right-[25px]">
        {isDropDownMenuOpen && <RoomDropDownMenu type={type} />}
      </div>
    </div>
  );
};
