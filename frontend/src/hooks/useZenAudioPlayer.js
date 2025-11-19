import { useState, useEffect, useRef, useCallback } from "react";

export default function useZenAudioPlayer(tracks = []) {
  const audioRef = useRef(new Audio());
  const fadeInterval = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [shuffle, setShuffle] = useState(false);

  const fadeOut = useCallback(() => {
    return new Promise(resolve => {
      const audio = audioRef.current;
      clearInterval(fadeInterval.current);

      fadeInterval.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.volume = 0;
          clearInterval(fadeInterval.current);
          resolve();
        }
      }, 50);
    });
  }, []);

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    clearInterval(fadeInterval.current);

    audio.volume = 0;

    fadeInterval.current = setInterval(() => {
      if (audio.volume < volume) {
        audio.volume = Math.min(audio.volume + 0.05, volume);
      } else {
        clearInterval(fadeInterval.current);
      }
    }, 50);
  }, [volume]);

  const loadAndPlay = useCallback(
    async (index, autoplay = true) => {
      const audio = audioRef.current;

      if (autoplay) await fadeOut();

      audio.src = tracks[index];
      audio.load();

      if (autoplay) {
        await audio.play();
        setIsPlaying(true);
        fadeIn();
      }
    },
    [tracks, fadeIn, fadeOut]
  );

  const play = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
    fadeIn();
  }, [fadeIn]);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const next = useCallback(() => {
    if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    }
  }, [shuffle, tracks.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  }, [tracks.length]);

  const updateVolume = useCallback((v) => {
    setVolume(v);
    audioRef.current.volume = v;
  }, []);

  useEffect(() => {
    if (tracks.length > 0) loadAndPlay(currentIndex, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // merged efficient event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("ended", next);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("ended", next);
    };
  }, [next]);

  return {
    audioRef,
    currentIndex,
    isPlaying,
    progress,
    duration,
    volume,
    shuffle,
    play,
    pause,
    next,
    prev,
    updateVolume,
    setShuffle,
  };
}