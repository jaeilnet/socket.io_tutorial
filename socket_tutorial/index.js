const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  // __filename 은 현재 실행 중인 파일 경로

  // __dirname 은 현재 실행 중인 폴더 경로

  res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });

io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("성공?");
});
