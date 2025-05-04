import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import MoodTracker from '@/components/MoodTracker';
import MoodGraph from '@/components/MoodGraph';
import QuoteCard from '@/components/QuoteCard';
import BreathingExercise from '@/components/BreathingExercise';
import SelfCareChecklist from '@/components/SelfCareChecklist';
import SoundPlayer from '@/components/SoundPlayer';
import ChatWithAI from '@/components/ChatWithAI';
import CommunityBoard from '@/components/CommunityBoard';
import { getCurrentUser } from '@/lib/firebase';

const Home = () => {
  const [greeting, setGreeting] = useState('Good day');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }

    // Get user information if logged in
    const user = getCurrentUser();
    if (user) {
      // Try to get display name, fallback to anonymous user
      const displayName = user.displayName || 'Friend';
      setUserDisplayName(displayName);
      
      // Create initials from display name or use anonymous initials
      if (user.displayName) {
        const names = displayName.split(' ');
        const initials = names.length > 1 
          ? `${names[0][0]}${names[1][0]}` 
          : `${names[0][0]}${names[0][1] || ''}`;
        setUserInitials(initials.toUpperCase());
      } else {
        setUserInitials('AN');
      }
    } else {
      // Default for users not logged in
      setUserDisplayName('Friend');
      setUserInitials('AN');
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <Header userDisplayName={userDisplayName} userInitials={userInitials} />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Welcome message */}
        <div className="mb-8">
          <h2 className="font-heading font-medium text-2xl mb-2 dark:text-white">
            {greeting}, <span>{userDisplayName}</span> 👋
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            How are you feeling today?
          </p>
        </div>

        {/* Today's mood section */}
        <MoodTracker />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MoodGraph />
          <QuoteCard />
          <BreathingExercise />
          <SelfCareChecklist />
          <SoundPlayer />
          <ChatWithAI />
          <CommunityBoard />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
