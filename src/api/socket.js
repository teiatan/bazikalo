import { io } from "socket.io-client";

export const socket = io.connect(/* "http://localhost:4000" */ /* "https://bazikalo-backend.vercel.app" */ "https://bazikalo.onrender.com/");