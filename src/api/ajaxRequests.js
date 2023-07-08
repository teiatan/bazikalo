import axios from "axios";

axios.defaults.baseURL =
    /* "http://localhost:4000/" */ /* "https://bazikalo-backend.vercel.app/" */ "https://bazikalo.onrender.com";
axios.defaults.withCredentials = true;

export const authenticate = async (userName) => {
    const { data } = await axios.post("/auth", { userName });
    return data;
};

// export const refreshUser = async (id) => {
//     const { data } = await axios.get(`/user/${id}`);
//     return data;
// };

export const updateUserSetting = async (newUserData) => {
    const { data } = await axios.put(`/user/${newUserData._id}`, newUserData);
    return data;
};

export const createNewRoom = async (newRoom) => {
    const { data } = await axios.post("/rooms", { newRoom });
    return data;
};

export const leaveNewRoom = async (roomId, userId) => {
    const { data } = await axios.delete(`/rooms/${roomId}`, userId);
    return data;
};