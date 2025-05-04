import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

// SVG illustrations of happy people
const HappyPeopleIllustration = () => (
  <svg 
    className="w-full h-auto mb-4"
    viewBox="0 0 800 400" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background with soft color */}
    <rect width="800" height="400" fill="#FFD1DC" rx="20" opacity="0.2" />
    
    {/* Happy woman */}
    <g transform="translate(180, 80)">
      {/* Hair */}
      <ellipse cx="100" cy="80" rx="55" ry="65" fill="#704214" />
      
      {/* Face */}
      <circle cx="100" cy="100" r="50" fill="#FFE0BD" />
      
      {/* Eyes */}
      <ellipse cx="80" cy="90" rx="6" ry="8" fill="#333" />
      <ellipse cx="120" cy="90" rx="6" ry="8" fill="#333" />
      
      {/* Eyebrows */}
      <path d="M75 80 Q80 75, 85 80" stroke="#333" strokeWidth="2" fill="none" />
      <path d="M115 80 Q120 75, 125 80" stroke="#333" strokeWidth="2" fill="none" />
      
      {/* Smile */}
      <path d="M75 115 Q100 140, 125 115" stroke="#333" strokeWidth="3" fill="none" />
      
      {/* Blush */}
      <circle cx="70" cy="110" r="10" fill="#FFB6C1" opacity="0.5" />
      <circle cx="130" cy="110" r="10" fill="#FFB6C1" opacity="0.5" />
      
      {/* Body */}
      <rect x="75" y="150" width="50" height="70" rx="10" fill="#E6E6FA" />
      <circle cx="100" cy="150" r="25" fill="#E6E6FA" />
      
      {/* Arms */}
      <rect x="40" y="160" width="35" height="15" rx="7" fill="#FFE0BD" />
      <rect x="125" y="160" width="35" height="15" rx="7" fill="#FFE0BD" />
    </g>
    
    {/* Happy man */}
    <g transform="translate(480, 80)">
      {/* Hair */}
      <path d="M50 50 L150 50 L150 90 C150 120, 50 120, 50 90 Z" fill="#333" />
      
      {/* Face */}
      <circle cx="100" cy="100" r="50" fill="#FFE0BD" />
      
      {/* Eyes */}
      <ellipse cx="80" cy="90" rx="6" ry="8" fill="#333" />
      <ellipse cx="120" cy="90" rx="6" ry="8" fill="#333" />
      
      {/* Eyebrows */}
      <path d="M75 80 Q80 75, 85 80" stroke="#333" strokeWidth="2" fill="none" />
      <path d="M115 80 Q120 75, 125 80" stroke="#333" strokeWidth="2" fill="none" />
      
      {/* Smile */}
      <path d="M75 115 Q100 140, 125 115" stroke="#333" strokeWidth="3" fill="none" />
      
      {/* Body */}
      <rect x="75" y="150" width="50" height="70" rx="10" fill="#A7C7E7" />
      <circle cx="100" cy="150" r="25" fill="#A7C7E7" />
      
      {/* Arms */}
      <rect x="40" y="160" width="35" height="15" rx="7" fill="#FFE0BD" />
      <rect x="125" y="160" width="35" height="15" rx="7" fill="#FFE0BD" />
    </g>
    
    {/* Decorative elements */}
    <circle cx="100" cy="300" r="30" fill="#FFB6C1" opacity="0.3" />
    <circle cx="700" cy="320" r="25" fill="#A7C7E7" opacity="0.3" />
    <circle cx="400" cy="50" r="20" fill="#B2D8B2" opacity="0.3" />
  </svg>
);

const UrgentHelpSection = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  
  const openCallModal = () => {
    setIsCallModalOpen(true);
  };
  
  const closeCallModal = () => {
    setIsCallModalOpen(false);
  };
  
  return (
    <section className="mb-8">
      <motion.div 
        className="relative overflow-hidden bg-white dark:bg-neutral-800 rounded-3xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background decoration - a soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 via-primary/5 to-highlight/5 -z-10"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <h3 className="font-heading font-bold text-2xl mb-4 text-foreground dark:text-white">
              Urgent Mental Health Support
            </h3>
            
            <p className="text-primary-foreground/90 dark:text-neutral-300 mb-4">
              If you're experiencing a mental health crisis or need immediate support, 
              our professional counselors are available 24/7 to help you through difficult moments.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-foreground dark:text-white font-medium">Confidential & Private Support</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-foreground dark:text-white font-medium">Available 24/7</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-highlight/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-highlight" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-foreground dark:text-white font-medium">Professional Mental Health Specialists</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={openCallModal}
                className="bg-destructive hover:bg-destructive/90 text-white rounded-full px-6 py-3 text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Get Urgent Help Now
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <HappyPeopleIllustration />
          </div>
        </div>
      </motion.div>
      
      {/* Call Modal */}
      {isCallModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-3xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 text-foreground dark:text-white">Contact Mental Health Support</h3>
            
            <p className="text-primary-foreground/90 dark:text-neutral-300 mb-6">
              Our licensed therapists and counselors are ready to help you through any crisis. 
              Choose your preferred method of contact:
            </p>
            
            <div className="space-y-4">
              <a 
                href="tel:+18002738255" 
                className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors w-full"
              >
                <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground dark:text-white">Call Helpline</div>
                  <div className="text-sm text-primary-foreground/70 dark:text-neutral-400">1-800-273-8255</div>
                </div>
              </a>
              
              <a 
                href="sms:+18002738255" 
                className="flex items-center gap-3 p-4 rounded-xl border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors w-full"
              >
                <div className="bg-secondary w-10 h-10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-foreground dark:text-white">Text Crisis Line</div>
                  <div className="text-sm text-primary-foreground/70 dark:text-neutral-400">Text HOME to 741741</div>
                </div>
              </a>
              
              <button 
                onClick={closeCallModal} 
                className="mt-4 w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg text-foreground dark:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default UrgentHelpSection;