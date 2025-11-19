import React, { useEffect, useRef, useState } from "react";

function AudioPlayer({ tracks }) {
  const audioRef = useRef(new Audio());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-fade in
  const fadeIn = (audio) => {
    audio.volume = 0.0;
    const fadeInterval = setInterval(() => {
      if (audio.volume < 0.9) {
        audio.volume = Math.min(audio.volume + 0.05, 0.9);
      } else {
        clearInterval(fadeInterval);
      }
    }, 150);
  };

  const playTrack = (index) => {
    const audio = audioRef.current;
    audio.src = tracks[index];
    audio.load();
    audio.play().then(() => fadeIn(audio));
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    playTrack(currentIndex);

    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, [currentIndex]);

  return (
    <div className="audio-controls">
      <button onClick={prevTrack}>⏮ Prev</button>
      <button onClick={nextTrack}>⏭ Next</button>
    </div>
  );
}

export default AudioPlayer;