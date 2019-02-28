//
const io = require("socket.io-client");
const socket = io.connect(window.location.hostname, { path: "/node" });
socket.on("error", function(err) {
  console.log("received socket error:");
  console.log(err);
});

// Functions that talk to the server
function sendLogin(name, cb) {
  socket.emit("login", name, cb);
}
function toggleStatus(name) {
  socket.emit("status", name);
}
function sendChat(messageOBJ) {
  socket.emit("chat", messageOBJ);
}
function sendCombat(toUser, message) {
  socket.emit("combat", { toUser, message });
}
function getUserlist(cb) {
  socket.emit("userlist", cb);
}
function sendEventToUser(toUser, fromUser, type) {
  socket.emit("events", { toUser, fromUser, type });
}

// Functions that listen to the server
function chatListener(updateChat) {
  console.log("Listening for chat");
  socket.on("chat", res => {
    updateChat(res);
  });
}
function combatListener(updateCombat) {
  console.log("Listening for combat");
  socket.on("combat", res => {
    updateCombat(res);
  });
}
// function receiveLogin(onLoginReceive) {
//   socket.on("login", onLoginReceive);
// }
function userlistListener(cb) {
  console.log("Listening for User List");
  socket.on("activeUsers", res => {
    cb(res);
  });
}
function eventListener(cb) {
  console.log("Listening for Events");
  socket.on("events", res => {
    cb(res);
  });
}

export default {
  sendLogin,
  sendChat,
  sendCombat,
  sendEventToUser,
  getUserlist,
  userlistListener,
  chatListener,
  eventListener,
  combatListener,
  toggleStatus
};

// function sendLogin(name) {
//   socket.emit("login", name);
// }
// function sendChat(message) {
//   socket.emit("chat", message);
// }
//
// function receiveLogin(callback) {
//   console.log("Listening for login response");
//   socket.on("login", res => {
//     callback(res);
//   });
// }
// function joinChat(callback) {
//   console.log("Listening for chat");
//   socket.on("chat", res => {
//     callback(res);
//   });
// }
