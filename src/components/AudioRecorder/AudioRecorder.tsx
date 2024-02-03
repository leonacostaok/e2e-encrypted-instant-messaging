import React, {useRef, useState} from 'react';
import {mimeType, StatusRecordingEnum} from "../../constants/chat";
import {useCounterRecorder} from "../../hooks/useCounterRecorder";
import styled from "styled-components";
import IconPortal from "../IconPortal";
import IconVoice from "../../assets/icons/icon-voice.svg";
import IconDelete from '../../assets/icons/icon-exit.svg';
import IconPause from '../../assets/icons/icon-pause.svg';

const AudioRecorder = () => {
  const mediaRecorder = useRef<any>(null);
  const [recordingStatus, setRecordingStatus] = useState(StatusRecordingEnum.INACTIVE);
  const [audioChunks, setAudioChunks] = useState<any[]>([]);
  const [audio, setAudio] = useState<any>(null);
  const {minute,second,resetCounter} = useCounterRecorder(recordingStatus)
  const startRecording = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setRecordingStatus(StatusRecordingEnum.RECORDING);
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(streamData, { type: mimeType } as MediaRecorderOptions);
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks:any[] = [];
        mediaRecorder.current.ondataavailable = (event:any) => {
          if (typeof event.data === "undefined") return;
          if (event.data.size === 0) return;
          localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      } catch (err) {
        alert('The MediaRecorder Disable');
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };
  const stopRecording = () => {
    if(!mediaRecorder || !mediaRecorder.current){
      return
    }
    setRecordingStatus(StatusRecordingEnum.INACTIVE);
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audio chunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
      resetCounter();
    };
  };
  const onRemoveRecording = () =>{
    resetCounter()
    setRecordingStatus(StatusRecordingEnum.INACTIVE)
    setAudio(null)
  }
  return (
    <AudioControls className="audio-controls">
      {
        audio && recordingStatus === StatusRecordingEnum.INACTIVE && <DivIcon onClick={onRemoveRecording}>
         <IconPortal srcIcon={IconDelete} />
        </DivIcon>
      }
      {audio && recordingStatus === StatusRecordingEnum.INACTIVE && (
        <AudioPlayer>
          <audio src={audio} controls={true}></audio>
        </AudioPlayer>
      )}
      {
        recordingStatus === StatusRecordingEnum.RECORDING && <RecordingCounter>
          {minute} : {second}
        </RecordingCounter>
      }
      {
        recordingStatus === StatusRecordingEnum.INACTIVE ? <Voice onClick={startRecording}>
          <IconPortal srcIcon={IconVoice} />
        </Voice> : <Voice onClick={stopRecording}>
          <IconPortal srcIcon={IconPause} />
        </Voice>
      }
    </AudioControls>
  );
};
const AudioControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Voice = styled.div`
  cursor: pointer;
`
const AudioPlayer = styled.div``
const DivIcon = styled.div`
  cursor: pointer;
`
const RecordingCounter = styled.div``
export default AudioRecorder;
