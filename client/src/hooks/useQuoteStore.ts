import { useState } from 'react';
import { Quote } from '@/types';
import { getRandomQuote } from '@/lib/openai';
import { useQuery } from '@tanstack/react-query';

export const useQuoteStore = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  // Fetch random quote from API
  const { data: quote, isLoading, refetch } = useQuery({
    queryKey: ['/api/quotes/random'],
    staleTime: Infinity, // Quote doesn't automatically refresh
  });

  // Update current quote when data is loaded
  if (quote && !currentQuote) {
    setCurrentQuote(quote);
  }

  // Get a new quote
  const fetchNewQuote = async () => {
    try {
      await refetch();
      if (quote) {
        setCurrentQuote(quote);
      }
      return true;
    } catch (error) {
      console.error('Error fetching new quote:', error);
      return false;
    }
  };

  return {
    currentQuote,
    isLoading,
    fetchNewQuote
  };
};
