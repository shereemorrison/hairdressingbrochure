"use client"

import React, { useEffect, useRef } from 'react';

interface VantaBirdsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const VantaBirdsBackground: React.FC<VantaBirdsBackgroundProps> = ({
  children,
  className = "",
  style = {}
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // Clean up previous effect
    if (vantaEffect.current) {
      vantaEffect.current.destroy();
    }

    // Initialize Vanta (scripts already loaded from HTML head)
    if (vantaRef.current && (window as any).VANTA) {
      vantaEffect.current = (window as any).VANTA.BIRDS({
        el: vantaRef.current,
        THREE: (window as any).THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x000000,
        backgroundAlpha: 1.0,
        color1: 0x72600d,
        color2: 0x5c1c0e,
        colorMode: 'lerpGradient',
        birdSize: 1.2,
        wingSpan: 12,
        speedLimit: 6,
        separation: 22,
        alignment: 22,
        cohesion: 22,
        quantity: 5
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className={`vanta-background ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000',
        zIndex: 0,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default VantaBirdsBackground;