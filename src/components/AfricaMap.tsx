"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  left: `${5 + ((index * 19) % 90)}%`,
  top: `${8 + ((index * 29) % 82)}%`,
  delay: (index % 9) * 0.28,
  scale: 0.7 + (index % 4) * 0.24
}));

function AwardTrophy() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
      className="absolute bottom-8 right-2 z-20 w-[34%] min-w-[132px] max-w-[210px] drop-shadow-[0_0_36px_rgba(217,164,65,0.68)] sm:right-6"
      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg aria-label="Gold award trophy" role="img" viewBox="0 0 210 250">
        <defs>
          <linearGradient id="trophyGold" x1="32" x2="178" y1="20" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff9dc" />
            <stop offset="0.24" stopColor="#f6d47a" />
            <stop offset="0.56" stopColor="#d9a441" />
            <stop offset="1" stopColor="#7f5317" />
          </linearGradient>
          <filter id="trophyGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M55 45H22c0 51 22 73 54 79" fill="none" stroke="url(#trophyGold)" strokeWidth="16" />
        <path d="M155 45h33c0 51-22 73-54 79" fill="none" stroke="url(#trophyGold)" strokeWidth="16" />
        <path
          d="M54 30h102v48c0 38-20 66-51 66S54 116 54 78V30Z"
          fill="url(#trophyGold)"
          filter="url(#trophyGlow)"
        />
        <path d="M82 144h46v46H82z" fill="url(#trophyGold)" />
        <path d="M58 190h94l19 33H39l19-33Z" fill="url(#trophyGold)" />
        <path d="M70 51h70" stroke="#fff8e6" strokeLinecap="round" strokeWidth="5" opacity="0.62" />
        <path d="M81 207h48" stroke="#fff8e6" strokeLinecap="round" strokeWidth="4" opacity="0.45" />
      </svg>
    </motion.div>
  );
}

export function AfricaMap() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px] overflow-visible">
      <motion.div
        animate={{ opacity: [0.25, 0.62, 0.25], scale: [0.95, 1.08, 0.95] }}
        className="absolute inset-0 rounded-full bg-gold-radial blur-3xl"
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ x: ["-18%", "18%", "-18%"], opacity: [0.1, 0.34, 0.1] }}
        className="absolute left-1/2 top-8 h-[82%] w-24 -translate-x-1/2 rotate-12 bg-gradient-to-b from-transparent via-champagne/40 to-transparent blur-2xl"
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {particles.map((particle) => (
        <motion.span
          animate={{ opacity: [0.15, 0.95, 0.18], y: [0, -24, 0], scale: [particle.scale, particle.scale * 1.45, particle.scale] }}
          className="particle"
          key={particle.id}
          style={{ left: particle.left, top: particle.top }}
          transition={{ duration: 4.8, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        animate={{ rotate: 360 }}
        className="absolute inset-[1%] z-10 drop-shadow-[0_0_54px_rgba(217,164,65,0.68)]"
        transition={{ duration: 58, ease: "linear", repeat: Infinity }}
      >
        <svg aria-label="Rotating metallic gold Africa map with glowing Middle Belt highlight" role="img" viewBox="0 0 560 560">
          <defs>
            <linearGradient id="africaGold" x1="130" x2="410" y1="35" y2="505" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff9dc" />
              <stop offset="0.18" stopColor="#f7df95" />
              <stop offset="0.42" stopColor="#d9a441" />
              <stop offset="0.72" stopColor="#a87525" />
              <stop offset="1" stopColor="#5d380d" />
            </linearGradient>
            <radialGradient id="mapSheen" cx="35%" cy="22%" r="68%">
              <stop stopColor="#fff8e6" stopOpacity="0.82" />
              <stop offset="0.32" stopColor="#f6d681" stopOpacity="0.34" />
              <stop offset="1" stopColor="#1d1204" stopOpacity="0.12" />
            </radialGradient>
            <filter id="softGlow" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="beltGlow" x="-45%" y="-45%" width="190%" height="190%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feColorMatrix values="1 0 0 0 0.96 0 1 0 0 0.68 0 0 1 0 0.18 0 0 0 1 0" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M271 29c-34 2-64 15-85 38-21 22-30 52-46 78-15 24-42 39-51 69-7 25 10 48 30 61 15 10 31 16 38 34 8 21-2 46 13 63 14 18 39 15 57 28 25 18 26 61 52 78 18 12 43 5 55-14 17-26 11-64 22-91 12-29 46-39 66-62 21-24 14-56-4-79-16-20-38-33-49-57-12-28-3-63-22-91-18-28-44-56-76-55Z"
            fill="#4e300a"
            opacity="0.35"
            transform="translate(14 18)"
          />
          <path
            d="M270 38c-37 3-68 19-91 45-22 25-31 59-49 87-16 25-43 42-52 72-8 28 8 54 32 70 17 11 35 17 43 36 9 23-3 51 14 70 16 19 43 15 63 30 28 20 28 68 57 87 21 14 48 5 62-17 19-30 12-71 25-101 14-32 52-43 74-69 23-27 15-62-5-88-18-23-43-37-55-64-14-31-4-70-25-101-21-31-55-60-93-57Z"
            fill="url(#africaGold)"
            filter="url(#softGlow)"
          />
          <path
            d="M270 38c-37 3-68 19-91 45-22 25-31 59-49 87-16 25-43 42-52 72-8 28 8 54 32 70 17 11 35 17 43 36 9 23-3 51 14 70 16 19 43 15 63 30 28 20 28 68 57 87 21 14 48 5 62-17 19-30 12-71 25-101 14-32 52-43 74-69 23-27 15-62-5-88-18-23-43-37-55-64-14-31-4-70-25-101-21-31-55-60-93-57Z"
            fill="url(#mapSheen)"
            opacity="0.62"
          />
          <path d="M211 89c-22 19-34 47-49 76-10 21-29 39-47 58" fill="none" stroke="#fff8e6" strokeLinecap="round" strokeWidth="4" opacity="0.28" />
          <path d="M344 102c9 29 20 53 45 78 27 27 39 54 27 85" fill="none" stroke="#563609" strokeLinecap="round" strokeWidth="10" opacity="0.22" />
          <path d="M242 270c25 4 53 2 83 9" fill="none" stroke="#fff8e6" strokeLinecap="round" strokeWidth="3" opacity="0.34" />
          <motion.path
            animate={{ pathLength: [0.55, 1, 0.55], opacity: [0.72, 1, 0.72] }}
            d="M72 256C148 225 225 216 303 229c65 11 119 39 181 68"
            fill="none"
            filter="url(#beltGlow)"
            stroke="#fff2a8"
            strokeLinecap="round"
            strokeWidth="34"
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M72 256C148 225 225 216 303 229c65 11 119 39 181 68" fill="none" stroke="#d9a441" strokeLinecap="round" strokeWidth="17" />
          <path d="M82 257C154 235 225 228 301 239c62 9 114 34 173 61" fill="none" stroke="#fff8e6" strokeLinecap="round" strokeWidth="3" opacity="0.75" />
          <path d="M110 275C177 257 235 252 298 262" fill="none" stroke="#8f6422" strokeLinecap="round" strokeWidth="4" opacity="0.46" />
        </svg>
      </motion.div>
      <AwardTrophy />
      <div className="absolute bottom-10 left-8 z-20 hidden border border-aureate/30 bg-obsidian/58 px-4 py-3 backdrop-blur md:block">
        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-aureate">Middle Belt</p>
        <p className="mt-1 text-xs text-champagne/72">Glowing regional honor line</p>
      </div>
    </div>
  );
}
