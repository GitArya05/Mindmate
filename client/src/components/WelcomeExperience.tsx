import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/hooks/useQuoteStore';
import WelcomeCarousel from './WelcomeCarousel';
import MoodTracker from './MoodTracker';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeExperienceProps {
  userDisplayName: string;
  greeting: string;
}

const WelcomeExperience = ({ userDisplayName, greeting }: WelcomeExperienceProps) => {
  const { currentQuote, isLoading } = useQuoteStore();
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  useEffect(() => {
    // Show the continue button after a delay to give user time to view the carousel
    const timer = setTimeout(() => {
      setShowContinueButton(true);
    }, 8000); // 8 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setShowMoodTracker(true);
  };

  // Personalized greeting message based on name
  const personalGreeting = userDisplayName ? 
    `${greeting}, ${userDisplayName}` : 
    `${greeting}`;

  return (
    <div className="welcome-experience mb-8">
      <AnimatePresence>
        {!showMoodTracker ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="font-heading font-medium text-2xl md:text-3xl mb-4 text-center dark:text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {personalGreeting} <span className="inline-block animate-wave">👋</span>
            </motion.h2>
            
            <WelcomeCarousel />
            
            <div className="quote-container bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-sm border border-neutral-100 dark:border-neutral-700">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <blockquote className="italic text-neutral-700 dark:text-neutral-300 border-l-4 border-primary-400 pl-4 py-2 text-lg">
                    "{currentQuote?.text || "The calm mind brings inner strength and self-confidence, so that's very important for good health."}"
                  </blockquote>
                  <p className="text-right text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                    — {currentQuote?.author || "Dalai Lama"}
                  </p>
                </motion.div>
              )}
            </div>
            
            {showContinueButton && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button 
                  onClick={handleContinue}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  How are you feeling today?
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="mood-tracker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading font-medium text-xl mb-3 dark:text-white text-center">
              How are you feeling today?
            </h3>
            <MoodTracker />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeExperience;