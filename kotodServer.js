//
const server = require("http").createServer();
const io = require("socket.io")(server, { path: "/" });

io.on("connection", socket => {
  socket.on("login", creds => {});
});

const port = 28890;
server.listen(port);

server.on("listening", () => console.log("Listening on port", port));
