import { useState } from 'react';
import { ThoughtPost } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Default dummy user ID (in a real app, this would come from authentication)
const DEFAULT_USER_ID = 0;

export const useThoughtStore = (userId: number = DEFAULT_USER_ID) => {
  const queryClient = useQueryClient();
  const [newThought, setNewThought] = useState('');
  const [isPostingThought, setIsPostingThought] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch thought posts
  const { data: thoughtPosts, isLoading: isLoadingThoughts } = useQuery({
    queryKey: ['/api/thought-posts'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add a new thought post
  const addThoughtMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest('POST', '/api/thought-posts', {
        userId,
        content
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/thought-posts'] });
      setNewThought('');
      setIsModalOpen(false);
    },
  });

  // Like a thought post
  const likeThoughtMutation = useMutation({
    mutationFn: async (postId: number) => {
      const res = await apiRequest('POST', `/api/thought-posts/${postId}/like`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/thought-posts'] });
    },
  });

  // Post a new thought
  const postThought = async () => {
    if (!newThought.trim()) return;
    
    try {
      setIsPostingThought(true);
      await addThoughtMutation.mutateAsync(newThought);
      return true;
    } catch (error) {
      console.error('Error posting thought:', error);
      return false;
    } finally {
      setIsPostingThought(false);
    }
  };

  // Like a thought
  const likeThought = async (postId: number) => {
    try {
      await likeThoughtMutation.mutateAsync(postId);
      return true;
    } catch (error) {
      console.error('Error liking thought:', error);
      return false;
    }
  };

  return {
    thoughtPosts,
    isLoadingThoughts,
    newThought,
    setNewThought,
    postThought,
    isPostingThought,
    likeThought,
    isModalOpen,
    setIsModalOpen
  };
};
