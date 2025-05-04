import { useState } from 'react';
import { MoodType } from '@/types';
import { useMoodStore } from '@/hooks/useMoodStore';

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
  
  return (
    <section className="mb-8">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-heading font-medium text-lg mb-4 dark:text-white">
          Today's Mood
        </h3>
        
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          {moods.map(mood => (
            <button
              key={mood.type}
              onClick={() => handleMoodSelect(mood.type)}
              className={`mood-btn flex-1 flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                todayMood === mood.type
                  ? 'border-primary-300 dark:border-primary-500'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-500'
              }`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
        
        <div>
          <label 
            htmlFor="moodNote" 
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            What's on your mind today?
          </label>
          <textarea 
            id="moodNote" 
            value={todayNote}
            onChange={(e) => setTodayNote(e.target.value)}
            rows={3} 
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none transition" 
            placeholder="Write your thoughts here..."
          />
          <div className="flex justify-end mt-3">
            <button 
              onClick={handleSave}
              disabled={!todayMood || isAddingEntry}
              className={`px-4 py-2 ${
                !todayMood
                  ? 'bg-neutral-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600'
              } text-white rounded-lg transition-colors flex items-center gap-2`}
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
                'Save'
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodTracker;
