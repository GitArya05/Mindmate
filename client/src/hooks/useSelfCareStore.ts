import { useState, useEffect } from 'react';
import { SelfCareChecklist } from '@/types';
import { apiRequest } from '@/lib/queryClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Default dummy user ID (in a real app, this would come from authentication)
const DEFAULT_USER_ID = 1;

export const useSelfCareStore = (userId: number = DEFAULT_USER_ID) => {
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];
  
  // Fetch today's self-care checklist
  const { 
    data: checklist, 
    isLoading: isLoadingChecklist 
  } = useQuery({
    queryKey: [`/api/self-care/${userId}`, { date: today }],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Initialize default checklist state
  const [selfCareItems, setSelfCareItems] = useState({
    water: false,
    exercise: false,
    sleep: false,
    journal: false,
    mindfulness: false
  });

  // Create a new checklist
  const createChecklistMutation = useMutation({
    mutationFn: async (data: Partial<SelfCareChecklist>) => {
      const res = await apiRequest('POST', '/api/self-care', {
        userId,
        ...data
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/self-care/${userId}`] });
    },
  });

  // Update an existing checklist
  const updateChecklistMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SelfCareChecklist> }) => {
      const res = await apiRequest('PATCH', `/api/self-care/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/self-care/${userId}`] });
    },
  });

  // Update state when data is loaded
  useEffect(() => {
    if (checklist) {
      setSelfCareItems({
        water: checklist.water,
        exercise: checklist.exercise,
        sleep: checklist.sleep,
        journal: checklist.journal,
        mindfulness: checklist.mindfulness
      });
    }
  }, [checklist]);

  // Toggle a self-care item
  const toggleItem = async (item: keyof typeof selfCareItems) => {
    // Update local state first for responsive UI
    setSelfCareItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
    
    try {
      if (checklist) {
        // Update existing checklist
        await updateChecklistMutation.mutateAsync({
          id: checklist.id,
          data: { [item]: !selfCareItems[item] }
        });
      } else {
        // Create new checklist
        await createChecklistMutation.mutateAsync({
          ...selfCareItems,
          [item]: !selfCareItems[item]
        });
      }
      return true;
    } catch (error) {
      // Revert local state on error
      setSelfCareItems(prev => ({
        ...prev,
        [item]: !prev[item]
      }));
      console.error('Error updating self-care item:', error);
      return false;
    }
  };

  // Calculate progress percentage
  const getProgress = () => {
    const total = Object.keys(selfCareItems).length;
    const completed = Object.values(selfCareItems).filter(Boolean).length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    };
  };

  return {
    selfCareItems,
    isLoadingChecklist,
    toggleItem,
    getProgress,
    isUpdating: createChecklistMutation.isPending || updateChecklistMutation.isPending
  };
};
