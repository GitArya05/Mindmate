import { useState } from 'react';
import { MoodEntry, MoodType } from '@/types';
import { useMoodStore } from '@/hooks/useMoodStore';

interface MoodBarProps {
  height: string;
  day: string;
}

const MoodBar = ({ height, day }: MoodBarProps) => (
  <div className="flex flex-col items-center">
    <div className="h-full w-full relative">
      <div className={`h-${height} w-[10%] bg-primary-400 dark:bg-primary-500 rounded-t-lg`}></div>
    </div>
    <div className="text-xs text-neutral-500 dark:text-neutral-400 pt-2">{day}</div>
  </div>
);

const MoodGraph = () => {
  const { weekMoodEntries, monthMoodEntries } = useMoodStore();
  const [timeRange, setTimeRange] = useState<'7days' | '30days'>('7days');
  
  // Function to get day name
  const getDayName = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Function to map mood value to height percentage
  const getMoodHeight = (mood: MoodType): string => {
    switch (mood) {
      case 'happy': return '80%';
      case 'calm': return '65%';
      case 'neutral': return '50%';
      case 'sad': return '40%';
      case 'stressed': return '30%';
      default: return '50%';
    }
  };
  
  // Prepare data for display
  const entries = timeRange === '7days' ? weekMoodEntries || [] : monthMoodEntries || [];
  const moodData = entries.map((entry: MoodEntry) => ({
    day: getDayName(new Date(entry.createdAt)),
    height: getMoodHeight(entry.mood),
    mood: entry.mood
  }));
  
  // Determine mood trend
  const getMoodTrend = () => {
    if (!entries || entries.length < 3) return null;
    
    const moodValues: Record<MoodType, number> = {
      happy: 5,
      calm: 4,
      neutral: 3,
      sad: 2,
      stressed: 1
    };
    
    const firstHalfEntries = entries.slice(0, Math.floor(entries.length / 2));
    const secondHalfEntries = entries.slice(Math.floor(entries.length / 2));
    
    const firstHalfAvg = firstHalfEntries.reduce((sum, entry) => sum + moodValues[entry.mood as MoodType], 0) / firstHalfEntries.length;
    const secondHalfAvg = secondHalfEntries.reduce((sum, entry) => sum + moodValues[entry.mood as MoodType], 0) / secondHalfEntries.length;
    
    const diff = secondHalfAvg - firstHalfAvg;
    
    if (diff > 0.5) return 'improving';
    if (diff < -0.5) return 'declining';
    return 'stable';
  };
  
  const trend = getMoodTrend();
  
  return (
    <div className="card bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-heading font-medium text-lg dark:text-white">Mood Tracker</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('7days')}
            className={`px-3 py-1 text-sm rounded-full ${
              timeRange === '7days' 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            } transition-colors`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeRange('30days')}
            className={`px-3 py-1 text-sm rounded-full ${
              timeRange === '30days' 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            } transition-colors`}
          >
            30 Days
          </button>
        </div>
      </div>
      
      <div className="h-64 relative">
        {entries.length > 0 ? (
          <>
            {/* Mood graph with day lines */}
            <div className="absolute inset-0 flex items-end justify-between px-2">
              <div className="h-full w-full absolute left-0 top-0">
                <div className="h-full w-full flex justify-between items-end">
                  {moodData.map((_, index) => (
                    <div key={index} className="h-full border-r border-neutral-200 dark:border-neutral-700 opacity-30"></div>
                  ))}
                </div>
              </div>
              
              {/* Mood bars */}
              {moodData.map((data, index) => (
                <div key={index} className={`h-[${data.height}] w-[10%] bg-primary-400 dark:bg-primary-500 rounded-t-lg`}></div>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-2">
              {moodData.map((data, index) => (
                <div key={index}>{data.day}</div>
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 bottom-8 flex flex-col justify-between text-xs text-neutral-500 dark:text-neutral-400 pr-2">
              <div>Excellent</div>
              <div>Good</div>
              <div>Neutral</div>
              <div>Low</div>
              <div>Poor</div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            No mood data for this period. Start tracking your moods!
          </div>
        )}
      </div>
      
      <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
        {trend && (
          <p>
            Your mood has been {' '}
            <span className="font-medium text-primary-600 dark:text-primary-400">
              {trend}
            </span>
            {' '} over the past {timeRange === '7days' ? 'week' : 'month'}.
          </p>
        )}
      </div>
    </div>
  );
};

export default MoodGraph;
