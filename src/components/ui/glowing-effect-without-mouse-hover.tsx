"use client";

import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectInfiniteProps {
  blur?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  movementDuration?: number; // Not used anymore, can repurpose as "speed" for the glow
  borderWidth?: number;
  speed?: number; // How fast the glow rotates, in degrees per second (optional, default 180deg/s)
}

const GlowingEffectInfinite = memo(
  ({
    blur = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    borderWidth = 1,
    speed = 180 // degrees per second
  }: GlowingEffectInfiniteProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastTimestamp = useRef<number | null>(null);
    const frameId = useRef<number | null>(null);
    const angleRef = useRef<number>(0);

    // Animate infinitely in a circular fashion:
    useEffect(() => {
      let running = true;

      function animateAngle(timestamp: number) {
        if (!running) return;
        if (lastTimestamp.current === null) lastTimestamp.current = timestamp;
        const delta = (timestamp - lastTimestamp.current) / 1000; // seconds
        lastTimestamp.current = timestamp;
        // Increase angle by speed * delta seconds (keep it in [0, 360))
        angleRef.current = (angleRef.current + speed * delta) % 360;
        if (containerRef.current) {
          containerRef.current.style.setProperty("--start", angleRef.current.toString());
          containerRef.current.style.setProperty("--active", "1"); // always active
        }
        frameId.current = requestAnimationFrame(animateAngle);
      }
      frameId.current = requestAnimationFrame(animateAngle);
      return () => {
        running = false;
        if (frameId.current) cancelAnimationFrame(frameId.current);
      };
    }, [speed]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            "!block" // always visible
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0", // will animate!
              "--active": "1", // always active!
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                      from 236.84deg at 50% 50%,
                      var(--black),
                      var(--black) calc(25% / var(--repeating-conic-gradient-times))
                    )`
                  : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
                     radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
                     radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%),
                     radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
                     repeating-conic-gradient(
                       from 236.84deg at 50% 50%,
                       #dd7bbb 0%,
                       #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                       #5a922c calc(50% / var(--repeating-conic-gradient-times)),
                       #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                       #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
                    )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            "!block"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffectInfinite.displayName = "GlowingEffectInfinite";

export { GlowingEffectInfinite };