import { ModalCover } from "./ModalCover";
import { useState } from "react";
import PropTypes from "prop-types";
import { ColorPicker } from "../Common/ColorPicker";

export const SettingsModal = ({ onClose, user, setUser }) => {
  const [userName, setUserName] = useState(user.userName);
  const [backgroundColor, setBackgroundColor] = useState(
    user.colors.background
  );
  const [textColor, setTextColor] = useState(user.colors.text);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleSaveChangings = (e) => {
    e.preventDefault;
    const newUser = {
      ...user,
      colors: { background: backgroundColor, text: textColor },
    };
    setUser(newUser);
    onClose();
  };

  return (
    <ModalCover onClose={onClose}>
      <form className="flex flex-col gap-5 w-3/4">
        <h2 className="text-center">Налаштування</h2>

        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <span
              className={`flex justify-center items-center px-4 py-2 border rounded flex-grow min-w-[160px] min-h-[160px] font-bold text-7xl`}
              style={{
                color: textColor,
                backgroundColor: backgroundColor,
              }}
            >
              {userName.slice(0, 2).toLocaleUpperCase()}
            </span>
          </div>

          <div>
            <label>
              Мій нікнейм
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="Введіть ваш нікнейм ..."
                value={userName}
                onChange={handleNameChange}
              />
            </label>

            <div className="flex items-center justify-between">
              <div className="flex flex-col min-w-[150px]">
                <div className="flex items-center justify-between">
                  <ColorPicker
                    name="Колір фону"
                    id="backgroundColor"
                    colorValue={backgroundColor}
                    handleColorValue={handleBackgroundColorChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <ColorPicker
                    name="Колір тексту"
                    id="textColor"
                    colorValue={textColor}
                    handleColorValue={handleTextColorChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                Мова
                <button type="button">УКР</button>
                <button type="button">ENG</button>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSaveChangings}
          className="px-4 py-2 border rounded bg-black text-white"
        >
          Зберегти зміни
        </button>
      </form>
    </ModalCover>
  );
};

SettingsModal.propTypes = {
  onClose: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
};
