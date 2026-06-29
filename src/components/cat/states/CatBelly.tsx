import React from 'react';
import Svg, { Circle, Ellipse, Path, Line, G } from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';
const EG = '#6DB665';
const EP = '#1A1A1A';
const N = '#E8849C';

export default function CatBelly() {
  return (
    <Svg width={270} height={260} viewBox="0 0 270 260">
      {/* Body rolling on back */}
      <Ellipse cx={135} cy={165} rx={100} ry={68} fill={O} transform="rotate(-10, 135, 165)" />

      {/* Full belly exposed */}
      <Ellipse cx={132} cy={168} rx={60} ry={52} fill={C} transform="rotate(-10, 132, 168)" />

      {/* Belly stripes */}
      <Path d="M 90 158 Q 112 148 134 158" stroke={D} strokeWidth={2} fill="none" opacity={0.35} transform="rotate(-10, 135, 165)" />

      {/* Front left paw up */}
      <G transform="rotate(-30, 60, 120)">
        <Path d="M 80 155 Q 58 130 52 105" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />
        <Ellipse cx={52} cy={100} rx={22} ry={14} fill={O} />
        <Path d="M 37 100 Q 43 106 49 102 Q 55 106 61 102 Q 67 106 67 100" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />
      </G>

      {/* Front right paw up */}
      <G transform="rotate(20, 205, 125)">
        <Path d="M 188 152 Q 208 128 215 104" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />
        <Ellipse cx={218} cy={99} rx={22} ry={14} fill={O} />
        <Path d="M 203 99 Q 209 105 215 101 Q 221 105 227 101 Q 233 105 233 99" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />
      </G>

      {/* Back paws sticking up */}
      <Ellipse cx={72} cy={218} rx={24} ry={14} fill={O} transform="rotate(-20, 72, 218)" />
      <Path d="M 78 180 Q 70 198 72 218" stroke={O} strokeWidth={20} fill="none" strokeLinecap="round" />

      <Ellipse cx={198} cy={218} rx={24} ry={14} fill={O} transform="rotate(20, 198, 218)" />
      <Path d="M 192 180 Q 200 198 198 218" stroke={O} strokeWidth={20} fill="none" strokeLinecap="round" />

      {/* Tail curled */}
      <Path d="M 230 155 Q 258 140 252 110 Q 246 85 235 95 Q 225 105 230 128 Q 236 148 220 158 Z" fill={O} />

      {/* Head tilted back showing happy face upside-ish */}
      <G transform="rotate(15, 135, 88)">
        <Circle cx={132} cy={88} r={65} fill={O} />

        {/* Left ear */}
        <Path d="M 82 52 L 58 10 L 96 56 Z" fill={O} />
        <Path d="M 83 51 L 65 18 L 94 54 Z" fill={P} />

        {/* Right ear */}
        <Path d="M 182 52 L 206 10 L 168 56 Z" fill={O} />
        <Path d="M 182 51 L 200 18 L 170 54 Z" fill={P} />

        {/* Happy ≧◡≦ eyes */}
        <Path d="M 102 82 Q 115 96 128 82" stroke={EP} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <Path d="M 136 82 Q 149 96 162 82" stroke={EP} strokeWidth={3.5} fill="none" strokeLinecap="round" />

        {/* Big happy open mouth */}
        <Path d="M 110 106 Q 132 125 154 106" stroke={EP} strokeWidth={2.5} fill="none" strokeLinecap="round" />
        <Path d="M 110 106 Q 132 125 154 106 L 154 115 Q 132 132 110 115 Z" fill={P} opacity={0.7} />

        {/* Nose */}
        <Path d="M 127 98 L 137 98 L 132 104 Z" fill={N} />

        {/* Whiskers */}
        <Line x1={52} y1={92} x2={112} y2={96} stroke={D} strokeWidth={1.2} opacity={0.5} />
        <Line x1={48} y1={102} x2={112} y2={100} stroke={D} strokeWidth={1.2} opacity={0.5} />
        <Line x1={152} y1={96} x2={212} y2={92} stroke={D} strokeWidth={1.2} opacity={0.5} />
        <Line x1={152} y1={100} x2={216} y2={102} stroke={D} strokeWidth={1.2} opacity={0.5} />

        {/* Cheek spots */}
        <Circle cx={96} cy={102} r={5} fill={P} opacity={0.65} />
        <Circle cx={168} cy={102} r={5} fill={P} opacity={0.65} />
      </G>
    </Svg>
  );
}
