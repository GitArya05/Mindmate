interface FocusModeProps {
  isActive: boolean;
  toggleFocusMode: () => void;
}

const FocusMode = ({ isActive, toggleFocusMode }: FocusModeProps) => {
  return (
    <button 
      onClick={toggleFocusMode}
      className="hidden sm:flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
    >
      {isActive ? (
        <>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd"
            />
          </svg>
          <span>Exit Focus</span>
        </>
      ) : (
        <>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 100 10 5 5 0 000-10z" 
              clipRule="evenodd"
            />
          </svg>
          <span>Focus</span>
        </>
      )}
    </button>
  );
};

export default FocusMode;
