import { user1, user2, user3, user4 } from "./users"

export const activeRooms = [
    {
        id: '64a99b9d5dca528b9636b96b',
        name: 'General',
        activeUsers: [
            user1,
            user2,
            'me'
        ],
        type: 'group',
        colors: {
            backgroud: '#ffffff',
            text: '#000000'
        },
        private: false,
        password: 'passwoord'
    },
    // {
    //     id: '111',
    //     name: 'погода',
    //     activeUsers: [
    //         user1,
    //         user3,
    //         user4,
    //         'me'
    //     ],
    //     type: 'group',
    //     colors: {
    //         backgroud: '#ffffff',
    //         text: '#000000'
    //     }
    // },
    // {
    //     id: '222',
    //     name: 'Павло',
    //     activeUsers: [
    //         user1,
    //         'me'
    //     ],
    //     type: '1x1',
    //     colors: {
    //         backgroud: '#ffffff',
    //         text: '#000000'
    //     }
    // }
];

export const generalRoom = {
    name: "general",
    _id: "64a99b9d5dca528b9636b96b",
    activeUsers: [],
    type: "group",
    colors: {
      backgroud: "#ffffff",
      text: "#000000",
    },
    private: false,
    password: "passwoord",
}