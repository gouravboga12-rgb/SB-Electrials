import { useState, useEffect } from 'react';
import logoImg from '../assets/images/logo.png';

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    // Phase 1: Logo animates in (0 → 600ms)
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 600);

    // Phase 2: Hold for a moment (600ms → 2000ms)
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2000);

    // Phase 3: Fade out and unmount (2000ms → 2700ms)
    const doneTimer = setTimeout(() => {
      onFinish();
    }, 2700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.7s ease-in-out' : 'none',
        pointerEvents: 'none',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.72) translateY(20px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <img
          src={logoImg}
          alt="SB Electricals"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 24px rgba(16,185,129,0.22))',
          }}
        />
        {/* Company Name */}
        <div style={{ textAlign: 'center', lineHeight: 1 }}>
          <div
            style={{
              fontSize: '26px',
              fontWeight: 900,
              letterSpacing: '0.12em',
              color: '#0f172a',
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            S B{' '}
            <span style={{ color: '#059669' }}>ELECTRICALS</span>
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: '#64748b',
              textTransform: 'uppercase',
              marginTop: '5px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Premium Solar Energy Solutions
          </div>
        </div>
      </div>

      {/* Animated progress bar */}
      <div
        style={{
          width: '120px',
          height: '3px',
          borderRadius: '2px',
          background: '#e2e8f0',
          overflow: 'hidden',
          opacity: phase === 'enter' ? 0 : 1,
          transition: 'opacity 0.3s ease 0.3s',
          marginTop: '8px',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #059669, #34d399)',
            width: phase === 'exit' ? '100%' : phase === 'hold' ? '80%' : '0%',
            transition:
              phase === 'hold'
                ? 'width 1.35s ease-in-out'
                : phase === 'exit'
                ? 'width 0.4s ease-in'
                : 'none',
          }}
        />
      </div>
    </div>
  );
}
