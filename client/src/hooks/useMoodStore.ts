import { useState, useEffect } from 'react';
import { MoodEntry, MoodType } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Default dummy user ID (in a real app, this would come from authentication)
const DEFAULT_USER_ID = 1;

export const useMoodStore = (userId: number = DEFAULT_USER_ID) => {
  const queryClient = useQueryClient();
  
  // Get mood entries
  const { data: moodEntries, isLoading: isLoadingEntries } = useQuery({
    queryKey: [`/api/mood-entries/${userId}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get mood entries for the past 7 days
  const { data: weekMoodEntries } = useQuery({
    queryKey: [`/api/mood-entries/${userId}/range`, { start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() }],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Get mood entries for the past 30 days
  const { data: monthMoodEntries } = useQuery({
    queryKey: [`/api/mood-entries/${userId}/range`, { start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() }],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add a new mood entry
  const addMoodEntryMutation = useMutation({
    mutationFn: async ({ mood, note }: { mood: MoodType; note?: string }) => {
      const res = await apiRequest('POST', '/api/mood-entries', {
        userId,
        mood,
        note,
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate queries to refetch the mood entries
      queryClient.invalidateQueries({ queryKey: [`/api/mood-entries/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/mood-entries/${userId}/range`] });
    },
  });
  
  // State for tracking today's mood
  const [todayMood, setTodayMood] = useState<MoodType | null>(null);
  const [todayNote, setTodayNote] = useState<string>('');

  // Check if user has already logged a mood today
  useEffect(() => {
    if (moodEntries && moodEntries.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const todayEntry = moodEntries.find((entry: MoodEntry) => 
        new Date(entry.createdAt).toISOString().split('T')[0] === today
      );
      
      if (todayEntry) {
        setTodayMood(todayEntry.mood);
        setTodayNote(todayEntry.note || '');
      }
    }
  }, [moodEntries]);

  // Save today's mood
  const saveTodayMood = async () => {
    if (!todayMood) return;
    
    try {
      await addMoodEntryMutation.mutateAsync({ 
        mood: todayMood, 
        note: todayNote 
      });
      return true;
    } catch (error) {
      console.error('Error saving mood:', error);
      return false;
    }
  };

  // Get mood statistics
  const getMoodStats = () => {
    if (!monthMoodEntries) return null;
    
    const moodCounts: Record<MoodType, number> = {
      happy: 0,
      calm: 0,
      neutral: 0,
      sad: 0,
      stressed: 0
    };
    
    monthMoodEntries.forEach((entry: MoodEntry) => {
      moodCounts[entry.mood]++;
    });
    
    // Get most frequent mood
    let mostFrequentMood: MoodType = 'neutral';
    let maxCount = 0;
    
    (Object.keys(moodCounts) as MoodType[]).forEach(mood => {
      if (moodCounts[mood] > maxCount) {
        maxCount = moodCounts[mood];
        mostFrequentMood = mood;
      }
    });
    
    // Calculate mood trend (improved, worsened, stable)
    let trend = 'stable';
    if (weekMoodEntries && weekMoodEntries.length >= 3) {
      const moodValues: Record<MoodType, number> = {
        happy: 5,
        calm: 4,
        neutral: 3,
        sad: 2,
        stressed: 1
      };
      
      const firstHalf = weekMoodEntries.slice(0, Math.floor(weekMoodEntries.length / 2));
      const secondHalf = weekMoodEntries.slice(Math.floor(weekMoodEntries.length / 2));
      
      const firstHalfAvg = firstHalf.reduce((sum: number, entry: MoodEntry) => sum + moodValues[entry.mood], 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum: number, entry: MoodEntry) => sum + moodValues[entry.mood], 0) / secondHalf.length;
      
      if (secondHalfAvg - firstHalfAvg > 0.5) {
        trend = 'improved';
      } else if (firstHalfAvg - secondHalfAvg > 0.5) {
        trend = 'worsened';
      }
    }
    
    return {
      moodCounts,
      mostFrequentMood,
      trend
    };
  };

  return {
    moodEntries,
    weekMoodEntries,
    monthMoodEntries,
    isLoadingEntries,
    todayMood,
    setTodayMood,
    todayNote,
    setTodayNote,
    saveTodayMood,
    isAddingEntry: addMoodEntryMutation.isPending,
    getMoodStats
  };
};
