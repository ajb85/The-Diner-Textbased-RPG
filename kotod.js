//
const server = require("http").createServer();
const io = require("socket.io")(server, { path: "/" });

let activeUsers = {};

io.on("connection", socket => {
  // User logins
  socket.on("login", (name, cb) => {
    //Trying id:name.  I realize the lookup would be easier with name:id
    // ISSUE: users log in and can sit at character select.  They'll appear
    // on the user list but be unreachable
    if (!activeUsers[name]) {
      activeUsers[name] = socket;
      broadCastMessage("activeUsers", Object.keys(activeUsers));
      cb(name);
    } else {
      cb(0);
    }
  });

  // Send invites to each other
  socket.on("events", eventData => {
    console.log("Sending event to: ", eventData.toUser);
    socket.broadcast.to(activeUsers[eventData.toUser].id).emit("events", {
      fromUser: eventData.fromUser,
      type: eventData.type
    });
  });
  // User chats
  socket.on("chat", (message, updateLocalChat) => {
    broadCastMessage("chat", message);
  });

  // User disconnects
  //socket.on("disconnect", handleDisconnect.bind(socket.id));

  // Update list of current users
  socket.on("userList", cb => {
    cb(Object.keys(activeUsers));
  });
  socket.on("activeUsers", cb => {
    socket.emit(cb(Object.keys(activeUsers)));
  });

  // Console log errors
  socket.on("error", function(err) {
    console.log("received error from client:", client.id);
    console.log(err);
  });

  function broadCastMessage(room, message) {
    for (let user in activeUsers) {
      activeUsers[user].emit(room, message);
    }
  }
}); // io.on connection

// Garbage below...but you know, what man's garbage...
//
// function updateUserList() {
//   console.log("userList function");
// }
// function handleLogin(name, cb, socket) {
//   if (!activeUsers[name]) return cb(0);
//   activeUsers[name] = id;
//   console.log(activeUsers);
//   //broadCastMessage("userList", userList);
//
//   return cb(null, name);
// }
// function handleDisconnect(id) {
//   removeUser(id);
// }
//
// function addUser(id, name) {
//   activeUsers[id] = name;
// }
// function removeUser(id) {
//   delete activeUsers[id];
// }

const port = 28890;
server.listen(port);
server.on("listening", () => console.log("Listening on port", port));

// socket.on("login", username => {
//   console.log(socket.id, " logged in");
//   if (activeUsers[username]) {
//     // 0 = bad login
//     socket.emit("login", 0);
//   } else {
//     activeUsers[username] = socket.id;
//     socket.broadcast.emit("changeInUsers", activeUsers);
//     socket.join("changeInUsers");
//     // 1 = good login
//     socket.emit("login", 1);
//   }
// }); //login socket
//
// // Sending chat messages
// socket.on("chat", message => {
//   socket.emit("chat", message);
//   socket.broadcast.emit("chat", message);
// }); // Chat socket
//
// // User disconnects
// client.on("disconnect", () => {
//   disconnectUser();
// });
//
// // Console log errors
// client.on("error", function(err) {
//   console.log("received error from client:", client.id);
//   console.log(err);
// });
