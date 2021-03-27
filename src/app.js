import { io } from "socket.io-client";

const socket = io();

console.log("hello world");

socket.emit("subscribe", { channel: "prices" });

socket.on("message", (message) => {
  console.log(message);
});
