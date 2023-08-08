import React, { useState, useEffect, useRef } from "react";
import AudioRecorder from "./audioRecorder";
import "./App.css";

const App = () => {
  const [audio, setAudio] = useState(null);
  const [recordedAudioFile, setRecordingAudioFile] = useState(null);
  const [paused, setPaused] = useState(false);
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [counter, setCounter] = useState(0);
  const [isRecordingInProgress, setIsRecordingInProgress] = useState(false);

  const barsRef = useRef([]);

  useEffect(() => {
    let intervalId;

    if (isRecordingInProgress && !paused) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [counter, isRecordingInProgress, paused]);

  useEffect(() => {
    if (isRecordingInProgress && paused) {
      pauseTimer();
      stopBarsAnimation();
    } else if (isRecordingInProgress && !paused) {
      startBarsAnimation();
    } else {
      // stopBarsAnimation();
    }
  }, [paused, isRecordingInProgress]);

  function stopTimer() {
    // setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  function pauseTimer() {
    setCounter(counter);
    setSecond(second);
    setMinute(minute);
  }

  const handleAudio = (url) => {
    setAudio(url);
  };

  const makeFile = (file) => {
    console.log(file);
    setRecordingAudioFile(file);
  };

  const handlePause = (val) => {
    setPaused(val);
  };

  const handleRecordingInProgress = (val) => {
    setIsRecordingInProgress(val);
  };

  const startBarsAnimation = () => {
    barsRef.current.forEach((item) => {
      // Random move
      item.style.animationDuration = `${Math.random() * (2.5 - 0.2) + 0.2}s`;
      item.style.animationPlayState = "running";
    });
  };

  const stopBarsAnimation = () => {
    barsRef.current.forEach((item) => {
      // Reset animation properties
      item.style.animationPlayState = "paused";
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <p> Audio Recorder</p>
      <div className="d-flex flex-row">
        {isRecordingInProgress && (
          <>
            <div>{minute + ":" + second}</div>
            <div className="audio-recorder p-2">
              <div className="sound-wave">
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[0] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[1] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[2] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[3] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[4] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[5] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[6] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[7] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[8] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[9] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[10] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[11] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[12] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[13] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[14] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[15] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[16] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[17] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[18] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[19] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[20] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[21] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[22] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[23] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[24] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[25] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[26] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[27] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[28] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[29] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[30] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[31] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[32] = el)}
                ></div>
                <div
                  className="bar"
                  ref={(el) => (barsRef.current[33] = el)}
                ></div>
              </div>
            </div>
          </>
        )}
        <div>
          <AudioRecorder
            handleAudio={handleAudio}
            makeFile={makeFile}
            paused={paused}
            handlePause={handlePause}
            isRecordingInProgress={isRecordingInProgress}
            handleRecordingInProgress={handleRecordingInProgress}
            stopTimer={stopTimer}
          />
        </div>
      </div>
      {audio !== null && <audio src={audio} controls></audio>}
    </div>
  );
};

export default App;
