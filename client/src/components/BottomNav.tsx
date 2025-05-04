import { Link, useLocation } from 'wouter';

const BottomNav = () => {
  const [location] = useLocation();
  
  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-[0_-1px_3px_rgba(0,0,0,0.1)] fixed bottom-0 left-0 right-0 md:hidden z-40">
      <div className="flex items-center justify-around">
        <Link href="/">
          <a className={`flex flex-col items-center justify-center py-2 px-3 ${
            location === '/' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-neutral-600 dark:text-neutral-400'
          }`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs">Home</span>
          </a>
        </Link>
        
        <Link href="/journal">
          <a className={`flex flex-col items-center justify-center py-2 px-3 ${
            location === '/journal' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-neutral-600 dark:text-neutral-400'
          }`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">Journal</span>
          </a>
        </Link>
        
        <Link href="/stats">
          <a className={`flex flex-col items-center justify-center py-2 px-3 ${
            location === '/stats' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-neutral-600 dark:text-neutral-400'
          }`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span className="text-xs">Stats</span>
          </a>
        </Link>
        
        <Link href="/profile">
          <a className={`flex flex-col items-center justify-center py-2 px-3 ${
            location === '/profile' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-neutral-600 dark:text-neutral-400'
          }`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" 
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">Profile</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
