import { socket } from "./socket";


// отримання даних юзера від беку після авторизації
export const getAuthData = () => {
    socket.on("connection", message => {
        // очікуваний формат відповіді
        // message = {
        //     id: 'qqqqwww13',
        //     userName: 'Павло'
        // }
        return message;
    });
};

//отримання повідомлень
export const getMessages = () => {
    socket.on("message", message => {
        // очікуваний формат відповіді
        // message = {
        //     id: 'fvf234dr4',
        //     owner: 'userId',
        //     roomId: 'roomId',
        //     content: 'Message',
        //     tag: 'taggedUserId',
        //     createdAt: '2023-06-16T20:46:40.382Z'
        // }
        return message;
    });
};

// отримання юзерів, які друкують в даний момент
export const getWhoIsTyping = () => {
    socket.on("typing", message => {
        // очікуваний формат відповіді
        // message = {
        //     roomId: 'roomId',
        //     typingMembers: ['Павло', 'Олена']
        // }
        return message;
    });
};

// список всіх юзерів
export const getAllOnlineMembers = () => {

};

// список всіх кімнат
export const getAllChatRooms = () => {

};