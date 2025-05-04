import { useSelfCareStore } from '@/hooks/useSelfCareStore';

const SelfCareChecklist = () => {
  const { 
    selfCareItems, 
    isLoadingChecklist, 
    toggleItem, 
    getProgress, 
    isUpdating 
  } = useSelfCareStore();
  
  const progress = getProgress();
  
  // Define checklist items
  const checklistItems = [
    { id: 'water', label: 'Drank enough water', stateKey: 'water' as keyof typeof selfCareItems },
    { id: 'exercise', label: 'Did some exercise', stateKey: 'exercise' as keyof typeof selfCareItems },
    { id: 'sleep', label: '7+ hours of sleep', stateKey: 'sleep' as keyof typeof selfCareItems },
    { id: 'journal', label: 'Journaled today', stateKey: 'journal' as keyof typeof selfCareItems },
    { id: 'mindful', label: 'Practiced mindfulness', stateKey: 'mindfulness' as keyof typeof selfCareItems },
  ];
  
  return (
    <div className="card bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 col-span-1">
      <h3 className="font-heading font-medium text-lg mb-4 dark:text-white">
        Self-Care Checklist
      </h3>
      
      {isLoadingChecklist ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {checklistItems.map(item => (
              <div key={item.id} className="flex items-center">
                <input 
                  id={item.id} 
                  type="checkbox" 
                  checked={selfCareItems[item.stateKey]}
                  onChange={() => toggleItem(item.stateKey)}
                  disabled={isUpdating}
                  className="h-5 w-5 text-primary-600 rounded border-neutral-300 dark:border-neutral-600 focus:ring-primary-500 dark:focus:ring-primary-500"
                />
                <label 
                  htmlFor={item.id} 
                  className="ml-3 text-neutral-700 dark:text-neutral-300"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Today's progress
              </span>
              <span className="font-medium">
                {progress.completed}/{progress.total}
              </span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
              <div 
                className="bg-primary-500 h-2 rounded-full" 
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SelfCareChecklist;
