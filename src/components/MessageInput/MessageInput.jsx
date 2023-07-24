import { memo, useState, useEffect, useRef } from "react";
import Picker from "@emoji-mart/react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiSmile } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import PropTypes from "prop-types";
import { useMessages } from "../../hooks/contextHooks";

// eslint-disable-next-line react/display-name
export const MessageInput = memo(() => {
  const { addNewMessage } = useMessages();
  const [message, setMessage] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = () => {
      inputRef.current.focus();
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const handleSendingMessage = () => {
    if (message.trim() === "") {
      alert("Поле введення порожнє!");
      return;
    }
    addNewMessage(message);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setMessage("");
    }
    if (event.key === "Enter") {
      onChangeHandler(event);
      handleSendingMessage();
      setMessage("");
    }
  };

  const handleEmojiPickerOpen = () => {
    clearTimeout(timeoutRef.current);
    setEmojiPickerVisible(true);
  };

  const handleEmojiPickerClose = () => {
    timeoutRef.current = setTimeout(() => {
      setEmojiPickerVisible(false);
      inputRef.current.focus();
    }, 200);
  };

  const addEmoji = ({ native }) => {
    setMessage((message + native).trim());
  };

  return (
    <div className="border flex items-center relative dark:bg-dkPrimaryBgC">
      <input
        ref={inputRef}
        type="text"
        onChange={onChangeHandler}
        value={message}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 border rounded dark:bg-dkGeneralBgC "
        placeholder="Type text ..."
      />
      {emojiPickerVisible && (
        <div
          className="absolute bottom-[7rem] right-3"
          onMouseEnter={handleEmojiPickerOpen}
          onMouseLeave={handleEmojiPickerClose}
        >
          <Picker onEmojiSelect={(emojiTag) => addEmoji(emojiTag)} />
        </div>
      )}
      <div className="flex flex-col ml-2 items-center">
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 rounded text-xl"
            onMouseEnter={handleEmojiPickerOpen}
            onMouseLeave={handleEmojiPickerClose}
          >
            <BiSmile />
          </button>
          <button
            className="px-4 py-2 rounded text-xl"
            title={"Прикріпити файл"}
          >
            <AiOutlinePaperClip />
          </button>
        </div>
        <button
          className="px-4 py-2 rounded mt-2 border bg-white flex items-center"
          type="button"
          onClick={handleSendingMessage}
          title={"Надіслати повідомлення"}
        >
          <BsSend className="text-xl" />
        </button>
      </div>
    </div>
  );
});

MessageInput.propTypes = {
  addNewMessage: PropTypes.func,
};
