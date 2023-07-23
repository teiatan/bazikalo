import { ModalCover } from "./ModalCover";
import { memo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ColorPicker } from "../Common/ColorPicker";
import { updateUserSetting } from "../../api/ajaxRequests";
import { validateName } from "../../utils/nameValidation";
import { useModal, useUser } from "../../hooks/contextHooks";

// eslint-disable-next-line react/display-name
export const SettingsModal = memo(() => {
  const onClose = useModal().closeModal;
  const {user, setUser} = useUser();
  const [userName, setUserName] = useState(user.userName);
  const [userNameValidation, setUserNameValidation] = useState({
    isValid: true,
  });
  const [backgroundColor, setBackgroundColor] = useState(
    user.colors.background
  );
  const [textColor, setTextColor] = useState(user.colors.text);
  const inputRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleNameChange = (e) => {
    setUserName(e.target.value);
    validateName(e.target.value).then((res) => setUserNameValidation(res));
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
  };

  const handleSaveChangings = async (e) => {
    e.preventDefault;
    const newUser = {
      ...user,
      userName: userName,
      colors: { background: backgroundColor, text: textColor },
    };
    await updateUserSetting(newUser);
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
                ref={inputRef}
                type="text"
                className="w-full px-4 py-2 border rounded dark:bg-dkPrimaryBgC"
                placeholder="Введіть ваш нікнейм ..."
                value={userName}
                onChange={handleNameChange}
              />
              {!userNameValidation.isValid && (
                <p className="text-xs text-red-600">
                  {userNameValidation?.error}
                </p>
              )}
            </label>

            <div className="flex items-center justify-between">
              <div className="flex flex-col min-w-[150px] ">
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
          className={`px-4 py-2 border rounded bg-black text-white ${
            userNameValidation.isValid ? "opacity-100" : "opacity-30"
          }`}
          disabled={!userNameValidation.isValid}
        >
          Зберегти зміни
        </button>
      </form>
    </ModalCover>
  );
});

SettingsModal.propTypes = {
  onClose: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
};
