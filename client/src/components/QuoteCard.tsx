import { useState } from 'react';
import { useQuoteStore } from '@/hooks/useQuoteStore';

const QuoteCard = () => {
  const { currentQuote, isLoading, fetchNewQuote } = useQuoteStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleNewQuote = async () => {
    setIsRefreshing(true);
    await fetchNewQuote();
    setIsRefreshing(false);
  };
  
  return (
    <div className="card bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 col-span-1">
      <h3 className="font-heading font-medium text-lg mb-4 dark:text-white">
        Today's Quote
      </h3>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <blockquote className="italic text-neutral-700 dark:text-neutral-300 border-l-4 border-primary-400 pl-4 py-1">
              "{currentQuote?.text || "You don't have to see the whole staircase, just take the first step."}"
            </blockquote>
            <p className="text-right text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              — {currentQuote?.author || "Martin Luther King Jr."}
            </p>
          </div>
          
          <button 
            onClick={handleNewQuote}
            disabled={isRefreshing}
            className="w-full mt-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-neutral-700 dark:border-neutral-300"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M10 3a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5A1.5 1.5 0 0010 3zm0 10.5a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z" />
                  <path d="M13.414 7.5a1 1 0 00-1.414 0L10 9.5 8 7.5a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z" />
                </svg>
                <span>New Quote</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default QuoteCard;
