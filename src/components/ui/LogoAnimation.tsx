"use client";
import React, { useEffect, useRef, useState } from 'react';
import { animate, createScope, createSpring, createDraggable } from 'animejs';
const LOGO_URL = "https://files.hvin.tech/lighting_logo.png";

const LogoAnimation: React.FC = () => {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);
  const [rotations, setRotations] = useState(0);

  useEffect(() => {
    if (!root.current) return;

    scope.current = createScope({ root }).add((self: any) => {
      
      animate('.logo', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) }
        ],
        loop: true,
        loopDelay: 250,
      });

      createDraggable('.logo', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 })
      });

      self.add('rotateLogo', (i: number) => {
        animate('.logo', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      });
    });

    return () => scope.current && scope.current.revert();
  }, []);

  const handleClick = () => {
    setRotations(prev => {
      const newRotations = prev + 1;
      if (scope.current && scope.current.methods && typeof scope.current.methods.rotateLogo === 'function') {
        scope.current.methods.rotateLogo(newRotations);
      }
      return newRotations;
    });
  };

  return (
    <div ref={root}>
        <img
          src={LOGO_URL}
          className="logo"
          alt="Logo"
          style={{ height: "50px", width: "50px" }}
          onClick={handleClick}
        />
    </div>
  );
};

export default LogoAnimation;