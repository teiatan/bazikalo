import { useContext } from "react";
import { MessagesContext } from "../context/messages/messagesContext";
import { AllRoomsContext } from "../context/rooms/allRoomsContext";
import { ActiveRoomsContext } from "../context/rooms/activeRoomsContext";
import { CurrentRoomContext } from "../context/rooms/currentRoomContext";
import { UserContext } from "../context/users/userContext";
import { OnlineUsersContext } from "../context/users/onlineUsersContext";
import { BlackListUsersContext } from "../context/users/blacklistUsersContext";
import { TypingUsersContext } from "../context/users/typingUsersContext";
import { NotificationContext } from "../context/notification/notificationContext";


export const useMessages = () => useContext(MessagesContext);

export const useAllRooms = () => useContext(AllRoomsContext);

export const useActiveRooms = () => useContext(ActiveRoomsContext);

export const useCurrentRoom = () => useContext(CurrentRoomContext);

export const useUser = () => useContext(UserContext);

export const useOnlineUsers = () => useContext(OnlineUsersContext);

export const useBlackListUsers = () => useContext(BlackListUsersContext);

export const useTypingUsers = () => useContext(TypingUsersContext);

export const useNotification = () => useContext(NotificationContext);


