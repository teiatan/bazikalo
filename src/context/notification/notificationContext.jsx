import { createContext, useState } from "react";

import PropTypes from "prop-types";
import { Notification } from "./Notification";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const defaultNotificationSettings = {
    titleText: "title",
    descriptionText:
      "description description description description description description",
    firstButtonText: "cancel",
    secondButtonText: "ok",
  };
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(defaultNotificationSettings);

  const NotificationMarkup = isNotificationShown && (
    <Notification notificationSettings={notificationSettings} />
  );

  const showNotification = (args) => {
    setIsNotificationShown(true);
    setNotificationSettings(args);
    if (args.timeToHide) {
      setTimeout(hideNotification, args.timeToHide);
    }
  };

  const hideNotification = () => {
    setIsNotificationShown(false);
    setNotificationSettings(defaultNotificationSettings)
  };

  return (
    <NotificationContext.Provider
      value={{ NotificationMarkup, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node,
};
