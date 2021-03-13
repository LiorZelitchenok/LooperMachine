import React, { useState, useEffect } from "react";
import "./Pads.css";
import Pad from "../Pad/Pad";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import SilentStar from "../../assets/SilentStar.mp3";
import Stutter from "../../assets/Stutter.mp3";
import StompySlosh from "../../assets/StompySlosh.mp3";
import Maze from "../../assets/Maze.mp3";
import GrooveB from "../../assets/GrooveB.mp3";
import Groove from "../../assets/Groove.mp3";
import FutureFank from "../../assets/FutureFank.mp3";
import ElectricGuitar from "../../assets/ElectricGuitar.mp3";
import BassWarwick from "../../assets/BassWarwick.mp3";
const Pads = () => {
  const [isPlay, setIsplay] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [timeOutSound, setTimeOutSound] = useStateWithCallbackLazy(0);
  const [soundsArray, setSoundsArray] = useState([
    {
      name: "Silent Star",
      soundTrack: new Audio(SilentStar),
      isActive: false,
    },
    {
      name: "Stutter",
      soundTrack: new Audio(Stutter),
      isActive: false,
    },
    {
      name: "Stompy Slosh",
      soundTrack: new Audio(StompySlosh),
      isActive: false,
    },
    {
      name: "Maze",
      soundTrack: new Audio(Maze),
      isActive: false,
    },
    {
      name: "GrooveB",
      soundTrack: new Audio(GrooveB),
      isActive: false,
    },
    {
      name: "Groove",
      soundTrack: new Audio(Groove),
      isActive: false,
    },
    {
      name: "Future Fank",
      soundTrack: new Audio(FutureFank),
      isActive: false,
    },
    {
      name: "Electric Guitar",
      soundTrack: new Audio(ElectricGuitar),
      isActive: false,
    },
    {
      name: "Bass Warwick",
      soundTrack: new Audio(BassWarwick),
      isActive: false,
    },
  ]);

  //When the component is rendered we run the runWhile function that plays the sounds on loop.
  useEffect(() => {
    soundsArray.map((soundCheck, index) => {
      soundCheck.soundTrack.preload = "auto";
      soundCheck.soundTrack.controls = true;
      soundCheck.soundTrack.loop = true;
      soundCheck.soundTrack.load();
    });
    runWhile();
  }, []);

  //When square is cliced this function will check if the playORpause is true , if yes it will loop the sound until its clicked again and only when the loop is ended it will stop.
  const playCurrentSound = (sound, playORpause) => {
    let tmpArr = soundsArray;
    soundsArray.map((soundCheck, index) => {
      if (soundCheck.name === sound.name) {
        soundCheck.isActive = !soundCheck.isActive;
      }
    });
    setSoundsArray((soundsArray) => [...tmpArr]);
  };

  //Running in the backround
  const runWhile = (toPause) => {
    let maxDuration = soundsArray
      .map((s) => s.soundTrack.duration)
      .reduce((a, b) => (a > b ? a : b), 0);
    //Sum of the seconds of all current
    let seconds = soundsArray
      .filter((sound) => sound.isActive)
      .map((s) => s.soundTrack.duration)
      .reduce((a, b) => a + b, 0);

    soundsArray.map((soundCheck, index) => {
      if (soundCheck.isActive) {
        soundCheck.soundTrack.play();
      } else {
        soundCheck.soundTrack.pause();
      }
    });
    //This will play the sounds in order one by one.
    // const run = async () => {
    //   for (const sound of soundsArray) {
    //     await new Promise((resolve) => {
    //       if (sound.isActive) {
    //         sound.soundTrack.play();
    //       } else {
    //         sound.soundTrack.pause();
    //       }
    //       resolve();
    //     });
    //   }
    // };

    const myTimeOut = setTimeout(
      function () {
        runWhile();
      },
      seconds === 0 ? 500 : maxDuration * 1000
    );
  };

  const onPlay = () => {
    setIsplay(true)
  };

  const onPause = () => {
    setIsPause(true);
  };
  return (
    <div>
      <input type="button" value="Play" onClick={onPlay} className='playButton'/>
      <input type="button" value="Stop" onClick={onPause} className='pauseButton'/>
      <div className="wrapper">
        {soundsArray.length > 0
          ? soundsArray.map((sound, index) => {
              return (
                <Pad
                  key={index}
                  sound={sound}
                  sendSoundTrackToPads={playCurrentSound}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Pads;
