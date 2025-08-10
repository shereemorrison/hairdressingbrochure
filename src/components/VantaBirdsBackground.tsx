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

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        // Load Three.js first
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!(window as any).THREE) {
          console.error('THREE.js failed to load');
          return;
        }

        // Load Vanta Birds
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js');
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!(window as any).VANTA || !(window as any).VANTA.BIRDS) {
          console.error('VANTA.BIRDS failed to load');
          return;
        }

        // Initialize the effect
        if (vantaRef.current) {
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
            birdSize: 1.2, // Slightly larger for better visibility
            wingSpan: 12,
            speedLimit: 6,
            separation: 22,
            alignment: 22,
            cohesion: 22,
            quantity: 5
          });
        }
      } catch (error) {
        console.error('Error loading Vanta Birds:', error);
      }
    };

    initVanta();

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
        background: '#000000', // Pure black fallback
        zIndex: 0,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default VantaBirdsBackground;