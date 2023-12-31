import PropTypes from "prop-types";
import { MessagesContextProvider } from "./messages/messagesContext";
import { ActiveRoomsContextProvider } from "./rooms/activeRoomsContext";
import { AllRoomsContextProvider } from "./rooms/allRoomsContext";
import { CurrentRoomContextProvider } from "./rooms/currentRoomContext";
import { BlackListUsersContextProvider } from "./users/blacklistUsersContext";
import { OnlineUsersContextProvider } from "./users/onlineUsersContext";
import { TypingUsersContextProvider } from "./users/typingUsersContext";
import { UserContextProvider } from "./users/userContext";
import { NotificationContextProvider } from "./notification/notificationContext";
import { ThemeContextProvider } from "./theme/themeContext";
import { ModalContextProvider } from "./modal/modalContext";


export function ContextProvider({ children }) {
  return (
    <ThemeContextProvider>
    <UserContextProvider>
      <OnlineUsersContextProvider>
        <BlackListUsersContextProvider>
          <TypingUsersContextProvider>
            <AllRoomsContextProvider>
              <ActiveRoomsContextProvider>
                <CurrentRoomContextProvider>
                  <MessagesContextProvider>
                    <NotificationContextProvider>
                      <ModalContextProvider>
                        {children}
                      </ModalContextProvider>
                    </NotificationContextProvider>
                  </MessagesContextProvider>
                </CurrentRoomContextProvider>
              </ActiveRoomsContextProvider>
            </AllRoomsContextProvider>
          </TypingUsersContextProvider>
        </BlackListUsersContextProvider>
      </OnlineUsersContextProvider>
      </UserContextProvider>
      </ThemeContextProvider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
};
