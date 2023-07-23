import PropTypes from "prop-types";
import { ImExit } from "react-icons/im";
import { useModal, useNotification, useUser } from "../../hooks/contextHooks";
import { lostDataNotificationSettings } from "../../utils/notificationSettings";

export const ExitButton = () => {
  const {showNotification, hideNotification} = useNotification();
  const {exitUser}=useUser();
  const { setOpenedModal } = useModal();
  const leaveChat = () => {
    exitUser();
    hideNotification();
    setOpenedModal("Auth")
  }

  return (
    <button type="button" title="покинути чат" onClick={()=>showNotification({...lostDataNotificationSettings, firstButtonFunction: leaveChat,
      secondButtonFunction:hideNotification})}>
      <ImExit />
    </button>
  );
};

ExitButton.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  colorValue: PropTypes.string,
  handleColorValue: PropTypes.func,
  inputStyles: PropTypes.string,
  labelStyles: PropTypes.string,
};
