
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  const socket = io("http://localhost:3000");  // i.e backend server url 

  //event hanlding
  useEffect(() => {

    //this is inbuilt event which is triggered when  a client conncted.
    socket.on("connect", () => {
      console.log("user connected", socket.id);
    });

    //manaul event: 
    socket.on("welcome",(s)=>{
      console.log(s)
    })
  }, [])

  return (
    <div>
      app
    </div>
  )
}

export default App

