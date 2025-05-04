import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { useThoughtStore } from '@/hooks/useThoughtStore';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThoughtPost } from '@/types';

const CommunityBoard = () => {
  const { 
    thoughtPosts, 
    isLoadingThoughts, 
    newThought, 
    setNewThought, 
    postThought, 
    isPostingThought,
    likeThought,
    isModalOpen,
    setIsModalOpen
  } = useThoughtStore();
  
  const handlePostThought = async () => {
    if (await postThought()) {
      setIsModalOpen(false);
    }
  };
  
  const getTimeAgo = (date: Date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'recently';
    }
  };
  
  return (
    <div className="card bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 col-span-1 md:col-span-2 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-heading font-medium text-lg dark:text-white">
          Anonymous Thought Board
        </h3>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm flex items-center gap-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                  clipRule="evenodd"
                />
              </svg>
              <span>Share a Thought</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Thought Anonymously</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                This is a safe space to express yourself. Your identity will remain anonymous.
              </p>
              <Textarea 
                placeholder="What's on your mind today? Share your thoughts, experiences, or encouragement..."
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button 
                disabled={!newThought.trim() || isPostingThought}
                onClick={handlePostThought}
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                {isPostingThought ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  'Post Anonymously'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoadingThoughts ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {thoughtPosts && thoughtPosts.length > 0 ? (
            thoughtPosts.map((post: ThoughtPost) => (
              <div key={post.id} className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <p className="text-neutral-700 dark:text-neutral-300 mb-3">
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-neutral-500">
                  <span>Anonymous</span>
                  <span>{getTimeAgo(post.createdAt)}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
                  <button 
                    onClick={() => likeThought(post.id)}
                    className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" 
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-10 text-neutral-500 dark:text-neutral-400">
              <p>No thoughts shared yet. Be the first to share!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityBoard;
