import React, { useState, useEffect } from 'react';

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York', // Set timezone to EST
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      setCurrentTime(currentDate);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes} ${ampm} · ${month} ${day}, ${year} (EST)`;
  };

  return (
    <>
      {formatTime(currentTime)}
      </>
  );
};

export default CurrentDateTime;