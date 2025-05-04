import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// SVG calming nature images as React components
const SunriseImage = () => (
  <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-xl">
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff9e7d" />
        <stop offset="40%" stopColor="#ffca99" />
        <stop offset="100%" stopColor="#a5d8ff" />
      </linearGradient>
      <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#fffce8" />
        <stop offset="100%" stopColor="#ffbc5e" />
      </radialGradient>
    </defs>
    <rect width="800" height="400" fill="url(#skyGradient)" />
    <circle cx="400" cy="320" r="80" fill="url(#sunGradient)" />
    <path d="M0 280 Q 200 260, 400 280 Q 600 300, 800 280 L 800 400 L 0 400 Z" fill="#3e885b" />
    <path d="M0 300 Q 200 320, 400 300 Q 600 280, 800 300 L 800 400 L 0 400 Z" fill="#224d34" />
    {/* Trees */}
    <g transform="translate(150, 260) scale(0.8)">
      <path d="M0,0 L30,0 L15,-50 Z" fill="#1a3a28" />
      <path d="M5,-30 L25,-30 L15,-80 Z" fill="#1a3a28" />
      <rect x="12" y="0" width="6" height="20" fill="#6b4226" />
    </g>
    <g transform="translate(650, 270) scale(0.7)">
      <path d="M0,0 L30,0 L15,-50 Z" fill="#1a3a28" />
      <path d="M5,-30 L25,-30 L15,-80 Z" fill="#1a3a28" />
      <rect x="12" y="0" width="6" height="20" fill="#6b4226" />
    </g>
    {/* Birds */}
    <path d="M 350,120 Q 360,110 370,120 Q 380,110 390,120" stroke="#333" fill="none" strokeWidth="2" />
    <path d="M 500,150 Q 510,140 520,150 Q 530,140 540,150" stroke="#333" fill="none" strokeWidth="2" />
  </svg>
);

const SeascapeImage = () => (
  <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-xl">
    <defs>
      <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87ceeb" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
      <linearGradient id="sandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f0e6d2" />
        <stop offset="100%" stopColor="#d9c6a5" />
      </linearGradient>
    </defs>
    <rect width="800" height="400" fill="url(#seaGradient)" />
    <circle cx="650" cy="80" r="40" fill="#fff" opacity="0.8" />
    
    {/* Clouds */}
    <g opacity="0.9">
      <ellipse cx="200" cy="100" rx="60" ry="30" fill="white" />
      <ellipse cx="250" cy="90" rx="70" ry="40" fill="white" />
      <ellipse cx="300" cy="110" rx="50" ry="25" fill="white" />
    </g>
    
    {/* Waves */}
    <path d="M0 280 Q 100 260, 200 280 Q 300 300, 400 280 Q 500 260, 600 280 Q 700 300, 800 280 L 800 400 L 0 400 Z" fill="#3498db" opacity="0.6" />
    <path d="M0 300 Q 100 280, 200 300 Q 300 320, 400 300 Q 500 280, 600 300 Q 700 320, 800 300 L 800 400 L 0 400 Z" fill="#2980b9" opacity="0.7" />
    <path d="M0 330 Q 100 310, 200 330 Q 300 350, 400 330 Q 500 310, 600 330 Q 700 350, 800 330 L 800 400 L 0 400 Z" fill="#1e3a8a" opacity="0.8" />
    
    {/* Beach */}
    <path d="M0 360 L 800 380 L 800 400 L 0 400 Z" fill="url(#sandGradient)" />
    
    {/* Palm tree */}
    <g transform="translate(150, 360) scale(0.8)">
      <path d="M0,0 C10,-40 20,-80 30,-40 C40,-90 50,-100 60,-40 L30,0 Z" fill="#2ecc71" />
      <rect x="27" y="0" width="6" height="40" fill="#795548" />
    </g>
    
    {/* Seagulls */}
    <path d="M 350,120 Q 360,110 370,120 Q 380,110 390,120" stroke="#333" fill="none" strokeWidth="2" />
    <path d="M 500,100 Q 510,90 520,100 Q 530,90 540,100" stroke="#333" fill="none" strokeWidth="2" />
  </svg>
);

const MountainLakeImage = () => (
  <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-xl">
    <defs>
      <linearGradient id="skyGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#b5d8f7" />
        <stop offset="100%" stopColor="#d4f0ff" />
      </linearGradient>
      <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6c6c6c" />
        <stop offset="100%" stopColor="#2d2d2d" />
      </linearGradient>
      <linearGradient id="lakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#88bae8" />
        <stop offset="100%" stopColor="#3e7cb8" />
      </linearGradient>
    </defs>
    <rect width="800" height="400" fill="url(#skyGradient2)" />
    
    {/* Mountains */}
    <path d="M0 150 L 200 50 L 300 120 L 500 30 L 650 100 L 800 70 L 800 300 L 0 300 Z" fill="url(#mountainGradient)" />
    <path d="M200 50 L 230 80 L 170 80 Z" fill="white" />
    <path d="M500 30 L 530 60 L 470 60 Z" fill="white" />
    
    {/* Lake */}
    <path d="M0 300 C 200 280, 600 320, 800 300 L 800 400 L 0 400 Z" fill="url(#lakeGradient)" />
    
    {/* Lake reflections */}
    <path d="M200 300 L 230 350 L 170 350 Z" fill="white" opacity="0.1" />
    <path d="M500 300 L 530 360 L 470 360 Z" fill="white" opacity="0.1" />
    
    {/* Trees on shore */}
    <g transform="translate(100, 300) scale(0.5)">
      <path d="M0,0 C 10,-20 20,-40 30,-20 C 40,-50 50,-60 60,-20 L30,0 Z" fill="#2d4d3a" />
      <rect x="27" y="0" width="6" height="20" fill="#5d4037" />
    </g>
    <g transform="translate(700, 300) scale(0.5)">
      <path d="M0,0 C 10,-20 20,-40 30,-20 C 40,-50 50,-60 60,-20 L30,0 Z" fill="#2d4d3a" />
      <rect x="27" y="0" width="6" height="20" fill="#5d4037" />
    </g>
    
    {/* Clouds */}
    <g opacity="0.7">
      <ellipse cx="150" cy="80" rx="50" ry="20" fill="white" />
      <ellipse cx="650" cy="100" rx="60" ry="25" fill="white" />
    </g>
    
    {/* Birds */}
    <path d="M 250,120 Q 260,110 270,120 Q 280,110 290,120" stroke="#333" fill="none" strokeWidth="1.5" />
    <path d="M 400,100 Q 410,90 420,100 Q 430,90 440,100" stroke="#333" fill="none" strokeWidth="1.5" />
  </svg>
);

