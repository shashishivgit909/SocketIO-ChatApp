import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  // console.log(messages, "messages");
  //since if page not randered then socket id not created , so uwe use state to store socketid 
  const [socketId, setSocketId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const roomForm = useState;
  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("user connected", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("message-received", (s) => {
      console.log(s);
      setMessages((messages) => [...messages, s]);
      // console.log(messages);
    });

    // socket.on("private-message", (message) => {
    //   console.log("private message", message)
    // })
    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (data) => {
    setMessage(data.message);
    socket.emit("message", { message: data.message, room: data.room });
    // console.log("handler hit", data.message);
  };

  const joinRoomhandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  }

  return (
    <div>

      {
        socketId
      }
      <p>Socket IO Chat app</p>

      <form onSubmit={joinRoomhandler}>
        <div>
          <label htmlFor="">Join room</label>
          <input type="text" onChange={(e) => { setRoomName(e.target.value) }} value={roomName} />
        </div>

        <button type="submit"> join</button>
      </form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div >
          <div >
            <h3>Room</h3>
            <input className="border shadow-sm" placeholder="Enter your room message" {...register("room")} />
            {/* <input type="submit" /> */}
          </div>

          <div>
            <h3>Message</h3>
            <input className="border shadow-sm" placeholder="Enter your message" {...register("message")} />

          </div>
          <input className="p-2 bg-green-300" type="submit" />
        </div>
      </form>
      <ul>
        {
          messages.map((m, index) => {
            return (
              <li key={index}>{m}</li>
            )
          })
        }
      </ul>

    </div>
  );
};

export default App;
