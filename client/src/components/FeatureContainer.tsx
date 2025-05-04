import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureContainerProps {
  children: ReactNode;
  title: string;
  icon?: ReactNode;
}

const FeatureContainer = ({ children, title, icon }: FeatureContainerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence mode="wait">
      {isFullscreen ? (
        // Fullscreen mode
        <motion.div
          key="fullscreen"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-800 p-4 md:p-6 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {icon && <span className="text-primary">{icon}</span>}
              <h3 className="font-heading font-medium text-xl text-foreground dark:text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors"
              aria-label="Exit fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </motion.div>
      ) : (
        // Regular card mode
        <motion.div
          key="regular"
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm p-6 h-full relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              {icon && <span className="text-primary">{icon}</span>}
              <h3 className="font-heading font-medium text-lg text-foreground dark:text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition-colors flex items-center justify-center"
              aria-label="View fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeatureContainer;