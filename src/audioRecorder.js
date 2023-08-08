import React, { useState, useRef } from "react";
import mic from "./mic.png";
import { toast } from "react-toastify";

const AudioRecorder = ({
  handleAudio,
  makeFile,
  paused,
  handlePause,
  isRecordingInProgress,
  handleRecordingInProgress,
  stopTimer,
}) => {
  const mimeType = "audio/wav";
  const [permissions, setPermissions] = useState(false);
  const [stream, setStream] = useState(null);
  const [recordingAudio, setRecordingAudio] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorder = useRef(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        setPermissions(true);
        setStream(streamData);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = () => {
    if (paused) {
      mediaRecorder.current.resume();
      handlePause(false);
      return;
    }
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
      const audioBlob = new Blob(localAudioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordingAudio(audioUrl);
    };
    setAudioChunks(localAudioChunks);
    handleRecordingInProgress(true);
  };

  const stopRecording = () => {
    handleRecordingInProgress(false);
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      handleAudio(audioUrl);
      var d = new Date();
      var file = new File([new Blob(audioChunks)], d.valueOf(), {
        type: "audio/wav",
      });
      makeFile(file);
      setAudioChunks([]);
      handleRecordingInProgress(false);
      stopTimer();
      handlePause(false);
    };
  };

  const pauseRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.pause();
      handlePause(true);
    }
  };

  return (
    <div>
      <div className="" style={{ cursor: "pointer" }}>
        {!permissions && (
          <img src={mic} alt="Mic" onClick={getMicrophonePermission} />
        )}
        {permissions && !isRecordingInProgress && (
          <button onClick={startRecording}>Record</button>
        )}
        {permissions && (
          <>
            {isRecordingInProgress && (
              <>
                {paused ? (
                  <button onClick={startRecording}>Resume</button>
                ) : (
                  <button onClick={pauseRecording}>Pause</button>
                )}
                <button onClick={stopRecording}>Stop</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
