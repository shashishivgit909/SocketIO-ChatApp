import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const secretKeyJWT = "asdasdsadasdasdasdsa";
const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


//default event , client connected then this event hitted.
io.on("connection", (socket) => {
  console.log("User Connected in server", socket.id);

  socket.broadcast.emit("welcome",`welcome to the server: ${socket.id}`)

  socket.on("message",(message)=>{
    console.log(message);
     socket.broadcast.emit("message-received",message);

     //with to socket.to.emit() and   io.to.emit() , is same thing;
     socket.to(message.room).emit("private-message",message.message)
  })
  
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
