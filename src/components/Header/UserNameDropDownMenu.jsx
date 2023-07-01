import PropTypes from "prop-types";
import { DropDownField } from "../Common/DropDownField";
import { DropDownItem } from "../Common/DropDownItem";
import { nanoid } from "nanoid";
import { useAutoClosing } from "../../hooks/useAutoclosing";

export const UserNameDropDownMenu = ({
  setOpenedModal,
  setIsDropDownMenuOpen,
}) => {
  useAutoClosing(() => setIsDropDownMenuOpen(false));

  return (
    <DropDownField listStyles="border-none">
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
