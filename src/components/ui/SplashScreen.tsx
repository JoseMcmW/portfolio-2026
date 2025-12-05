import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, duration = 3000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after duration
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    // Call onComplete after animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 800); // 800ms for animation duration

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-transform duration-800 ${
        isExiting ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{
        backgroundColor: '#221F20',
        transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)'
      }}
    >
      <p className="text-4xl font-light text-white animate-pulse">
        loading
      </p>
    </div>
  );
};
