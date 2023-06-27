import React, { useEffect, useState } from 'react';

export default function StopwatchWidget() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  };

  const padTime = (value) => {
    return String(value).padStart(2, '0');
  };

  return (
    <div style={{ minWidth: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'row' }}>
        <p>Stopwatch</p>
      </div>
      <div className="stopwatch-container">
        <div className="stopwatch-display">
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{formatTime(time)}</p>
        </div>
        <div className="stopwatch-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isRunning ? (
            <button className="stopwatch-button stop" onClick={stopStopwatch}>
              Stop
            </button>
          ) : (
            <button className="stopwatch-button start" onClick={startStopwatch}>
              Start
            </button>
          )}
          <button className="stopwatch-button" onClick={resetStopwatch}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