const ForestPathImage = () => (
  <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-xl">
    <defs>
      <linearGradient id="forestSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a8d8ea" />
        <stop offset="100%" stopColor="#d5f3fe" />
      </linearGradient>
      <radialGradient id="sunlightGradient" cx="50%" cy="0%" r="80%" fx="50%" fy="0%">
        <stop offset="0%" stopColor="rgba(255, 255, 220, 0.4)" />
        <stop offset="100%" stopColor="rgba(255, 255, 220, 0)" />
      </radialGradient>
    </defs>
    <rect width="800" height="400" fill="url(#forestSkyGradient)" />
    <rect width="800" height="400" fill="url(#sunlightGradient)" />
    
    {/* Forest background */}
    <rect x="0" y="100" width="800" height="300" fill="#1a3a1a" />
    
    {/* Path */}
    <path d="M300 400 C 350 300, 450 250, 500 100 C 550 250, 650 300, 700 400 Z" fill="#d6bc8b" />
    
    {/* Trees left side */}
    <g transform="translate(100, 200) scale(0.7)">
      <path d="M0,0 L60,0 L30,-100 Z" fill="#2d5d2a" />
      <path d="M10,-60 L50,-60 L30,-160 Z" fill="#2d5d2a" />
      <rect x="25" y="0" width="10" height="40" fill="#8b4513" />
    </g>
    <g transform="translate(200, 180) scale(0.8)">
      <path d="M0,0 L60,0 L30,-100 Z" fill="#1e3e1a" />
      <path d="M10,-60 L50,-60 L30,-160 Z" fill="#1e3e1a" />
      <rect x="25" y="0" width="10" height="40" fill="#8b4513" />
    </g>
    
    {/* Trees right side */}
    <g transform="translate(600, 200) scale(0.7)">
      <path d="M0,0 L60,0 L30,-100 Z" fill="#2d5d2a" />
      <path d="M10,-60 L50,-60 L30,-160 Z" fill="#2d5d2a" />
      <rect x="25" y="0" width="10" height="40" fill="#8b4513" />
    </g>
    <g transform="translate(700, 180) scale(0.8)">
      <path d="M0,0 L60,0 L30,-100 Z" fill="#1e3e1a" />
      <path d="M10,-60 L50,-60 L30,-160 Z" fill="#1e3e1a" />
      <rect x="25" y="0" width="10" height="40" fill="#8b4513" />
    </g>
    
    {/* Sunlight rays */}
    <path d="M 400,0 L 500,400" stroke="rgba(255, 255, 220, 0.2)" strokeWidth="50" />
    <path d="M 500,0 L 400,400" stroke="rgba(255, 255, 220, 0.15)" strokeWidth="40" />
    
    {/* Small plants along path */}
    <circle cx="380" cy="350" r="10" fill="#4caf50" />
    <circle cx="420" cy="320" r="8" fill="#388e3c" />
    <circle cx="460" cy="340" r="9" fill="#4caf50" />
    <circle cx="500" cy="300" r="7" fill="#388e3c" />
    <circle cx="540" cy="330" r="10" fill="#4caf50" />
  </svg>
);

interface WelcomeCarouselProps {
  onComplete?: () => void;
}

const WelcomeCarousel = ({ onComplete }: WelcomeCarouselProps) => {
  useEffect(() => {
    // Trigger onComplete after a certain time if needed
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 6000); // 6 seconds (2 seconds per slide with 3 slides)

    return () => clearTimeout(timer);
  }, [onComplete]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    fade: true,
    arrows: false,
  };

  return (
    <div className="welcome-carousel-container mb-6">
      <Slider {...settings}>
        <div className="h-64 md:h-80 outline-none">
          <SunriseImage />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg bg-black bg-opacity-20 px-4 py-2 rounded">
              Find peace in every sunrise
            </p>
          </div>
        </div>
        <div className="h-64 md:h-80 outline-none">
          <SeascapeImage />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg bg-black bg-opacity-20 px-4 py-2 rounded">
              Let calm wash over you
            </p>
          </div>
        </div>
        <div className="h-64 md:h-80 outline-none">
          <MountainLakeImage />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg bg-black bg-opacity-20 px-4 py-2 rounded">
              Breathe in the mountain air
            </p>
          </div>
        </div>
        <div className="h-64 md:h-80 outline-none">
          <ForestPathImage />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg bg-black bg-opacity-20 px-4 py-2 rounded">
              Walk the path to tranquility
            </p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default WelcomeCarousel;