"use client";
import React, { useEffect, useRef, useState } from 'react';
import { animate, createScope, createSpring, createDraggable } from 'animejs';
import ConnectionsCard from './ConnectionsCard';
const LOGO_URL = "https://cdn.hv6.dev/images/logos/lighting_thunderbolt_red.jpg_circular.png?height=100&width=100";

const LogoAnimation: React.FC = () => {
  const root = useRef<HTMLDivElement | null>(null);
  const scope = useRef<any>(null);
  const [rotations, setRotations] = useState(0);
  const [showConnections, setShowConnections] = useState(false);

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
    setShowConnections(true);
  };

  return (
    <>
      <div ref={root}>
        <img
          src={LOGO_URL}
          className="logo"
          alt="Logo"
          style={{ height: "50px", width: "50px" }}
          onClick={handleClick}
        />
      </div>
      <ConnectionsCard 
        isOpen={showConnections} 
        onClose={() => setShowConnections(false)} 
      />
    </>
  );
};

export default LogoAnimation;