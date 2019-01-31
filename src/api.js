//
const io = require("socket.io-client");
//const url = "ajbrush.com";
const socket = io.connect(window.location.hostname, { path: "/node" });
socket.on("error", function(err) {
  console.log("received socket error:");
  console.log(err);
});

// Functions that talk to the server
function sendLogin(name, cb) {
  socket.emit("login", name, cb);
}
function sendChat(message) {
  socket.emit("chat", message);
}
function getUserList(cb) {
  socket.emit("userList", cb);
}

// Functions that listen to the server
function receiveChat(updateChat) {
  console.log("Listening for chat");
  socket.on("chat", res => {
    updateChat(res);
  });
}
function receiveLogin(onLoginReceive) {
  socket.on("login", onLoginReceive);
}
function updateUserList(cb) {
  console.log("Listening for User List");
  socket.on("activeUsers", res => {
    cb(res);
  });
}

export default {
  sendLogin,
  sendChat,
  receiveLogin,
  getUserList,
  updateUserList,
  receiveChat
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
