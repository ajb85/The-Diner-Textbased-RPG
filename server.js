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
      console.log(`${name} has connected`);
      broadCastMessage("activeUsers", Object.keys(activeUsers));
      cb(name);
    } else {
      cb(0);
    }
  });

  // User chats
  socket.on("chat", messageOBJ => {
    broadCastMessage("chat", messageOBJ);
  });

  // User disconnects
  socket.on("disconnect", name => {
    console.log(name);
    // Possible to feed a name?
    for (let user in activeUsers) {
      if (activeUsers[user] === socket) {
        delete activeUsers[user];
      }
      broadCastMessage("activeUsers", Object.keys(activeUsers));
    }
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
  // Public broadcasts

  // Broad cast to everyone in a room
  function broadCastMessage(room, message) {
    for (let user in activeUsers) {
      activeUsers[user].emit(room, message);
    }
  }
  // Private broadcasts

  // Send invites to each other
  socket.on("events", eventData => {
    socket.broadcast.to(activeUsers[eventData.toUser].id).emit("events", {
      fromUser: eventData.fromUser,
      type: eventData.type
    });
  });
  // Send combat data between users
  socket.on("combat", combatData => {
    //socket.emit("combat", combatData.message);
    socket.broadcast
      .to(activeUsers[combatData.toUser].id)
      .emit("combat", combatData.message);
  });
}); // io.on connection

const port = 28890;
server.listen(port);
server.on("listening", () => console.log("Listening on port", port));
