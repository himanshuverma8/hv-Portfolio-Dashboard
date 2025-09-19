"use client";
import React, { useState, useEffect, useRef } from "react";
import { animate, createScope, createSpring, createDraggable } from 'animejs';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register the Draggable plugin
gsap.registerPlugin(Draggable);

const LiveTimer: React.FC = () => {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);
  const draggableInstance = useRef<Draggable | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isClicked, setIsClicked] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!root.current) return;

    scope.current = createScope({ root }).add((self: any) => {
      
      animate('.timer', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) }
        ],
        loop: true,
        loopDelay: 250,
      });
    });

    // Create GSAP Draggable instance
    draggableInstance.current = Draggable.create('.timer', {
      type: 'x,y',
      bounds: 'body',
      inertia: true,
      dragResistance: 0.1,
      onDrag: function() {
        // Optional: Add any drag event handling here
      },
      onDragEnd: function() {
        // Optional: Add any drag end event handling here
      }
    })[0];

    return () => {
      scope.current && scope.current.revert();
      if (draggableInstance.current) {
        draggableInstance.current.kill();
      }
    };
  }, []);

  // Fetch target date from API
  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const response = await fetch('/api/target-date');
        const data = await response.json();
        
        if (data.success) {
          // Parse the target date string
          const { parseTargetDate } = await import('@/utils/dateParser');
          const parsedDate = parseTargetDate(data.data.targetDate);
          setTargetDate(parsedDate);
        } else {
          // Fallback to default date
          setTargetDate(new Date("2026-05-01T00:00:00"));
        }
      } catch (error) {
        // Fallback to default date
        setTargetDate(new Date("2026-05-01T00:00:00"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTargetDate();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((difference % 1000) / 10); // Convert to centiseconds for better readability

        setTimeLeft({ years, months, days, hours, minutes, seconds, milliseconds });
      } else {
        setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
      }
    };

    calculateTimeLeft();
    const timeInterval = setInterval(calculateTimeLeft, 10); // Update every 10ms for smooth milliseconds

    return () => {
      clearInterval(timeInterval);
    };
  }, [targetDate]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleClick();
  };

  if (isLoading) {
    return (
      <div ref={root}>
        <div
          className="timer fixed z-50 cursor-pointer transition-all duration-500 opacity-20 hover:opacity-40 select-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            touchAction: 'manipulation',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
        >
        <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-2xl p-4 shadow-2xl min-w-[280px]">
          <div className="text-center">
            <div className="text-black/80 dark:text-white/80 text-lg">Loading...</div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={root}>
      <div
        className={`timer fixed z-50 cursor-pointer transition-all duration-500 select-none ${
          isClicked ? "opacity-80" : "opacity-20 hover:opacity-40"
        }`}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          touchAction: 'manipulation',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 dark:border-white/10 rounded-2xl p-4 shadow-2xl hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/20 dark:hover:border-white/20 transition-all duration-300 min-w-[280px]">
          <div className="text-center">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-black/80 dark:text-white/80">
                <div className="font-bold text-lg">{timeLeft.years}</div>
                <div className="text-xs">Years</div>
              </div>
              <div className="text-black/80 dark:text-white/80">
                <div className="font-bold text-lg">{timeLeft.months}</div>
                <div className="text-xs">Months</div>
              </div>
              <div className="text-black/80 dark:text-white/80">
                <div className="font-bold text-lg">{timeLeft.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="text-black/80 dark:text-white/80">
                <div className="font-bold text-lg">{timeLeft.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="text-black/80 dark:text-white/80">
                <div className="font-bold text-lg">{timeLeft.minutes}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="text-black/80 dark:text-white/80">
                <div className="font-bold text-lg">{timeLeft.seconds}</div>
                <div className="text-xs">Seconds</div>
              </div>
              <div className="text-black/80 dark:text-white/80 col-span-3">
                <div className="font-bold text-2xl">{timeLeft.milliseconds.toString().padStart(2, '0')}</div>
                <div className="text-xs">Centiseconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTimer;
