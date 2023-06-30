import { DropDownField } from "../Common/DropDownField";
import { DropDownItem } from "../Common/DropDownItem";
import { nanoid } from "nanoid";

export const UserNameDropDownMenu = ({ setOpenedModal }) => {
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
