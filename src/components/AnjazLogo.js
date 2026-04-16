import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle, G } from 'react-native-svg';

// ============================================================
// Anjaz AI — Geometric "A" Logo Component
// Rounded square background with navy gradient
// Letter A: geometric sharp angles, golden gradient stroke
// Diamond gem: cyan at apex
// Dot: cyan at bottom-right foot
// ============================================================

const AnjazLogo = ({ size = 56, borderRadius }) => {
  const br = borderRadius !== undefined ? borderRadius : Math.round(size * 0.286);
  const scale = size / 56;

  return (
    <Svg width={size} height={size} viewBox="0 0 56 56">
      <Defs>
        <LinearGradient id="navyGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#0D1B3E" />
          <Stop offset="1" stopColor="#243B6E" />
        </LinearGradient>
        <LinearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F5A623" />
          <Stop offset="1" stopColor="#D4891A" />
        </LinearGradient>
        <LinearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#00C2FF" />
          <Stop offset="1" stopColor="#0096CC" />
        </LinearGradient>
      </Defs>

      {/* Background rounded square */}
      <Rect
        x="0"
        y="0"
        width="56"
        height="56"
        rx={br}
        ry={br}
        fill="url(#navyGrad)"
      />

      {/* Subtle inner glow */}
      <Rect
        x="1"
        y="1"
        width="54"
        height="27"
        rx={br - 1}
        ry={br - 1}
        fill="rgba(0,194,255,0.06)"
      />

      {/* Letter A — geometric sharp angles with gold stroke */}
      {/* Left leg */}
      <Path
        d="M14 44 L28 12 L42 44"
        stroke="url(#goldGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Crossbar */}
      <Path
        d="M19.5 33 L36.5 33"
        stroke="url(#goldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Diamond gem (cyan) at apex */}
      <G transform="translate(28, 10)">
        <Path
          d="M0 -5 L3 0 L0 5 L-3 0 Z"
          fill="url(#cyanGrad)"
        />
      </G>

      {/* Cyan dot at bottom-right foot */}
      <Circle cx="42" cy="44" r="2.5" fill="#00C2FF" />
    </Svg>
  );
};

export default AnjazLogo;
