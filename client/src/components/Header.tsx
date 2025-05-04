import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import ThemeToggle from './ThemeToggle';
import FocusMode from './FocusMode';

interface HeaderProps {
  userDisplayName?: string;
  userInitials?: string;
}

const Header = ({ userDisplayName = "Jane", userInitials = "JD" }: HeaderProps) => {
  const { theme } = useTheme();
  const [isFocusMode, setIsFocusMode] = useState(false);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    // Apply focus mode to body
    if (!isFocusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-primary-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1.7 12.5a.7.7 0 011.4 0v.5a.7.7 0 01-1.4 0v-.5zm0-9a.7.7 0 011.4 0v5a.7.7 0 01-1.4 0v-5z" 
              clipRule="evenodd"
            />
          </svg>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-primary-600 dark:text-primary-400">
            MindMate
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <FocusMode isActive={isFocusMode} toggleFocusMode={toggleFocusMode} />
          <ThemeToggle />
          
          <button 
            aria-label="Profile" 
            className="flex items-center justify-center h-9 w-9 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
          >
            <span className="font-medium text-sm">{userInitials}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
