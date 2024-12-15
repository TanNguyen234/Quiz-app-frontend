import { io } from "socket.io-client";

const path = process.env.REACT_APP_PATH_BACKEND; //Chỉ cần đường dẫn gốc (orginal path)
let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(path, {
      transports: ["websocket", "polling"],
    });
  }
  return socket;
};

//Chức năng kết bạn
export const sendRequest = (userId) => {
  const socket = getSocket();
  socket.emit("CLIENT_ADD_FRIEND", userId);
};

export const cancelRequest = (userId) => {
  const socket = getSocket();
  socket.emit("CLIENT_CANCEL_FRIEND", userId);
};

export const denyRequest = (userId) => {
  const socket = getSocket();
  socket.emit("CLIENT_DENY_FRIEND", userId);
};

export const acceptRequest = (userId) => {
  const socket = getSocket();
  socket.emit("CLIENT_ACCEPT_FRIEND", userId);
};

export const deleteFriend = (userId) => {
  const socket = getSocket();
  socket.emit("CLIENT_DELETE_FRIEND", userId);
};
//End Chức năng kết bạn

//Chức năng chatting
export const sendMessage = (message) => {
  const socket = getSocket();
  socket.emit("CLIENT_SEND_MESSAGE", message);
  socket.emit("CLIENT_SEND_TYPING", "hide");

  if(!socket.hasListeners('SERVER_RETURN_MESSAGE')) {
    socket.on("SERVER_RETURN_MESSAGE", (data) => {
      const idUser = document.querySelector("[my-id]").getAttribute("my-id");
      const body = document.querySelector(".chat__body");
      const div = document.createElement("div");

      let htmlMessage = ``
      let htmlImages = ``;
  
      if (idUser === data.user_id) {
        div.classList.add("inner-outgoing");
      } else {
        div.classList.add("inner-incoming");
        htmlMessage += `
          <div class="inner-name">${data.fullName}</div>
        `;
      }

      if(data.content) htmlMessage += `<div class="inner-content">${data.content}</div>`

      if(data.images) {
        htmlImages += `<div class='inner-images'>`;
        for (const image of data.images) {
          htmlImages += `
            <img src=${image} alt='image'/>
          `;
        }
        htmlImages += `</div>`
      }

      div.innerHTML = htmlMessage + htmlImages;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    });
  }
};

let timeout;
function showTyping(socket) {
  socket.emit("CLIENT_SEND_TYPING", "show");

  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hide");
  }, 3000);
}

export const sendTyping = () => {
  const socket = getSocket();
  showTyping(socket);

  if(!socket.hasListeners('SERVER_RETURN_TYPING')) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
      const elementListTyping = document.querySelector(".chat__typing");
      const typingElement = document.querySelector(`[id="${data.id}"]`);
      const body = document.querySelector(".chat__body");
      if (data.type === "show") {
        if (!typingElement) {
          const boxTyping = document.createElement("div");
          boxTyping.classList.add("chat__typing--box");
          boxTyping.setAttribute("id", data.id);
  
          boxTyping.innerHTML = `
            <div class="chat__typing--box">
              <div class="inner-name">${data.fullName}</div>
              <div class="inner-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          `;
          elementListTyping.appendChild(boxTyping);
          body.scrollTop = body.scrollHeight;
        }
      } else if (data.type === "hide") {
        if (typingElement) {
          typingElement.remove();
        }
      }
    });
  }
};
//End chức năng chattting
// SERVER_RETURN_USER_STATUS_ONLINE
export const statusUser = () => {
  const socket = getSocket();
  socket.on("SERVER_RETURN_USER_STATUS_ONLINE", (data) => {
    console.log("SERVER_RETURN_USER_STATUS_ONLINE", data)
    const boxUser = document.querySelector(`[user-id='${data.userId}']`);
      if (boxUser) {
        const status = boxUser.querySelector("[status]");
        status.setAttribute("status", data.status);
      }
  });
}
// SERVER_RETURN_USER_STATUS_ONLINE