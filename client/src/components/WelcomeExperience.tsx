import { useState, useEffect } from 'react';
import { useQuoteStore } from '@/hooks/useQuoteStore';
import WelcomeCarousel from './WelcomeCarousel';
import MoodTracker from './MoodTracker';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Decorative Elements
const TopRightBlob = () => (
  <svg 
    className="absolute top-0 right-0 w-64 h-64 -z-10 text-accent/10 dark:text-accent/5"
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fill="currentColor" 
      d="M38.5,-64.1C54.1,-55.3,73.9,-50.6,83.5,-38.3C93.1,-26,92.6,-6.2,86.4,10.4C80.3,27,68.6,40.5,56.4,54.9C44.2,69.3,31.5,84.8,15.5,89.6C-0.6,94.5,-19.9,88.7,-34.4,78.8C-48.9,68.9,-58.5,55,-67,39.9C-75.6,24.9,-83,8.7,-83,0C-83.1,-8.6,-75.7,-17.1,-67.5,-24.9C-59.2,-32.6,-50,-39.6,-39.8,-50.3C-29.7,-60.9,-18.7,-75.1,-4.6,-79.1C9.6,-83.1,22.9,-73,38.5,-64.1Z" 
      transform="translate(100 100)" 
    />
  </svg>
);

const BottomLeftWave = () => (
  <svg 
    className="absolute bottom-0 left-0 w-64 h-64 -z-10 text-secondary/10 dark:text-secondary/5 overflow-hidden"
    viewBox="0 0 100 100" 
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0,50 C15,40 30,60 50,50 C70,40 85,60 100,50 L100,100 L0,100 Z" 
      fill="currentColor"
    />
  </svg>
);

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
    <div className="welcome-experience mb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <TopRightBlob />
      <BottomLeftWave />
      
      <AnimatePresence>
        {!showMoodTracker ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10" // Ensure content is above decorative elements
          >
            <motion.h2 
              className="font-heading font-medium text-2xl md:text-3xl mb-4 text-center text-primary-foreground dark:text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {personalGreeting} <span className="inline-block animate-wave">👋</span>
            </motion.h2>
            
            <WelcomeCarousel />
            
            <div className="quote-container bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-sm border border-primary/10 dark:border-accent/10">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex items-start mb-2">
                    <div className="text-4xl text-accent mr-2">“</div>
                  </div>
                  <blockquote className="italic text-primary-foreground dark:text-neutral-300 pl-4 py-2 text-lg">
                    {currentQuote?.text || "The calm mind brings inner strength and self-confidence, so that's very important for good health."}
                  </blockquote>
                  <div className="flex justify-end">
                    <div className="text-4xl text-accent mr-2">”</div>
                  </div>
                  <p className="text-right text-sm text-primary-foreground/70 dark:text-neutral-400 mt-2">
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
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">How are you feeling today?</span>
                  <span className="absolute inset-0 bg-highlight/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
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
            className="relative z-10 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-primary/10 dark:border-accent/10"
          >
            <h3 className="font-heading font-medium text-xl mb-5 dark:text-white text-center">
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