import { io } from "socket.io-client";

const path = "http://localhost:3002"; //Chỉ cần đường dẫn gốc (orginal path)
let socket = null

export const getSocket = () => {
    if (!socket) {
        socket = io(path, {
          transports: ["websocket", "polling"],
        });
    }
    return socket;
}

//Chức năng kết bạn
export const sendRequest = (userId) => {
  const socket = getSocket()
  console.log("CLIENT_ADD_FRIEND", socket)
  socket.emit("CLIENT_ADD_FRIEND", userId);
};

export const cancelRequest = (userId) => {
  const socket = getSocket()
  console.log("CLIENT_CANCEL_FRIEND", socket)
  socket.emit("CLIENT_CANCEL_FRIEND", userId);
};

export const denyRequest = (userId) => {
  const socket = getSocket()
  console.log("CLIENT_DENY_FRIEND", socket)
  socket.emit("CLIENT_DENY_FRIEND", userId);
};

export const acceptRequest = (userId) => {
  const socket = getSocket()
  console.log("CLIENT_ACCEPT_FRIEND", socket)
  socket.emit("CLIENT_ACCEPT_FRIEND", userId);
};

export const deleteFriend = (userId) => {
  const socket = getSocket()
  console.log("CLIENT_DELETE_FRIEND", socket)
  socket.emit("CLIENT_DELETE_FRIEND", userId);
};
//End Chức năng kết bạn