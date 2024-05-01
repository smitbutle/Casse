import { useState, useEffect } from 'react';

const Stopwatch = ({ initialTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(initialTime - Date.now());
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  }, [initialTime]);

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const years = Math.floor(totalSeconds / (365 * 24 * 3600));
    const months = Math.floor((totalSeconds % (365 * 24 * 3600)) / (30 * 24 * 3600));
    const days = Math.floor((totalSeconds % (30 * 24 * 3600)) / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    if (years > 0) {
        return `${years} years ${months} months`;
    } else if (months > 0) {
        return `${months} months ${days} days`;
    } else if (days > 0) {
        return `${days} days ${hours} hours`;
    } else if (hours > 0) {
        return `${hours} hours ${minutes} minutes`;
    } else {
        return `${minutes} minutes ${seconds} seconds`;
    }
}

  return (
    <div>
      <p>{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default Stopwatch;
