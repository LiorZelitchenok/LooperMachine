import React, { useState } from "react";
import  {useStateWithCallbackLazy}  from 'use-state-with-callback';
import "./Pad.css";
const Pad = ({ sound,sendSoundTrackToPads }) => {
  const [loop, setLoop] = useStateWithCallbackLazy(false);
  const startLoop = (sound) => {
   setLoop(!loop, (loop) => {
       if(loop){
           sendSoundTrackToPads(sound,true)
       }else{
        sendSoundTrackToPads(sound,false)
       }
   })
  };

  return (
    <div className="box" onClick={() => startLoop(sound)}>
      <span>{sound.name}</span>
    </div>
  );
};

export default Pad;
