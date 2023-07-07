import { socket } from "./socket";


// авторизація - передача імені на бек після сабміту форми авторизації
export const authOnBackend = (userName) => {
    socket.emit("connection", userName);
}

// відправлення повідомлення
export const sendMessage = ({ownerId, roomId, messageContent, taggedUserId=null}) => {
    socket.emit("messages", {
        owner: ownerId,
        roomId: roomId,
        content: messageContent,
        tag: taggedUserId
    });
};

//вхід в кімнату по кліку на кімнату в списку всіх кімнат або при створенні кімнати 1х1
//після цього бек повинен відправити порцію останніх повідомлень в цій кімнаті, якщо є
export const joinRoomRequest = ({userId, roomId, roomType}) => {
    socket.emit("joinRoom", {
        userId: userId,
        roomId: roomId,
        type: roomType, // '1x1' 'group'
    });
};

//вихід з кімнати/закриття в панелі активних кімнат
export const leaveRoomRequest = (userId, roomId) => {
    socket.emit("leaveRoom", {
        userId: userId,
        roomId: roomId
    });
};

//друк повідомлення
export const startTypingRequest = (userId, roomId) => {
    socket.emit("startTyping", {
        userId,
        roomId
    });
};

export const stopTypingRequest = (userId, roomId) => {
    socket.emit("stopTyping", {
        userId,
        roomId
    });
}
