import PropTypes from "prop-types";
import { useEffect } from "react";

export const ModalCover = ({
  children,
  onClose = () => {},
  wrapperStyles,
  containerStyles,
  buttonStyles,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === `Escape`) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleWrapperClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onMouseDown={handleWrapperClick}
      className={`fixed w-screen h-screen flex justify-center items-center ${wrapperStyles}`}
    >
      <div
        className={`w-[700px] h-[500px] relative flex justify-center items-center ${containerStyles}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-0 right-0 p-4 ${buttonStyles}`}
        >
          x
        </button>

        {children}
      </div>
    </div>
  );
};

ModalCover.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  wrapperStyles: PropTypes.string,
  containerStyles: PropTypes.string,
  buttonStyles: PropTypes.string,
};
