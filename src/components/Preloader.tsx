import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  'SOFTWARE ENGINEER',
  'AI AGENTS DEVELOPER',
  'ROS 2 ROBOTICS',
  'SYSTEMS & RUST',
  'WELCOME',
];

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + 1;
      });
    }, 18);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 450);

    return () => clearInterval(phraseInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#060709] p-8 md:p-16 text-white select-none"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center font-mono text-xs text-slate-400 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>AYUSH SHAH // PORTFOLIO</span>
            </div>
            <div>HYDERABAD, INDIA</div>
          </div>

          {/* Center Dynamic Phrase */}
          <div className="my-auto text-center overflow-hidden h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentPhraseIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-mono text-xl md:text-3xl lg:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-400"
              >
                {phrases[currentPhraseIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Bottom Progress Counter & Bar */}
          <div className="w-full space-y-4">
            <div className="flex justify-between items-end font-mono">
              <span className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
                {progress}%
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-widest hidden sm:inline">
                INITIALIZING SYSTEM MODULES
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
