import PropTypes from "prop-types";
import { DropDownField } from "../Common/DropDownField";
import { DropDownItem } from "../Common/DropDownItem";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export const UserNameDropDownMenu = ({
  setOpenedModal,
  setIsDropDownMenuOpen,
}) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (e.target !== e.currentTarget) {
        setIsDropDownMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [setIsDropDownMenuOpen]);

  return (
    <DropDownField>
      <DropDownItem
        key={nanoid()}
        text={"Налаштування"}
        onClick={() => setOpenedModal("Settings")}
      ></DropDownItem>
      <DropDownItem
        key={nanoid()}
        text={"Всі користувачі"}
        onClick={() => setOpenedModal("OnlineUsers")}
      ></DropDownItem>
      <DropDownItem
        key={nanoid()}
        text={"Всі кімнати"}
        onClick={() => setOpenedModal("AllRooms")}
      ></DropDownItem>
      <DropDownItem
        key={nanoid()}
        text={"Правила чату"}
        onClick={() => setOpenedModal("Rules")}
      ></DropDownItem>
    </DropDownField>
  );
};

UserNameDropDownMenu.propTypes = {
  setOpenedModal: PropTypes.func,
  setIsDropDownMenuOpen: PropTypes.func,
  isDropDownMenuOpen: PropTypes.bool,
};
