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

export function ContextProvider({ children }) {
  return (
    <UserContextProvider>
      <OnlineUsersContextProvider>
        <BlackListUsersContextProvider>
          <TypingUsersContextProvider>
            <AllRoomsContextProvider>
              <ActiveRoomsContextProvider>
                <CurrentRoomContextProvider>
                  <MessagesContextProvider>
                    <NotificationContextProvider>
                      {children}
                    </NotificationContextProvider>
                  </MessagesContextProvider>
                </CurrentRoomContextProvider>
              </ActiveRoomsContextProvider>
            </AllRoomsContextProvider>
          </TypingUsersContextProvider>
        </BlackListUsersContextProvider>
      </OnlineUsersContextProvider>
    </UserContextProvider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node,
};
