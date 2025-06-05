"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate, createScope, createSpring, createDraggable } from "animejs";
interface AnimatedIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ src, ...props }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const scope = useRef<any>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    scope.current = createScope({ root: imgRef }).add((self: any) => {
      // bounce animation loop
      animate(imgRef.current, {
        scale: [
          { to: 1.25, ease: "inOut(3)", duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) }
        ],
        loop: true,
        loopDelay: 250,
      });

      // Make the icon draggable
      createDraggable(imgRef.current, {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 }),
      });
    });
    return () => scope.current && scope.current.revert();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      {...props}
    />
  );
};

export default AnimatedIcon;