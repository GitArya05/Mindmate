import { useState, useRef, useEffect } from 'react';
import { Sound } from '@/types';

// Define available sounds
const availableSounds: Omit<Sound, 'isPlaying' | 'progress'>[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_fd8d1fb0e8.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9'
  },
  {
    id: 'rain',
    name: 'Rain',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_3b8b7ef0af.mp3?filename=light-rain-ambient-114354.mp3',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/20/audio_40a059446f.mp3?filename=ocean-waves-112906.mp3',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b'
  },
  {
    id: 'fire',
    name: 'Fire',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d1f9a5fe28.mp3?filename=crackling-fireplace-nature-sounds-8012.mp3',
    image: 'https://images.unsplash.com/photo-1475732744042-a3f3f2294988'
  },
  {
    id: 'night',
    name: 'Night',
    src: 'https://cdn.pixabay.com/download/audio/2022/01/19/audio_232a2a248b.mp3?filename=crickets-at-night-with-distant-thunder-nature-sounds-7804.mp3',
    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291'
  }
];

export const useSoundStore = () => {
  // Initialize sounds with isPlaying and progress
  const [sounds, setSounds] = useState<Sound[]>(
    availableSounds.map(sound => ({
      ...sound,
      isPlaying: false,
      progress: 0
    }))
  );
  
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, []);

  // Play a sound
  const playSound = (id: string) => {
    // If we're already playing this sound, pause it
    if (currentSound?.id === id && currentSound.isPlaying) {
      pauseSound();
      return;
    }
    
    // Stop any currently playing sound
    if (audioRef.current) {
      audioRef.current.pause();
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
    
    // Find the new sound to play
    const soundToPlay = sounds.find(s => s.id === id);
    if (!soundToPlay) return;
    
    // Create a new audio element
    const audio = new Audio(soundToPlay.src);
    audio.loop = true;
    audio.volume = 0.7;
    audio.play();
    
    audioRef.current = audio;
    
    // Update the sounds array to reflect the playing state
    setSounds(prevSounds => 
      prevSounds.map(sound => ({
        ...sound,
        isPlaying: sound.id === id
      }))
    );
    
    // Set current sound
    setCurrentSound({
      ...soundToPlay,
      isPlaying: true,
      progress: 0
    });
    
    // Start progress tracking
    progressIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        
        setCurrentSound(prev => {
          if (!prev) return null;
          return {
            ...prev,
            progress: newProgress
          };
        });
      }
    }, 1000);
  };

  // Pause the current sound
  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    
    setSounds(prevSounds => 
      prevSounds.map(sound => ({
        ...sound,
        isPlaying: false
      }))
    );
    
    if (currentSound) {
      setCurrentSound({
        ...currentSound,
        isPlaying: false
      });
    }
  };

  // Set volume
  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return {
    sounds,
    currentSound,
    playSound,
    pauseSound,
    setVolume
  };
};
