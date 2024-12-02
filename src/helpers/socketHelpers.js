import { io } from "socket.io-client";

const path = "http://localhost:3002"; //Chỉ cần đường dẫn gốc (orginal path)
const socket = io(path, {
  transports: ["websocket", "polling"],
});

//Chức năng kết bạn
export const sendRequest = async (userId) => {
  console.log("CLIENT_ADD_FRIEND", socket)
  socket.emit("CLIENT_ADD_FRIEND", userId);
};

export const cancelRequest = async (userId) => {
  console.log("CLIENT_CANCEL_FRIEND", socket)
  socket.emit("CLIENT_CANCEL_FRIEND", userId);
};

export const denyRequest = async (userId) => {
  console.log("CLIENT_DENY_FRIEND", socket)
  socket.emit("CLIENT_DENY_FRIEND", userId);
};

export const acceptRequest = async (userId) => {
  console.log("CLIENT_ACCEPT_FRIEND", socket)
  socket.emit("CLIENT_ACCEPT_FRIEND", userId);
};
//End Chức năng kết bạn