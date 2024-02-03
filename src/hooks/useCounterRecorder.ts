import {useCallback, useEffect, useState} from "react";
import {StatusRecordingEnum} from "../constants/chat";

export const useCounterRecorder = (recordingStatus:string) => {
  const [counter, setCounter] = useState(0);
  const [second, setSecond] = useState<string>("00");
  const [minute, setMinute] = useState<string>("00");
  useEffect(() => {
    if (recordingStatus === StatusRecordingEnum.RECORDING) {
      const intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : `${secondCounter}`;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : `${minuteCounter}`;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [recordingStatus, counter]);
  const resetCounter = useCallback(() => {
    setCounter(0)
    setSecond('00')
    setMinute('00')
  },[])
  return {
    second,
    minute,
    resetCounter
  }
}
