import { memo, useState, useEffect, useRef } from "react";
import { ModalCover } from "./ModalCover";
import { BsEyeSlash } from "react-icons/bs";
import { nanoid } from "nanoid";
import { createNewRoom } from "../../api/ajaxRequests";

export const CreateNewRoomModal = memo(({ onClose, addNewRoom }) => {
  const [roomName, setRoomName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [textColor, setTextColor] = useState("#ffffff");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const inputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isPrivate) {
      passwordInputRef.current.focus();
    }
  }, [isPrivate]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  console.log(password)

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const shortenRoomName = (roomName) => {
    if (roomName.length > 0) {
      if (roomName.length === 1) {
        return roomName.toLocaleUpperCase();
      }
      const shortenRoomName = roomName[0] + roomName.slice(-1);
      return shortenRoomName.toLocaleUpperCase();
    }
  };

  const handleCreateRoom = () => {
    if (roomName.trim() === "") {
      alert("Назва кімнати не може бути порожньою!");
      return;
    }

    addNewRoom({
      name: roomName,
      type: "group",
      backgroundColor,
      textColor,
      isPrivate,
      password: password,
    });
    onClose();
  };

  return (
    <ModalCover onClose={onClose}>
      <div className="flex flex-col gap-4 w-3/4">
        <h3 className="text-center font-bold mb-2">Нова кімната</h3>
        <input
          ref={inputRef}
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Введіть назву кімнати ..."
          value={roomName}
          onChange={handleRoomNameChange}
        />
        <div className="flex justify-around">
          <div>
            <input
              type="radio"
              id="public"
              name="typeroom"
              checked={!isPrivate}
              onChange={() => setIsPrivate(false)}
            />
            <label htmlFor="public">Публічна</label>
          </div>
          <div>
            <input
              type="radio"
              id="private"
              name="typeroom"
              checked={isPrivate}
              onChange={() => setIsPrivate(true)}
            />
            <label htmlFor="private">Приватна</label>
          </div>
        </div>
        <div className={`relative ${isPrivate ? "visible" : "invisible"}`}>
          <p>Створіть ключ для приватної кімнати</p>
          <input
            ref={passwordInputRef}
            type={passwordType}
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={handlePassword}
          />
          <BsEyeSlash
            onClick={togglePassword}
            className="absolute bottom-8 right-2 cursor-pointer"
          />
          <p className="text-sm">
            *Після створення кімнати ключ змінити не можна
          </p>
        </div>
        <p>Оберіть вид вашой кімнати</p>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-8">
              <span>Колір фону</span>
              <input
                type="color"
                className="w-10 h-10 rounded-full"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
              />
            </div>
            <div className="flex items-center justify-between gap-8">
              <span>Колір тексту</span>
              <input
                type="color"
                className="w-10 h-10 rounded-full"
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>
          </div>
          <div className="flex">
            <span
              className="flex items-center justify-center px-4 py-2 border mr-5 rounded font-bold min-w-[80px]"
              style={{
                color: textColor,
                backgroundColor: backgroundColor,
              }}
            >
              {shortenRoomName(roomName)}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCreateRoom}
            className="px-4 py-2 border rounded bg-black text-white"
          >
            Створити кімнату
          </button>
        </div>
      </div>
    </ModalCover>
  );
});
