import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { IllustrationState } from '../types/calculator';

// Pixel-space centers of every keypad button, used to anchor the tap "ripple" effect.
const KEY_POSITIONS: Record<string, { x: number; y: number }> = {
  '7': { x: 216, y: 230 }, '8': { x: 252, y: 230 }, '9': { x: 288, y: 230 }, '-': { x: 324, y: 230 },
  '4': { x: 216, y: 268 }, '5': { x: 252, y: 268 }, '6': { x: 288, y: 268 }, '%': { x: 324, y: 268 },
  '1': { x: 216, y: 306 }, '2': { x: 252, y: 306 }, '3': { x: 288, y: 306 }, '*': { x: 324, y: 306 },
  '0': { x: 216, y: 344 }, '.': { x: 252, y: 344 }, '=': { x: 288, y: 344 }, '+': { x: 324, y: 344 },
};

interface CalculatorIllustrationProps {
  state: IllustrationState;
  activeValue?: string | number;
  resultValue?: string | number;
  isRolling?: boolean;
  onKeypadPress?: (key: string) => void;
  className?: string;
}

export const CalculatorIllustration: React.FC<CalculatorIllustrationProps> = ({
  state,
  activeValue = '8.65',
  resultValue = '80.00%',
  isRolling = false,
  onKeypadPress,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ id: number; key: string }[]>([]);
  const rippleIdRef = useRef(0);

  // Mouse parallax handler (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Trigger celebration confetti when result is finalized
  useEffect(() => {
    if (state === 'success' && !shouldReduceMotion) {
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.65, x: 0.5 },
          colors: ['#2563eb', '#38bdf8', '#4ade80', '#fb7185', '#a855f7'],
          disableForReducedMotion: true,
          ticks: 120,
        });
      } catch (err) {
        // Fallback gracefully if canvas is unavailable
      }
    }
  }, [state, shouldReduceMotion]);

  const handleKeyClick = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 180);

    // Fire a little "material" ripple + haptic-style ping from the tapped key.
    if (!shouldReduceMotion) {
      const id = rippleIdRef.current++;
      setRipples(prev => [...prev, { id, key }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 550);
    }

    if (onKeypadPress) {
      onKeypadPress(key);
    }
  };

  // LCD Screen text determination
  const getScreenText = () => {
    if (state === 'calculating') return 'CALC...';
    if (activeValue !== undefined && activeValue !== null && String(activeValue).trim().length > 0) {
      return `${activeValue}`;
    }
    return '0.00';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-lg mx-auto aspect-4/3 sm:aspect-square select-none flex items-center justify-center p-2 sm:p-4 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Background Soft Glow — slow "breathing" pulse */}
      <motion.div
        className="absolute inset-2 sm:inset-6 rounded-full bg-gradient-to-tr from-blue-100/60 via-indigo-50/50 to-sky-100/50 blur-2xl pointer-events-none -z-10"
        animate={shouldReduceMotion ? {} : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Math Symbols */}
      {[
        { char: '+', top: '10%', left: '6%', color: 'text-blue-500', size: 'text-2xl', delay: 0 },
        { char: '−', top: '24%', right: '8%', color: 'text-indigo-500', size: 'text-xl', delay: 0.4 },
        { char: '×', top: '65%', left: '4%', color: 'text-sky-500', size: 'text-2xl', delay: 0.8 },
        { char: '%', top: '12%', right: '22%', color: 'text-rose-400', size: 'text-xl', delay: 0.6 },
        { char: '=', top: '72%', right: '8%', color: 'text-emerald-500', size: 'text-xl', delay: 1.0 },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute font-black select-none pointer-events-none font-mono ${item.color} ${item.size} drop-shadow-xs opacity-60 hidden sm:block`}
          style={{ top: item.top, left: item.left, right: item.right }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -8, 0],
                  x: mousePos.x * (0.2 + idx * 0.05),
                }
          }
          transition={{
            duration: 3 + idx * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
        >
          {item.char}
        </motion.div>
      ))}

      {/* Main SVG 3D Scene */}
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : {
                opacity: 1,
                scale: 1,
                x: mousePos.x * 0.35,
                y: mousePos.y * 0.35,
              }
        }
        transition={{ type: 'spring', damping: 22, stiffness: 130 }}
      >
        <svg
          viewBox="0 0 540 460"
          className="w-full h-full max-h-[380px] sm:max-h-[440px] drop-shadow-xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Gradients */}
            <linearGradient id="calcBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="45%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="calcBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#182030" />
              <stop offset="100%" stopColor="#0d131f" />
            </linearGradient>

            {/* Male Student Uniform Gradients */}
            <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e6f5e" />
              <stop offset="100%" stopColor="#1c483d" />
            </linearGradient>

            <linearGradient id="tieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Anime Girl Outfit Gradients */}
            <linearGradient id="girlTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="girlSkirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="girlBootGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#44342b" />
              <stop offset="100%" stopColor="#231a15" />
            </linearGradient>

            <linearGradient id="skinMale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffdfcb" />
              <stop offset="100%" stopColor="#f7c5a8" />
            </linearGradient>

            <linearGradient id="skinFemale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffe4d6" />
              <stop offset="100%" stopColor="#f8cbba" />
            </linearGradient>

            <linearGradient id="hairMale" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#634832" />
              <stop offset="100%" stopColor="#382618" />
            </linearGradient>

            <linearGradient id="hairFemale" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f2b23" />
              <stop offset="100%" stopColor="#1c120c" />
            </linearGradient>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="motionBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="1.5 0" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="calcShadow" x="-15%" y="-10%" width="130%" height="135%">
              <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#1e3a8a" floodOpacity="0.22" />
            </filter>

            {/* Diagonal glass "shimmer" band that sweeps across the calculator body */}
            <linearGradient id="shimmerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="calcBodyClip">
              <rect x="180" y="110" width="180" height="300" rx="30" />
            </clipPath>

            {/* Blink cycle for both characters — desynced via animation-delay */}
            {!shouldReduceMotion && (
              <style>
                {`
                  @keyframes blinkAnim {
                    0%, 90%, 100% { transform: scaleY(0.05); }
                    94% { transform: scaleY(1); }
                  }
                  .eyelid {
                    transform-box: fill-box;
                    transform-origin: 50% 50%;
                    animation: blinkAnim 5.4s ease-in-out infinite;
                  }
                  .eyelid-delay { animation-delay: 1.9s; }
                `}
              </style>
            )}
          </defs>

          {/* BASE GROUND SHADOWS */}
          <ellipse cx="270" cy="442" rx="170" ry="14" fill="#cbd5e1" opacity="0.45" />
          <ellipse cx="270" cy="438" rx="100" ry="12" fill="#94a3b8" opacity="0.35" />
          <ellipse cx="115" cy="436" rx="40" ry="8" fill="#cbd5e1" opacity="0.4" className="hidden sm:inline" />
          <ellipse cx="420" cy="436" rx="38" ry="8" fill="#cbd5e1" opacity="0.4" className="hidden sm:inline" />

          {/* ========================================================================= */}
          {/* 1. LEFT SIDE: ANIME MALE STUDENT (UNIFORM WITH BLAZER & RED TIE) */}
          {/* Responsive: Hidden on small mobile to keep calculator as the focal point */}
          {/* ========================================================================= */}
          <motion.g
            id="anime-male-student"
            className="hidden sm:inline transition-opacity duration-300"
            style={{ transformOrigin: '116px 428px' }}
            animate={shouldReduceMotion ? {} : { y: [0, -5, 0], rotate: [0, -0.7, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Trousers */}
            <path d="M102 245 L94 425 L112 425 L118 280 L124 425 L140 425 L132 245 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
            {/* Shoes */}
            <ellipse cx="98" cy="428" rx="14" ry="7" fill="#451a03" />
            <ellipse cx="134" cy="428" rx="14" ry="7" fill="#451a03" />

            {/* Blazer Jacket & Shirt */}
            <path
              d="M92 145 C82 170 82 230 84 250 L148 250 C150 230 150 170 140 145 Z"
              fill="url(#blazerGrad)"
            />
            {/* White Shirt Collar & V-neck */}
            <polygon points="106,145 116,195 126,145" fill="#f8fafc" />
            {/* Red Striped School Tie */}
            <polygon points="113,155 119,155 121,215 116,225 111,215" fill="url(#tieGrad)" />
            <line x1="113" y1="170" x2="119" y2="175" stroke="#fecaca" strokeWidth="1.5" />
            <line x1="112" y1="188" x2="120" y2="193" stroke="#fecaca" strokeWidth="1.5" />
            <line x1="113" y1="205" x2="119" y2="210" stroke="#fecaca" strokeWidth="1.5" />

            {/* Gold Lapel Badge */}
            <circle cx="102" cy="170" r="2.5" fill="#fbbf24" />

            {/* Left Arm / Hand placed respectfully over chest */}
            <path d="M136 155 Q145 185 130 205 Q120 205 118 190" stroke="url(#blazerGrad)" strokeWidth="11" strokeLinecap="round" fill="none" />
            <circle cx="120" cy="188" r="5" fill="url(#skinMale)" />

            {/* Right Arm hanging naturally */}
            <line x1="94" y1="155" x2="88" y2="235" stroke="url(#blazerGrad)" strokeWidth="10" strokeLinecap="round" />
            <circle cx="87" cy="240" r="5" fill="url(#skinMale)" />

            {/* Neck */}
            <rect x="111" y="132" width="10" height="15" rx="3" fill="url(#skinMale)" />

            {/* Head / Anime Face */}
            <ellipse cx="116" cy="116" rx="18" ry="20" fill="url(#skinMale)" />

            {/* Anime Hair with bangs */}
            <path
              d="M96 114 C94 85 138 80 138 114 C134 105 128 92 116 92 C104 92 98 105 96 114 Z"
              fill="url(#hairMale)"
            />
            <path d="M98 108 L104 122 L110 110 L118 124 L124 108 L130 120 L135 110" fill="url(#hairMale)" />

            {/* Eyes & Smile */}
            <ellipse cx="109" cy="116" rx="2.5" ry="3.5" fill="#1e293b" />
            <circle cx="110" cy="115" r="1" fill="#ffffff" />
            <ellipse cx="123" cy="116" rx="2.5" ry="3.5" fill="#1e293b" />
            <circle cx="124" cy="115" r="1" fill="#ffffff" />
            <path d="M106 109 Q110 107 113 109" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M120 109 Q124 107 127 109" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M112 126 Q116 130 120 126" stroke="#991b1b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Blinking eyelid overlay */}
            {!shouldReduceMotion && (
              <rect x="104" y="111.5" width="24" height="9" rx="4" fill="url(#skinMale)" className="eyelid" />
            )}
          </motion.g>


          {/* ========================================================================= */}
          {/* 2. CENTER: THE 3D BLUE SPPU CALCULATOR SIMULATOR */}
          {/* ========================================================================= */}
          <g id="sppu-3d-calculator-card" filter="url(#calcShadow)">
            {/* Main Rounded 3D Calculator Body */}
            <rect
              x="180"
              y="110"
              width="180"
              height="300"
              rx="30"
              fill="url(#calcBodyGrad)"
            />
            {/* Highlight Glass Bevel */}
            <rect
              x="183"
              y="113"
              width="174"
              height="294"
              rx="27"
              stroke="url(#calcBevelGrad)"
              strokeWidth="3.5"
              fill="none"
            />

            {/* Glass "shimmer" sweep travelling diagonally across the whole body */}
            {!shouldReduceMotion && (
              <g clipPath="url(#calcBodyClip)">
                <motion.rect
                  x={-260}
                  y="100"
                  width="90"
                  height="320"
                  fill="url(#shimmerGrad)"
                  transform="skewX(-18)"
                  style={{ mixBlendMode: 'overlay' }}
                  animate={{ x: [-260, 420] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.6, ease: 'easeInOut' }}
                />
              </g>
            )}

            {/* Ambient glow pulsing behind the LCD screen */}
            <motion.rect
              x="194"
              y="128"
              width="152"
              height="76"
              rx="18"
              fill={state === 'success' ? '#22c55e' : '#38bdf8'}
              filter="url(#softGlow)"
              style={{ mixBlendMode: 'screen' }}
              animate={shouldReduceMotion ? { opacity: 0.25 } : { opacity: [0.15, 0.45, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* LCD Screen Container */}
            <rect
              x="198"
              y="132"
              width="144"
              height="68"
              rx="14"
              fill="url(#screenGrad)"
              stroke="#223048"
              strokeWidth="2.5"
            />

            {/* LCD Header Tag */}
            <text
              x="208"
              y="148"
              fill="#64748b"
              fontSize="8"
              fontFamily="system-ui, sans-serif"
              fontWeight="bold"
              letterSpacing="1.2"
            >
              SPPU 2024 CBCS
            </text>

            {/* Live LCD Screen Display Value — flips/fades in on every change */}
            <g className={isRolling ? 'animate-pulse' : ''}>
              <AnimatePresence mode="popLayout">
                <motion.text
                  key={getScreenText()}
                  x="332"
                  y="180"
                  textAnchor="end"
                  fill={state === 'success' ? '#4ade80' : state === 'calculating' ? '#60a5fa' : '#38bdf8'}
                  fontSize="25"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                  letterSpacing="1.5"
                  filter={isRolling ? 'url(#motionBlur)' : 'url(#softGlow)'}
                  className="select-none"
                  style={{ transformOrigin: '332px 180px' }}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.82 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {getScreenText()}
                </motion.text>
              </AnimatePresence>
            </g>

            {/* Sub-label for Percentage when available */}
            {resultValue && (
              <text
                x="332"
                y="194"
                textAnchor="end"
                fill="#94a3b8"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
                letterSpacing="0.8"
              >
                {resultValue}
              </text>
            )}

            {/* ===================================================================== */}
            {/* CALCULATOR KEYPAD: 16 TACTILE BUTTONS (4 ROWS x 4 COLS) */}
            {/* Every button is fully clickable with interactive press feedback */}
            {/* ===================================================================== */}
            
            {/* ROW 1: 7, 8, 9, - */}
            <g id="row-1">
              {[
                { label: '7', x: 200, key: '7' },
                { label: '8', x: 236, key: '8' },
                { label: '9', x: 272, key: '9' },
                { label: '−', x: 308, key: '-' },
              ].map(btn => (
                <g
                  key={btn.key}
                  onClick={() => handleKeyClick(btn.key)}
                  className="cursor-pointer group/btn"
                >
                  <rect
                    x={btn.x}
                    y={pressedKey === btn.key ? 218 : 216}
                    width="32"
                    height="28"
                    rx="8"
                    fill={pressedKey === btn.key ? '#e2e8f0' : '#ffffff'}
                    className="transition-all hover:fill-blue-50"
                  />
                  <text
                    x={btn.x + 16}
                    y={pressedKey === btn.key ? 237 : 235}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {btn.label}
                  </text>
                </g>
              ))}
            </g>

            {/* ROW 2: 4, 5, 6, % */}
            <g id="row-2">
              {[
                { label: '4', x: 200, key: '4' },
                { label: '5', x: 236, key: '5' },
                { label: '6', x: 272, key: '6' },
                { label: '%', x: 308, key: '%' },
              ].map(btn => (
                <g
                  key={btn.key}
                  onClick={() => handleKeyClick(btn.key)}
                  className="cursor-pointer group/btn"
                >
                  <rect
                    x={btn.x}
                    y={pressedKey === btn.key ? 256 : 254}
                    width="32"
                    height="28"
                    rx="8"
                    fill={pressedKey === btn.key ? '#e2e8f0' : '#ffffff'}
                    className="transition-all hover:fill-blue-50"
                  />
                  <text
                    x={btn.x + 16}
                    y={pressedKey === btn.key ? 275 : 273}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize={btn.label === '%' ? '12' : '14'}
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {btn.label}
                  </text>
                </g>
              ))}
            </g>

            {/* ROW 3: 1, 2, 3, × */}
            <g id="row-3">
              {[
                { label: '1', x: 200, key: '1' },
                { label: '2', x: 236, key: '2' },
                { label: '3', x: 272, key: '3' },
                { label: '×', x: 308, key: '*' },
              ].map(btn => (
                <g
                  key={btn.key}
                  onClick={() => handleKeyClick(btn.key)}
                  className="cursor-pointer group/btn"
                >
                  <rect
                    x={btn.x}
                    y={pressedKey === btn.key ? 294 : 292}
                    width="32"
                    height="28"
                    rx="8"
                    fill={pressedKey === btn.key ? '#e2e8f0' : '#ffffff'}
                    className="transition-all hover:fill-blue-50"
                  />
                  <text
                    x={btn.x + 16}
                    y={pressedKey === btn.key ? 313 : 311}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="14"
                    fontWeight="bold"
                    className="select-none pointer-events-none"
                  >
                    {btn.label}
                  </text>
                </g>
              ))}
            </g>

            {/* ROW 4: 0, ., =, + (With Coral Accent "=" Button) */}
            <g id="row-4">
              {/* 0 Button */}
              <g onClick={() => handleKeyClick('0')} className="cursor-pointer group/btn">
                <rect
                  x="200"
                  y={pressedKey === '0' ? 332 : 330}
                  width="32"
                  height="28"
                  rx="8"
                  fill={pressedKey === '0' ? '#e2e8f0' : '#ffffff'}
                  className="transition-all hover:fill-blue-50"
                />
                <text
                  x="216"
                  y={pressedKey === '0' ? 351 : 349}
                  textAnchor="middle"
                  fill="#1e293b"
                  fontSize="14"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  0
                </text>
              </g>

              {/* . Button */}
              <g onClick={() => handleKeyClick('.')} className="cursor-pointer group/btn">
                <rect
                  x="236"
                  y={pressedKey === '.' ? 332 : 330}
                  width="32"
                  height="28"
                  rx="8"
                  fill={pressedKey === '.' ? '#e2e8f0' : '#ffffff'}
                  className="transition-all hover:fill-blue-50"
                />
                <text
                  x="252"
                  y={pressedKey === '.' ? 351 : 349}
                  textAnchor="middle"
                  fill="#1e293b"
                  fontSize="16"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  .
                </text>
              </g>

              {/* "=" Button in Vibrant Coral Accent */}
              <g onClick={() => handleKeyClick('=')} className="cursor-pointer group/btn">
                <rect
                  x="272"
                  y={pressedKey === '=' ? 332 : 330}
                  width="32"
                  height="28"
                  rx="8"
                  fill={pressedKey === '=' ? '#f43f5e' : '#fb7185'}
                  className="transition-all hover:brightness-105"
                />
                <text
                  x="288"
                  y={pressedKey === '=' ? 351 : 349}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="16"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  =
                </text>
              </g>

              {/* + Button */}
              <g onClick={() => handleKeyClick('+')} className="cursor-pointer group/btn">
                <rect
                  x="308"
                  y={pressedKey === '+' ? 332 : 330}
                  width="32"
                  height="28"
                  rx="8"
                  fill={pressedKey === '+' ? '#e2e8f0' : '#ffffff'}
                  className="transition-all hover:fill-blue-50"
                />
                <text
                  x="324"
                  y={pressedKey === '+' ? 351 : 349}
                  textAnchor="middle"
                  fill="#1e293b"
                  fontSize="15"
                  fontWeight="bold"
                  className="select-none pointer-events-none"
                >
                  +
                </text>
              </g>
            </g>

            {/* Tap "ripple" pings — one per active keypress, auto-removed after ~0.5s */}
            <AnimatePresence>
              {ripples.map(r => {
                const pos = KEY_POSITIONS[r.key];
                if (!pos) return null;
                return (
                  <motion.circle
                    key={r.id}
                    cx={pos.x}
                    cy={pos.y}
                    r={3}
                    fill="#60a5fa"
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                    initial={{ opacity: 0.5, scale: 0 }}
                    animate={{ opacity: 0, scale: 6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                );
              })}
            </AnimatePresence>
          </g>

          {/* Ambient twinkling sparkles floating around the whole scene */}
          {!shouldReduceMotion && (
            <g id="ambient-sparkles" className="pointer-events-none">
              {[
                { cx: 270, cy: 58, r: 2.4, color: '#facc15', duration: 2.2, delay: 0 },
                { cx: 66, cy: 260, r: 2, color: '#38bdf8', duration: 2.6, delay: 0.5 },
                { cx: 474, cy: 250, r: 2, color: '#f472b6', duration: 2.4, delay: 1 },
                { cx: 200, cy: 410, r: 1.8, color: '#4ade80', duration: 2.8, delay: 0.3 },
                { cx: 340, cy: 400, r: 1.8, color: '#a855f7', duration: 2.5, delay: 1.3 },
              ].map((s, i) => (
                <motion.circle
                  key={i}
                  cx={s.cx}
                  cy={s.cy}
                  r={s.r}
                  fill={s.color}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
                  transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
                />
              ))}
            </g>
          )}


          {/* ========================================================================= */}
          {/* 3. RIGHT SIDE: ANIME FEMALE STUDENT (COLLEGE CASUAL OUTFIT & BOOTS) */}
          {/* Responsive: Hidden on small mobile to keep calculator as the focal point */}
          {/* ========================================================================= */}
          <motion.g
            id="anime-female-student"
            className="hidden sm:inline transition-opacity duration-300"
            style={{ transformOrigin: '422px 428px' }}
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0], rotate: [0, 0.7, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            {/* Slouch Boots */}
            <path d="M404 360 L398 426 L416 426 L418 360 Z" fill="url(#girlBootGrad)" />
            <path d="M428 360 L426 426 L444 426 L442 360 Z" fill="url(#girlBootGrad)" />
            {/* Boot buckles/straps */}
            <rect x="396" y="380" width="22" height="4" rx="2" fill="#785c49" />
            <rect x="424" y="380" width="22" height="4" rx="2" fill="#785c49" />

            {/* Legs */}
            <rect x="404" y="270" width="12" height="95" rx="5" fill="url(#skinFemale)" />
            <rect x="428" y="270" width="12" height="95" rx="5" fill="url(#skinFemale)" />

            {/* Dark Shorts/Skirt */}
            <path d="M396 235 L448 235 L444 275 L398 275 Z" fill="url(#girlSkirtGrad)" />
            {/* Belt */}
            <rect x="396" y="235" width="52" height="6" rx="2" fill="#0f172a" />
            <rect x="418" y="234" width="8" height="8" rx="2" fill="#facc15" />

            {/* Off-Shoulder White Top */}
            <path
              d="M394 158 C390 190 392 235 398 240 L446 240 C452 235 454 190 450 158 Z"
              fill="url(#girlTopGrad)"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            {/* Off-shoulder bare neckline */}
            <path d="M396 158 Q422 170 448 158" stroke="url(#skinFemale)" strokeWidth="6" strokeLinecap="round" />

            {/* Handbag slung over shoulder */}
            <path d="M410 152 Q382 195 380 260" stroke="#38251a" strokeWidth="2.5" fill="none" />
            <rect x="372" y="250" width="20" height="22" rx="4" fill="#583927" />

            {/* Bare arms */}
            <line x1="394" y1="165" x2="388" y2="230" stroke="url(#skinFemale)" strokeWidth="8" strokeLinecap="round" />
            <line x1="450" y1="165" x2="452" y2="230" stroke="url(#skinFemale)" strokeWidth="8" strokeLinecap="round" />

            {/* Neck */}
            <rect x="417" y="132" width="10" height="18" rx="3" fill="url(#skinFemale)" />

            {/* Head / Face */}
            <ellipse cx="422" cy="116" rx="17" ry="19" fill="url(#skinFemale)" />

            {/* Long Wavy Dark Hair */}
            <path
              d="M402 110 C400 80 444 76 444 110 C444 135 448 190 442 210 C436 185 434 140 434 110 C434 94 410 94 410 110 C410 140 408 185 402 210 C398 190 402 135 402 110 Z"
              fill="url(#hairFemale)"
            />

            {/* Eyes & Smile */}
            <ellipse cx="416" cy="116" rx="2.5" ry="3.5" fill="#1e293b" />
            <circle cx="417" cy="115" r="1" fill="#ffffff" />
            <ellipse cx="429" cy="116" rx="2.5" ry="3.5" fill="#1e293b" />
            <circle cx="430" cy="115" r="1" fill="#ffffff" />
            <path d="M413 109 Q417 107 420 109" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M426 109 Q429 107 433 109" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M419 126 Q423 130 427 126" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Rosy Cheeks */}
            <circle cx="413" cy="122" r="3" fill="#fb7185" opacity="0.3" />
            <circle cx="433" cy="122" r="3" fill="#fb7185" opacity="0.3" />
            {/* Blinking eyelid overlay (desynced from the male character) */}
            {!shouldReduceMotion && (
              <rect x="411" y="111.5" width="24" height="9" rx="4" fill="url(#skinFemale)" className="eyelid eyelid-delay" />
            )}
          </motion.g>

          {/* Celebration Stars on Success */}
          {state === 'success' && (
            <g id="celebration-stars" className="animate-pulse">
              <polygon points="450,90 453,97 460,98 454,103 456,110 450,106 444,110 446,103 440,98 447,97" fill="#facc15" />
              <polygon points="100,85 102,91 108,92 103,96 105,102 100,99 95,102 97,96 92,92 98,91" fill="#38bdf8" />
              <polygon points="270,95 272,100 278,101 273,105 275,110 270,107 265,110 267,105 262,101 268,100" fill="#f43f5e" />
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};