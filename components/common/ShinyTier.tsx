"use client"

import Image from 'next/image';
import { StaticImageData } from 'next/image';

const ShinyTier = ({ imageSrc }: { imageSrc: StaticImageData }) => {

  return (
    <div>
      <div className="relative w-48 h-48 perspective-1000">
        <div
          className="shiny-silver-container absolute w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px',
            transition: 'transform 0.05s linear'
          }}
        >
          <Image
            src={imageSrc}
            alt="tier"
            width={300}
            height={300}
            className="object-contain rounded-lg shadow-lg z-10 relative"
            style={{
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
      </div>


      <style jsx global>{`
        .shiny-silver-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          animation: shine 5s infinite;
          z-index: 20;
          pointer-events: none;
        }
        
        @keyframes shine {
          0% {
            transform: scale(2) rotate(30deg) translateX(-100%);
          }
          50% {
            transform: scale(2) rotate(30deg) translateX(100%);
          }
          100% {
            transform: scale(2) rotate(30deg) translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ShinyTier;