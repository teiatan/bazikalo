import PropTypes from "prop-types";
import { ModalCover } from "../../components/Modals/ModalCover";

export const Notification = ({ notificationSettings }) => {
  const {
    titleText,
    descriptionText,
    firstButtonText,
    secondButtonText,

    closeButtonFunction,
    firstButtonFunction,
    secondButtonFunction,

    wrapperStyles,
    containerStyles,
    titleStyles,
    descriptionStyles,
    closeButtonStyles,
    firstButtonStyles,
    secondButtonStyles,
  } = notificationSettings;
  return (
    <ModalCover
      wrapperStyles={`${wrapperStyles}`}
      containerStyles={`w-[500px] h-[175px] flex flex-col justify-center items-center border p-4 ${containerStyles}`}
      buttonStyles={closeButtonStyles ?? "hidden"}
      onClose={closeButtonFunction}
    >
      {titleText && <h2 className={`text-3xl ${titleStyles}`}>{titleText}</h2>}
      {descriptionText && (
        <p className={`${descriptionStyles}`}>{descriptionText}</p>
      )}
      <div className={`w-full flex justify-between ${secondButtonStyles}`}>
        {firstButtonText && (
          <button
            onClick={firstButtonFunction}
            className={`min-w-[200px] min-h-[40px] rounded-3xl bg-slate-600 text-white ${firstButtonStyles}`}
          >
            {firstButtonText}
          </button>
        )}
        {secondButtonText && (
          <button
            onClick={secondButtonFunction}
            className={`min-w-[200px] min-h-[40px] rounded-3xl bg-slate-600 text-white ${secondButtonStyles}`}
          >
            {secondButtonText}
          </button>
        )}
      </div>
    </ModalCover>
  );
};

Notification.propTypes = {
  notificationSettings: PropTypes.shape({
    titleText: PropTypes.string,
    descriptionText: PropTypes.string,
    firstButtonText: PropTypes.string,
    secondButtonText: PropTypes.string,

    closeButtonFunction: PropTypes.func,
    firstButtonFunction: PropTypes.func,
    secondButtonFunction: PropTypes.func,

    wrapperStyles: PropTypes.string,
    containerStyles: PropTypes.string,
    titleStyles: PropTypes.string,
    descriptionStyles: PropTypes.string,
    closeButtonStyles: PropTypes.string,
    firstButtonStyles: PropTypes.string,
    secondButtonStyles: PropTypes.string,
  }),
};
