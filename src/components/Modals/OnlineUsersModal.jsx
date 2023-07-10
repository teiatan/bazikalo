import { memo, useState, useEffect, useRef } from "react";
import { DropDownField } from "../Common/DropDownField";
import { DropDownItem } from "../Common/DropDownItem";
import { nanoid } from "nanoid";
import { ModalCover } from "./ModalCover";
import { HiDotsVertical } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { PiChatsCircleBold } from "react-icons/pi";
import { AiOutlineStop } from "react-icons/ai";

// eslint-disable-next-line react/display-name
export const OnlineUsersModal = memo(
  ({
    onClose,
    onlineUsers,
    blackListUsers,
    addToBlackList,
    removeFromBlackList,
    addNewRoom,
  }) => {
    const [searchUserOnline, setsearchUserOnline] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [openDropDownIndex, setOpenDropDownIndex] = useState(null);
    const timeoutRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        inputRef.current.focus();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    useEffect(() => {
      setFilteredUsers(onlineUsers);
    }, []);

    useEffect(() => {
      const filtered = onlineUsers.filter((user) =>
        user.toLowerCase().includes(searchUserOnline.toLowerCase())
      );
      setFilteredUsers(filtered);
    }, [searchUserOnline]);

    const onChangeHandler = (event) => {
      setsearchUserOnline(event.target.value);
    };

    const shortenNickname = (nickname) => {
      if (nickname.length === 1) {
        return nickname.toLocaleUpperCase();
      }
      const shortenNickName = nickname[0] + nickname.slice(-1);
      return shortenNickName.toLocaleUpperCase();
    };

    const handleDropDownMenuOpen = (index) => {
      clearTimeout(timeoutRef.current);
      setOpenDropDownIndex(index);
    };

    const handleDropDownMenuClose = () => {
      timeoutRef.current = setTimeout(() => {
        setOpenDropDownIndex(null);
      }, 200);
    };

    const isInBlackList = (user) => {
      return blackListUsers.includes(user);
    };

    const handleStart1x1Chat = () => {
      addNewRoom({
        name: "1x1userName",
        userToChat: ["1x1userId"],
        type: "1x1",
        backgroundColor: "1x1userBgColor",
        textColor: "1x1userTxColor",
      });
      onClose();
    };

    return (
      <ModalCover onClose={onClose}>
        <div className="p-6">
          <h3 className="text-center font-bold mb-2">Всі користувачі</h3>
          <form className="relative">
            <input
              ref={inputRef}
              type="text"
              onChange={onChangeHandler}
              value={searchUserOnline}
              className="w-full px-4 py-2 border rounded mb-5"
              placeholder="Пошук користувача"
            />
            <BsSearch className="absolute top-[12px] right-[15px]" />
          </form>
          <ul
            style={{ height: "350px" }}
            className="items-start w-[600px] overflow-hidden overflow-y-scroll"
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <li
                  key={nanoid()}
                  className="flex items-start justify-between border border-black p-2 mb-3 relative"
                >
                  <div className="flex">
                    <span className="flex items-center justify-center px-4 py-2 border mr-5 rounded font-bold">
                      {shortenNickname(user)}
                    </span>
                    <span>{user}</span>
                  </div>
                  <div>
                    <button
                      className="mb-2"
                      onMouseEnter={() => handleDropDownMenuOpen(index)}
                      onMouseLeave={handleDropDownMenuClose}
                    >
                      <HiDotsVertical />
                    </button>
                    {openDropDownIndex === index && (
                      <div
                        className="absolute top-[20px] right-[20px] z-[1000]"
                        onMouseEnter={() => handleDropDownMenuOpen(index)}
                        onMouseLeave={handleDropDownMenuClose}
                      >
                        <DropDownField>
                          <DropDownItem
                            key={nanoid()}
                            text={"Чат 1х1"}
                            onClick={handleStart1x1Chat}
                          >
                            <PiChatsCircleBold />
                          </DropDownItem>
                          {isInBlackList(user) ? (
                            <DropDownItem
                              key={nanoid()}
                              text={"Видалити з чорного списка"}
                              onClick={removeFromBlackList(user)}
                            >
                              <AiOutlineStop />
                            </DropDownItem>
                          ) : (
                            <DropDownItem
                              key={nanoid()}
                              text={"Додати в чорний список"}
                              onClick={addToBlackList(user)}
                            >
                              <AiOutlineStop />
                            </DropDownItem>
                          )}
                        </DropDownField>
                      </div>
                    )}
                    {isInBlackList(user) && <AiOutlineStop />}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center">Користувача не знайдено</p>
            )}
          </ul>
        </div>
      </ModalCover>
    );
  }
);