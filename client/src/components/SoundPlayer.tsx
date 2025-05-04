import { useSoundStore } from '@/hooks/useSoundStore';

const SoundPlayer = () => {
  const { sounds, currentSound, playSound } = useSoundStore();
  
  return (
    <div className="card bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6 col-span-1">
      <h3 className="font-heading font-medium text-lg mb-4 dark:text-white">
        Relaxation Sounds
      </h3>
      
      <div className="space-y-4">
        {/* Featured sound with image */}
        <div className="relative overflow-hidden rounded-lg h-36 group">
          <img 
            src={currentSound?.image || sounds[0]?.image} 
            alt={currentSound?.name || sounds[0]?.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div className="w-full">
              <h4 className="text-white font-medium mb-1">
                {currentSound?.name || sounds[0]?.name}
              </h4>
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => playSound(currentSound?.id || sounds[0]?.id)}
                  className="text-white p-2 rounded-full bg-primary-500/80 hover:bg-primary-500"
                >
                  {currentSound?.isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                <div className="w-2/3 bg-white/30 rounded-full h-1.5">
                  <div 
                    className="bg-white h-1.5 rounded-full" 
                    style={{ width: `${currentSound?.isPlaying ? currentSound?.progress : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sound selection buttons */}
        <div className="grid grid-cols-2 gap-3">
          {sounds.map(sound => (
            <button 
              key={sound.id}
              onClick={() => playSound(sound.id)}
              className={`p-3 rounded-lg ${
                sound.isPlaying 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                  : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300'
              } transition-colors text-sm flex items-center justify-center gap-2`}
            >
              {sound.id === 'rain' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0V5z" clipRule="evenodd"/>
                </svg>
              )}
              {sound.id === 'ocean' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 3.636a1 1 0 011.414 0L10 7.172l3.536-3.536a1 1 0 111.414 1.414L11.414 8.586l3.536 3.536a1 1 0 11-1.414 1.414L10 9.828l-3.536 3.536a1 1 0 01-1.414-1.414l3.536-3.536L5.05 5.05a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              )}
              {sound.id === 'fire' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
              )}
              {sound.id === 'night' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              )}
              {sound.id === 'forest' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                </svg>
              )}
              <span>{sound.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SoundPlayer;
