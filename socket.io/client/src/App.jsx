import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";

const App = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("message-received", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = (data) => {
    setMessage(data.message);
    socket.emit("message", data.message);
    // console.log("handler hit", data.message);
  };

  return (
    <div>
      <p>Scoet IO Chat app</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
           
          <input className="border shadow-sm" placeholder="Enter your message" {...register("message", { required: true })} />
          <input type="submit" />
        </div>

      </form>
    </div>
  );
};

export default App;
