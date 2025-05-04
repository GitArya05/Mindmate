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
import UrgentHelpSection from '@/components/UrgentHelpSection';
import { getCurrentUser } from '@/lib/firebase';
import { motion } from 'framer-motion';

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

  // Soft pink background decoration
  const SoftPinkBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute top-0 right-0 w-full h-full bg-[#FFD1DC] opacity-10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-[#A7C7E7] opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      {/* Soft background decoration */}
      <SoftPinkBackground />
      
      <Header userDisplayName={userDisplayName} userInitials={userInitials} />
      
      <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6 relative z-10">
        {/* Welcome Experience with Carousel and Quote */}
        <WelcomeExperience greeting={greeting} userDisplayName={userDisplayName} />

        {/* Urgent Help Section - Always visible */}
        <UrgentHelpSection />

        {/* Features Grid - Only shown after welcome experience */}
        {showFeatures && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MoodGraph />
            <BreathingExercise />
            <SelfCareChecklist />
            <SoundPlayer />
            <ChatWithAI />
            <CommunityBoard />
          </motion.div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
