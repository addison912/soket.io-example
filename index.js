const express = require("express"),
  path = require("path"),
  http = require("http"),
  socketio = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  let i = 0;
  let prices;
  socket.on("subscribe", ({ channel }) => {
    console.log(channel);

    prices = setInterval(() => {
      i++;
      console.log(`emitting: ${i}`);
      socket.emit("message", "Cow goes moo");
    }, 1000);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    clearInterval(prices);
  });
});

const port = process.env.PORT || 3000;
let build = process.env.NODE_ENV == "development" ? "dist" : "build";
console.log(
  `${process.env.NODE_ENV == "development" ? "Dev" : "Production"} build`
);

app.use("/", express.static(path.join(__dirname, build)));

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
