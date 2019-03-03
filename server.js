const server = require("http").createServer();
const io = require("socket.io")(server, { path: "/" });

const activeUsers = {};

io.on("connection", socket => {
  socket.on("login", (name, cb) => {
    console.log(`${name} gave their name`);
    // Receive a name from the user.  If it's unique, add them to the activeUsers
    // object and broadcast the current list of users out to all connected
    // clients

    // If the name is taken, return false to the callback

    // Note: the user still has to select their character bofore they can
    // see chat.  They are set to active so users know they haven't joined yet
    if (!activeUsers.hasOwnProperty(name)) {
      activeUsers[name] = { socket, active: false };
      console.log(`${name} has connected`);
      broadCastMessage("activeUsers", getUserlistArr());
      cb(name);
    } else {
      cb(false);
    }
  });

  socket.on("chat", messageOBJ => {
    // User sends a message, send message to all clients
    broadCastMessage("chat", messageOBJ);
  });

  socket.on("disconnect", name => {
    // User disconnects, currently not working
    console.log("User left: ", name);
    // Possible to feed a name?
    for (let user in activeUsers) {
      if (activeUsers[user].socket === socket) {
        delete activeUsers[user];
      }
      broadCastMessage("activeUsers", Object.keys(activeUsers));
    }
  });

  socket.on("userlist", cb => {
    // Update list of current users
    cb(getUserlistArr());
  });

  socket.on("activeUsers", cb => {
    // Send a list of active users to the client
    socket.emit(cb(getUserlistArr()));
  });

  socket.on("status", (name, status) => {
    // Toggle the status of a user between active,inactive
    activeUsers[name].active = !activeUsers[name].active;
    broadCastMessage("activeUsers", getUserlistArr());
  });

  socket.on("events", eventData => {
    // Users send an invite/event to each other
    socket.broadcast
      .to(activeUsers[eventData.toUser].socket.id)
      .emit("events", {
        fromUser: eventData.fromUser,
        type: eventData.type
      });
  });

  socket.on("combat", combatData => {
    // Send combat data between users
    socket.broadcast
      .to(activeUsers[combatData.toUser].socket.id)
      .emit("combat", combatData);

    socket.emit("combat", combatData);
  });
  // This is a shortcut, there is a command to send back to socket

  socket.on("error", err => {
    // Console log errors
    console.log("received error from client:", client.id);
    console.log(err);
  });

  const broadCastMessage = (room, message) => {
    // Public broadcast
    // Broad cast to everyone in a room
    for (let user in activeUsers) {
      activeUsers[user].socket.emit(room, message);
    }
  };
}); // io.on connection

function getUserlistArr() {
  let userAndStatus = [];
  for (let user in activeUsers) {
    userAndStatus.push({
      name: user,
      active: activeUsers[user].active
    });
  }

  return userAndStatus;
}

const port = 28890;
server.listen(port);
server.on("listening", () => console.log("Listening on port", port));
