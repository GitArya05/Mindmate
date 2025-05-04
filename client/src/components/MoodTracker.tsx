import { useState } from 'react';
import { MoodType } from '@/types';
import { useMoodStore } from '@/hooks/useMoodStore';
import { motion } from 'framer-motion';

// SVG Wave Decorative Element
const MoodTrackerWave = () => (
  <svg 
    className="absolute top-0 right-0 w-full h-12 -z-10 text-primary/5"
    viewBox="0 0 1200 120" 
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
      fill="currentColor"
    />
  </svg>
);

interface MoodButtonProps {
  type: MoodType;
  emoji: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const MoodButton = ({ type, emoji, label, selected, onClick }: MoodButtonProps) => {
  // Color schemes for different moods
  const moodColors = {
    happy: 'bg-highlight/20 hover:bg-highlight/30 dark:bg-highlight/10 dark:hover:bg-highlight/20',
    calm: 'bg-primary/20 hover:bg-primary/30 dark:bg-primary/10 dark:hover:bg-primary/20',
    neutral: 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600',
    sad: 'bg-accent/20 hover:bg-accent/30 dark:bg-accent/10 dark:hover:bg-accent/20',
    stressed: 'bg-destructive/20 hover:bg-destructive/30 dark:bg-destructive/10 dark:hover:bg-destructive/20'
  };

  return (
    <motion.button
      key={type}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`mood-btn flex-1 flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${moodColors[type]} ${selected ? 'ring-4 ring-offset-2 ring-offset-background ring-primary/70 scale-105' : ''}`}
    >
      <span className="text-3xl mb-2">{emoji}</span>
      <span className="text-sm font-medium text-foreground dark:text-neutral-200">
        {label}
      </span>
    </motion.button>
  );
};

const MoodTracker = () => {
  const { 
    todayMood, 
    setTodayMood, 
    todayNote, 
    setTodayNote, 
    saveTodayMood,
    isAddingEntry 
  } = useMoodStore();
  
  const handleMoodSelect = (mood: MoodType) => {
    setTodayMood(mood);
  };
  
  const handleSave = async () => {
    if (!todayMood) return;
    await saveTodayMood();
  };
  
  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: 'happy', emoji: '😊', label: 'Happy' },
    { type: 'calm', emoji: '😌', label: 'Calm' },
    { type: 'neutral', emoji: '😐', label: 'Neutral' },
    { type: 'sad', emoji: '😔', label: 'Sad' },
    { type: 'stressed', emoji: '😫', label: 'Stressed' }
  ];

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <section className="mb-8">
      <motion.div 
        className="bg-white dark:bg-neutral-800 rounded-3xl shadow-md p-6 mb-6 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <MoodTrackerWave />
        
        <motion.h3 
          className="font-heading font-medium text-xl mb-6 dark:text-white text-center"
          variants={itemVariants}
        >
          How are you feeling right now?
        </motion.h3>
        
        <motion.div 
          className="flex flex-wrap justify-between gap-3 mb-8"
          variants={itemVariants}
        >
          {moods.map(mood => (
            <MoodButton
              key={mood.type}
              type={mood.type}
              emoji={mood.emoji}
              label={mood.label}
              selected={todayMood === mood.type}
              onClick={() => handleMoodSelect(mood.type)}
            />
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label 
            htmlFor="moodNote" 
            className="block text-sm font-medium text-primary-foreground dark:text-neutral-300 mb-3"
          >
            Would you like to share more about how you're feeling?
          </label>
          <textarea 
            id="moodNote" 
            value={todayNote}
            onChange={(e) => setTodayNote(e.target.value)}
            rows={3} 
            className="w-full px-4 py-3 rounded-2xl border border-primary/20 dark:border-primary/10 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
            placeholder="Write your thoughts here... (optional)"
          />
          <div className="flex justify-end mt-4">
            <motion.button 
              onClick={handleSave}
              disabled={!todayMood || isAddingEntry}
              whileHover={{ scale: !todayMood || isAddingEntry ? 1 : 1.05 }}
              whileTap={{ scale: !todayMood || isAddingEntry ? 1 : 0.95 }}
              className={`px-6 py-2.5 ${
                !todayMood
                  ? 'bg-neutral-300 dark:bg-neutral-600 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90'
              } text-primary-foreground dark:text-white rounded-full shadow-sm transition-all duration-300 flex items-center gap-2 font-medium`}
            >
              {isAddingEntry ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Entry'
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MoodTracker;
