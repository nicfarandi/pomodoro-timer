import React from 'react';
import Svg, { Circle, Ellipse, Path, Line, G } from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';
const EG = '#6DB665';
const EP = '#1A1A1A';
const N = '#E8849C';

export default function CatWaking() {
  return (
    <Svg width={260} height={270} viewBox="0 0 260 270">
      {/* Stretched body (butt up, chest down) */}
      {/* Hind area raised */}
      <Ellipse cx={170} cy={165} rx={68} ry={50} fill={O} />
      <Ellipse cx={85} cy={200} rx={58} ry={38} fill={O} />

      {/* Belly visible */}
      <Ellipse cx={128} cy={195} rx={38} ry={28} fill={C} />

      {/* Body stripe */}
      <Path d="M 130 160 Q 148 150 166 160" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />

      {/* Tail up */}
      <Path d="M 225 160 Q 248 130 238 90 Q 232 65 245 45" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />
      <Path d="M 225 160 Q 248 130 238 90 Q 232 65 245 45" stroke={D} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4} />

      {/* Back legs / haunches */}
      <Ellipse cx={168} cy={208} rx={32} ry={20} fill={O} />

      {/* Front paws stretched forward */}
      <Ellipse cx={35} cy={222} rx={28} ry={13} fill={O} />
      <Ellipse cx={82} cy={230} rx={28} ry={13} fill={O} />

      {/* Paw toes */}
      <Path d="M 18 222 Q 24 228 30 224 Q 36 228 42 224 Q 48 228 52 222" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />
      <Path d="M 65 230 Q 71 236 77 232 Q 83 236 89 232 Q 95 236 99 230" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />

      {/* Head tilted down (stretching) */}
      <G transform="rotate(-15, 100, 120)">
        <Circle cx={100} cy={118} r={62} fill={O} />

        {/* Left ear */}
        <Path d="M 53 82 L 32 42 L 68 86 Z" fill={O} />
        <Path d="M 54 81 L 38 50 L 66 84 Z" fill={P} />

        {/* Right ear */}
        <Path d="M 138 80 L 155 40 L 132 88 Z" fill={O} />
        <Path d="M 138 79 L 152 48 L 133 86 Z" fill={P} />

        {/* Forehead stripe */}
        <Path d="M 86 58 Q 100 52 114 58" stroke={D} strokeWidth={2.5} fill="none" opacity={0.7} />

        {/* Half-open eyes — sleepy */}
        <Ellipse cx={82} cy={112} rx={13} ry={9} fill={EG} />
        <Circle cx={84} cy={113} r={6} fill={EP} />
        <Circle cx={81} cy={109} r={2.5} fill="white" />
        {/* Droopy eyelid */}
        <Path d="M 68 107 Q 82 103 96 107" stroke={EP} strokeWidth={2.5} fill="none" />

        <Ellipse cx={118} cy={112} rx={13} ry={9} fill={EG} />
        <Circle cx={120} cy={113} r={6} fill={EP} />
        <Circle cx={117} cy={109} r={2.5} fill="white" />
        <Path d="M 104 107 Q 118 103 132 107" stroke={EP} strokeWidth={2.5} fill="none" />

        {/* Open yawning mouth */}
        <Path d="M 96 130 Q 100 140 104 130" stroke={EP} strokeWidth={2} fill={P} />
        <Ellipse cx={100} cy={134} rx={8} ry={6} fill={P} />

        {/* Nose */}
        <Path d="M 96 122 L 104 122 L 100 128 Z" fill={N} />

        {/* Whiskers */}
        <Line x1={30} y1={108} x2={80} y2={114} stroke={D} strokeWidth={1.2} opacity={0.5} />
        <Line x1={28} y1={118} x2={80} y2={118} stroke={D} strokeWidth={1.2} opacity={0.5} />
        <Line x1={120} y1={114} x2={170} y2={108} stroke={D} strokeWidth={1.2} opacity={0.5} />
        <Line x1={120} y1={118} x2={172} y2={118} stroke={D} strokeWidth={1.2} opacity={0.5} />

        {/* Cheek */}
        <Circle cx={64} cy={122} r={5} fill={P} opacity={0.55} />
        <Circle cx={136} cy={122} r={5} fill={P} opacity={0.55} />
      </G>
    </Svg>
  );
}
