//
const io = require("socket.io-client");
//const url = "http://localhost";
//const url = "ajbrush.com";
const socket = io.connect(window.location.hostname, { path: "/node" });
//const socket = openSocket("http://localhost:8000");
function sendLogin(creds) {
  socket.emit("login", creds);
}
function receiveGameData(callback) {
  console.log("Listening for login from server");
  socket.on("login", res => {
    callback(res);
  });
}
function getServerScores(gameName, updateScoreCB) {
  console.log(`Listening for "${gameName}" updates`);
  socket.on(gameName, score => {
    console.log("New score received: ", score);
    updateScoreCB(score);
  });
}

function sendNewAcc(creds) {
  console.log("api Sending new account info");
  socket.emit("createAcc", creds);
}
function submitTurn(userTurn) {
  //userTurn.dice is unused currently
  console.log("Submitting score: ", userTurn);
  socket.emit(userTurn.gameName, userTurn.score);
}
function receiveData(callback) {
  socket.on("chat", message => {
    console.log("api Received", message);
    callback(message);
  });
}

export {
  sendLogin,
  receiveGameData,
  getServerScores,
  sendNewAcc,
  submitTurn,
  receiveData
};
