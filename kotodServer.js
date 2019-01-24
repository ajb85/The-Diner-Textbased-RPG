//
const server = require("http").createServer();
const io = require("socket.io")(server, { path: "/" });
let games = {
  "Test Game": {
    Shamshire: {
      ones: "",
      twos: "",
      threes: 9,
      fours: 12,
      fives: "",
      sixes: "",
      fullHouse: "",
      smStraight: "",
      lgStraight: "",
      triple: "",
      quad: "",
      roll: "",
      freebie: ""
    },
    Jenterro: {
      ones: 3,
      twos: "",
      threes: "",
      fours: "",
      fives: "",
      sixes: "",
      fullHouse: 25,
      smStraight: "",
      lgStraight: "",
      triple: "",
      quad: "",
      roll: "",
      freebie: ""
    }
  },
  "Second Game": {
    Shamshire: {
      ones: "",
      twos: "",
      threes: "",
      fours: "",
      fives: "",
      sixes: 24,
      fullHouse: "",
      smStraight: "",
      lgStraight: 40,
      triple: "",
      quad: "",
      roll: "",
      freebie: ""
    },
    Jenterro: {
      ones: "",
      twos: "",
      threes: "",
      fours: "",
      fives: 15,
      sixes: "",
      fullHouse: "",
      smStraight: 30,
      lgStraight: "",
      triple: "",
      quad: 26,
      roll: "",
      freebie: ""
    }
  },
  Third: {
    Shamshire: {
      ones: 5,
      twos: "",
      threes: "",
      fours: "",
      fives: "",
      sixes: "",
      fullHouse: "",
      smStraight: "",
      lgStraight: "",
      triple: "",
      quad: "",
      roll: "",
      freebie: ""
    },
    Jenterro: {}
  }
};
let accounts = {
  Shamshire: {
    id: "",
    password: "sham",
    games: ["Test Game", "Second Game", "Third"]
  },
  Jenterro: {
    id: "",
    password: "interro",
    games: ["Test Game", "Second Game"]
  }
};
io.on("connection", socket => {
  socket.on("login", creds => {
    const account = accounts[creds.accountName];
    if (
      //If the account exists and the passwords match
      account &&
      account.password === creds.password
    ) {
      accounts[creds.accountName].id = socket.id;
      console.log(
        "New ID found: ",
        creds.accountName,
        " ID: ",
        accounts[creds.accountName].id
      );
      let userGames = {};
      accounts[creds.accountName].games.forEach(
        name => (userGames[name] = games[name])
      );
      socket.emit("login", {
        games: userGames
      });
    } else {
      console.log("server: bad login");
    }
  });

  for (let gameName in games) {
    console.log("Game on for ", gameName);
    socket.on(gameName, turnData => {
      console.log(`Received score for ${gameName}`);

      for (let user in accounts) {
        if (accounts[user].id === socket.id) {
          games[gameName][user] = turnData;
        }
      }

      //broadcast scores to people in the game
      console.log(gameName, " being sent: ", games[gameName]);
      socket.broadcast.emit(gameName, games[gameName]);
    });
  }

  socket.on("createAcc", creds => {
    if (!accounts[creds.accountName]) {
      accounts[creds.accountName] = {
        id: socket.id,
        password: creds.password,
        displayName: creds.displayName
      };
      socket.broadcast
        .to(socket.id)
        .emit("createAcc", `Successfully created account ${creds.accountName}`);
    } else {
      socket.broadcast
        .to(socket.id)
        .emit("createAcc", `Account name already exists.`);
    }
  });
});

const port = 28890;
server.listen(port);

server.on("listening", () => console.log("Listening on port", port));
