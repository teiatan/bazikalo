import { user1, user2, user3, user4 } from "./users"

export const activeRooms = [
    {
        id: '1408',
        name: 'головна',
        activeUsers: [
            user1,
            user2,
            'me'
        ],
        type: 'group'
    },
    {
        id: '111',
        name: 'погода',
        activeUsers: [
            user1,
            user3,
            user4,
            'me'
        ],
        type: 'group'
    },
    {
        id: '222',
        name: 'Павло',
        activeUsers: [
            user1,
            'me'
        ],
        type: '1x1'
    }
];