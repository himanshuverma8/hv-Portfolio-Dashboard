"use client"
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const hPath =
  "M 9.7 74.4 L 0 74.4 L 0.7 71.9 Q 1.4 69.4 2.4 66.9 Q 7 55 11.1 42.6 Q 15.2 30.2 21 18.8 Q 23.6 13.7 26.65 9.4 Q 29.7 5.1 33.15 2.55 Q 36.6 0 40.4 0 Q 43.4 0 44.55 1.35 Q 45.7 2.7 45.7 4.7 Q 45.7 6.9 44.8 9.3 Q 43.9 11.7 43 13.4 Q 41.2 17 38.3 21.5 Q 35.4 26 32.2 29.9 Q 31.5 30.8 29.8 32.75 Q 28.1 34.7 26.35 36.7 Q 24.6 38.7 23.6 39.8 Q 26.9 37.4 29.3 36.1 Q 31.7 34.8 33.4 34.3 Q 36.3 33.5 38.2 33.5 Q 43.9 33.5 43.9 38.5 Q 43.9 40.6 42.7 43.5 Q 42.1 45.1 41 47.8 Q 39.9 50.5 38.75 53.55 Q 37.6 56.6 36.85 59.4 Q 36.1 62.2 36.1 64 Q 36.1 65.1 36.45 65.95 Q 36.8 66.8 37.8 66.8 Q 38.5 66.8 39.8 66.1 Q 42.6 64.5 45.05 61.6 Q 47.5 58.7 49.45 55.4 Q 51.4 52.1 52.8 49.4 Q 53.1 48.7 53.5 48.7 Q 54 48.7 54 50.4 Q 54 51.2 53.8 52.25 Q 53.6 53.3 53 54.3 Q 51.6 56.7 49.35 60.2 Q 47.1 63.7 44.3 67.05 Q 41.5 70.4 38.4 72.7 Q 35.3 75 32.2 75 Q 28.8 75 27.55 72.95 Q 26.3 70.9 26.3 68.2 Q 26.3 65.3 27.25 61.45 Q 28.2 57.6 29.65 53.45 Q 31.1 49.3 32.6 45.7 Q 33.1 44.5 33.55 43.1 Q 34 41.7 34 40.6 Q 34 38.6 32.2 38.6 Q 31.5 38.6 30.6 38.85 Q 29.7 39.1 28.5 39.8 Q 26.4 40.8 24.5 42.55 Q 22.6 44.3 21.9 45.2 Q 20.6 46.8 19.4 48.75 Q 18.2 50.7 17.3 52.7 Q 15.3 57 14.15 60.85 Q 13 64.7 12 67.4 Q 11.4 69.1 10.8 70.9 Q 10.2 72.7 9.7 74.4 Z M 20.7 39.1 Q 25.7 33.2 30.85 26.45 Q 36 19.7 39.4 12.7 Q 39.6 12.2 40.3 10.7 Q 41 9.2 41.6 7.35 Q 42.2 5.5 42.2 4.2 Q 42.2 2.5 40.9 2.5 Q 39.6 2.5 37.85 4.3 Q 36.1 6.1 34.3 9.1 Q 32 12.9 29.6 17.85 Q 27.2 22.8 24.95 28.3 Q 22.7 33.8 20.7 39.1 Z";

const vPath =
  "M 5.48 40.9 Q 2.88 40.9 1.28 38.1 Q -0.32 35.3 0.08 30.7 Q 0.28 27.8 1.43 23.35 Q 2.58 18.9 4.38 14.35 Q 6.18 9.8 8.18 6.6 Q 10.78 2.5 14.03 1.3 Q 17.28 0.1 22.18 0.1 Q 22.58 0.1 22.58 0.5 Q 22.58 0.9 21.98 1.5 Q 20.58 2.7 18.68 5.9 Q 16.78 9.1 15.03 12.9 Q 13.28 16.7 11.98 19.9 Q 10.98 22.5 10.13 25.3 Q 9.28 28.1 9.28 30.3 Q 9.28 32.1 10.03 33.2 Q 10.78 34.3 12.68 34.3 Q 14.68 34.2 17.08 31.4 Q 19.48 28.6 21.68 24.5 Q 23.88 20.4 25.28 16.5 Q 25.08 15.4 24.93 14.2 Q 24.78 13 24.78 11.7 Q 24.78 9.9 25.13 7.95 Q 25.48 6 26.18 4.1 Q 27.48 0.8 29.78 0.2 Q 30.18 0.1 30.53 0.05 Q 30.88 0 31.28 0 Q 33.18 0 33.83 1.35 Q 34.48 2.7 34.48 4.5 Q 34.48 6.3 34.08 8.05 Q 33.68 9.8 33.38 10.7 Q 32.68 12.6 31.78 14.35 Q 30.88 16.1 29.98 17.8 Q 30.18 20.9 31.63 22.6 Q 33.08 24.3 35.08 24.3 Q 37.58 24.3 40.08 22.1 Q 41.48 20.9 42.63 19.05 Q 43.78 17.2 44.68 15.6 Q 45.18 14.7 45.38 15.2 Q 45.58 15.7 45.58 16.8 Q 45.58 17.7 45.43 18.75 Q 45.28 19.8 44.88 20.4 Q 43.48 22.9 41.68 24.55 Q 39.88 26.2 37.88 27 Q 36.28 27.6 34.58 27.6 Q 32.28 27.6 30.33 26.25 Q 28.38 24.9 27.28 22.1 Q 25.18 25.2 23.43 27.75 Q 21.68 30.3 20.78 31.4 Q 17.78 35.2 13.93 38.05 Q 10.08 40.9 5.48 40.9 Z";

export default function HvCursiveAnimated(): JSX.Element {
  const hRef = useRef<SVGPathElement>(null);
  const vRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!hRef.current || !vRef.current) return;

    // Path draw animation
    const hLen = hRef.current.getTotalLength();
    const vLen = vRef.current.getTotalLength();

    gsap.set(hRef.current, { strokeDasharray: hLen, strokeDashoffset: hLen });
    gsap.set(vRef.current, { strokeDasharray: vLen, strokeDashoffset: vLen });

    gsap.to(hRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(vRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      delay: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

     gsap.to([hRef.current, vRef.current], {
      stroke: "#7b32fa", 
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });


  }, []);

  return (
    <svg
      width={110}
      height={80}
      viewBox="0 0 110 80"
      style={{ display: "block" }}
    >
      <path
        ref={hRef}
        d={hPath}
        fill="none"
        stroke="#5c10e0"
        strokeWidth={2.2}
        strokeLinecap="round"
        style={{
          transform: "translate(0px, 2px)",
        }}
      />
      <path
        ref={vRef}
        d={vPath}
        fill="none"
        stroke="#5c10e0"
        strokeWidth={2.2}
        strokeLinecap="round"
        style={{
          transform: "translate(58px, 29px)",
        }}
      />
    </svg>
  );
}