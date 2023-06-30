import { DropDownField } from "./DropDownField";
import { DropDownItem } from "./DropDownItem";
import {
  ImBlocked,
  /* ImVolumeHigh, */ ImVolumeMute2,
  ImExit,
} from "react-icons/im";
import { nanoid } from "nanoid";

export const RoomDropDownMenu = ({ type }) => {
  return (
    <DropDownField>
      <DropDownItem key={nanoid()} text={"Покинути кімнату"}>
        <ImExit />
      </DropDownItem>

      <DropDownItem key={nanoid()} text={"Вимкнути сповіщення"}>
        <ImVolumeMute2 />
      </DropDownItem>

      {type === "1x1" && (
        <DropDownItem key={nanoid()} text={"В чорний список"}>
          <ImBlocked />
        </DropDownItem>
      )}
    </DropDownField>
  );
};
