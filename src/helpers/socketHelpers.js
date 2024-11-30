import { io } from "socket.io-client";

const path = "http://localhost:3002"; //Chỉ cần đường dẫn gốc
const socket = io(path);

export const sendRequest = async (userId) => {

  socket.emit("CLIENT_ADD_FRIEND", userId);
   console.log(userId)

};
