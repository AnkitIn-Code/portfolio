import { useState, useEffect } from 'react';

export function useCountUp(target, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end) || start === end) {
      setCount(target);
      return;
    }

    const totalMiliseconds = duration;
    // Limit tick frequency to 60fps (approx 16ms)
    const incrementTime = 20; 
    const steps = totalMiliseconds / incrementTime;
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}
