import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import MoodGraph from '@/components/MoodGraph';
import QuoteCard from '@/components/QuoteCard';
import BreathingExercise from '@/components/BreathingExercise';
import SelfCareChecklist from '@/components/SelfCareChecklist';
import SoundPlayer from '@/components/SoundPlayer';
import ChatWithAI from '@/components/ChatWithAI';
import CommunityBoard from '@/components/CommunityBoard';
import WelcomeExperience from '@/components/WelcomeExperience';
import { getCurrentUser } from '@/lib/firebase';

const Home = () => {
  const [greeting, setGreeting] = useState('Good day');
  const [userDisplayName, setUserDisplayName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [showFeatures, setShowFeatures] = useState(false);

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

    // Show features after a delay to allow the welcome experience to be appreciated
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, 12000); // 12 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <Header userDisplayName={userDisplayName} userInitials={userInitials} />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Welcome Experience with Carousel and Quote */}
        <WelcomeExperience greeting={greeting} userDisplayName={userDisplayName} />

        {/* Features Grid - Only shown after welcome experience */}
        {showFeatures && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            <MoodGraph />
            <BreathingExercise />
            <SelfCareChecklist />
            <SoundPlayer />
            <ChatWithAI />
            <CommunityBoard />
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
