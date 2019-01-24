//
const io = require("socket.io-client");
//const url = "ajbrush.com";
const socket = io.connect(window.location.hostname, { path: "/node" });

function sendLogin(name) {
  socket.emit("login", name);
}
function receiveGameData(callback) {
  console.log("Listening for login from server");
  socket.on("login", res => {
    callback(res);
  });
}

export { sendLogin, receiveGameData };
