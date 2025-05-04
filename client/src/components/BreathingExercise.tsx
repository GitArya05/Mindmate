import { useState, useEffect, useRef } from 'react';

const BreathingExercise = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breatheState, setBreatheState] = useState('Breathe In');
  const [timer, setTimer] = useState(4);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const startBreathing = () => {
    if (isBreathing) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setBreatheState('Breathe In');
      setTimer(4);
      setIsBreathing(false);
    } else {
      setIsBreathing(true);
      
      let phase = 0; // 0: breathe in, 1: hold, 2: breathe out, 3: hold
      let countdown = 4;
      
      intervalRef.current = window.setInterval(() => {
        countdown--;
        setTimer(countdown);
        
        if (countdown === 0) {
          phase = (phase + 1) % 4;
          
          switch(phase) {
            case 0:
              setBreatheState('Breathe In');
              countdown = 4;
              break;
            case 1:
              setBreatheState('Hold');
              countdown = 7;
              break;
            case 2:
              setBreatheState('Breathe Out');
              countdown = 8;
              break;
            case 3:
              setBreatheState('Hold');
              countdown = 4;
              break;
          }
          
          setTimer(countdown);
        }
      }, 1000);
    }
  };
  
  return (
    <div className="card bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-sm p-6 col-span-1">
      <h3 className="font-heading font-medium text-lg mb-4 text-white">
        Breathing Exercise
      </h3>
      
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center h-40 w-40 mb-6">
          <div className="absolute h-full w-full rounded-full bg-white/10 breathe-animation"></div>
          <div className="absolute h-[85%] w-[85%] rounded-full bg-white/15 breathe-animation" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute h-[70%] w-[70%] rounded-full bg-white/20 breathe-animation" style={{ animationDelay: '1s' }}></div>
          <div className="text-white text-center">
            <span className="block text-lg font-medium">{breatheState}</span>
            <span className="block text-2xl font-semibold">{timer}</span>
          </div>
        </div>
        
        <button 
          onClick={startBreathing}
          className="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          {isBreathing ? (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" 
                  clipRule="evenodd"
                />
              </svg>
              <span>Stop</span>
            </>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                  clipRule="evenodd"
                />
              </svg>
              <span>Start</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BreathingExercise;
