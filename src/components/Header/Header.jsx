import { useState } from "react";
import { UserNameDropDownMenu } from "./UserNameDropDownMenu";

export const Header = ({ userName, setOpenedModal }) => {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

  const handleDropdownMenuClick = (modalName) => {
    setOpenedModal(modalName);
    setIsDropDownMenuOpen(false);
  };

  return (
    <div className="fixed w-screen h-[80px] z-10 bg-[#D9D9D9] text-2xl">
      <div className="h-full flex items-center justify-between m-auto">
        <div className="w-[345px] text-center">LOGO</div>

        <div className="mr-[100px] flex gap-[30px] relative">
          <button className="rounded-full bg-white p-2">Theme button</button>

          {userName === "" ? (
            <button className="min-w-[223px]">UA/ENG</button>
          ) : (
            <button
              onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
              className="rounded-full bg-white p-2 min-w-[223px]"
            >
              {userName}
            </button>
          )}

          {isDropDownMenuOpen && (
            <div className="absolute top-[35px] right-0 min-w-[223px] rounded-[30px]">
              <UserNameDropDownMenu setOpenedModal={handleDropdownMenuClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
