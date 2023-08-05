import { user1, user2, user3, user4 } from "./users"

export const activeRooms = [
    {
        id: '64ceb9912b7260dd6bcd5ae6',
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
    _id: "64ceb9912b7260dd6bcd5ae6",
    activeUsers: [],
    type: "group",
    colors: {
      backgroud: "#ffffff",
      text: "#000000",
    },
    private: false,
    password: "passwoord",
}