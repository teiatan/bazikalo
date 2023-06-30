import { io } from "socket.io-client";

export const socket = io.connect('https://bazikalo.fly.dev');