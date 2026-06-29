import React from 'react';
import Svg, { Circle, Ellipse, Path, Line, G } from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';
const EP = '#1A1A1A';
const N = '#E8849C';

export default function CatSprawled() {
  return (
    <Svg width={280} height={240} viewBox="0 0 280 240">
      {/* Sprawled flat body */}
      <Ellipse cx={140} cy={165} rx={105} ry={55} fill={O} />

      {/* Belly fully exposed */}
      <Ellipse cx={140} cy={165} rx={62} ry={42} fill={C} />

      {/* Body stripes */}
      <Path d="M 50 160 Q 68 145 86 160" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />
      <Path d="M 44 178 Q 62 163 80 178" stroke={D} strokeWidth={2} fill="none" opacity={0.5} />
      <Path d="M 194 160 Q 212 145 230 160" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />

      {/* Front left paw (up in air) */}
      <Ellipse cx={55} cy={100} rx={22} ry={14} fill={O} transform="rotate(-20, 55, 100)" />
      <Path d="M 40 100 Q 46 106 52 102 Q 58 106 64 102 Q 70 106 70 100" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} transform="rotate(-20, 55, 100)" />

      {/* Front left arm */}
      <Path d="M 75 145 Q 60 125 55 100" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />

      {/* Front right paw (up in air) */}
      <Ellipse cx={225} cy={100} rx={22} ry={14} fill={O} transform="rotate(20, 225, 100)" />
      <Path d="M 210 100 Q 216 106 222 102 Q 228 106 234 102 Q 240 106 240 100" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} transform="rotate(20, 225, 100)" />

      {/* Front right arm */}
      <Path d="M 205 145 Q 220 125 225 100" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />

      {/* Back left paw */}
      <Ellipse cx={52} cy={210} rx={26} ry={14} fill={O} />
      <Path d="M 36 210 Q 42 216 48 212 Q 54 216 60 212 Q 66 216 68 210" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />
      <Path d="M 80 175 Q 62 192 52 210" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />

      {/* Back right paw */}
      <Ellipse cx={228} cy={210} rx={26} ry={14} fill={O} />
      <Path d="M 212 210 Q 218 216 224 212 Q 230 216 236 212 Q 242 216 244 210" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />
      <Path d="M 200 175 Q 218 192 228 210" stroke={O} strokeWidth={22} fill="none" strokeLinecap="round" />

      {/* Tail flopped to one side */}
      <Path d="M 238 158 Q 265 148 268 128 Q 270 112 260 118 Q 252 125 254 140 Q 256 152 242 158 Z" fill={O} />

      {/* Head flat */}
      <Circle cx={140} cy={95} r={65} fill={O} />

      {/* Left ear */}
      <Path d="M 90 62 L 68 20 L 105 66 Z" fill={O} />
      <Path d="M 91 61 L 74 28 L 103 64 Z" fill={P} />

      {/* Right ear */}
      <Path d="M 190 62 L 212 20 L 175 66 Z" fill={O} />
      <Path d="M 190 61 L 206 28 L 177 64 Z" fill={P} />

      {/* Forehead stripe */}
      <Path d="M 126 40 Q 140 34 154 40" stroke={D} strokeWidth={2.5} fill="none" opacity={0.7} />

      {/* Peaceful closed eyes */}
      <G>
        <Path d="M 112 92 Q 124 102 136 92" stroke={EP} strokeWidth={3} fill="none" strokeLinecap="round" />
        <Path d="M 144 92 Q 156 102 168 92" stroke={EP} strokeWidth={3} fill="none" strokeLinecap="round" />
        {/* Long lashes */}
        <Path d="M 114 92 L 112 87" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M 124 99 L 124 94" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M 146 92 L 144 87" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M 156 99 L 156 94" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
      </G>

      {/* Nose */}
      <Path d="M 135 110 L 145 110 L 140 117 Z" fill={N} />

      {/* Relaxed open mouth / slight smile */}
      <Path d="M 130 122 Q 140 130 150 122" stroke={D} strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* Whiskers */}
      <Line x1={62} y1={102} x2={122} y2={108} stroke={D} strokeWidth={1.2} opacity={0.5} />
      <Line x1={58} y1={112} x2={122} y2={112} stroke={D} strokeWidth={1.2} opacity={0.5} />
      <Line x1={158} y1={108} x2={218} y2={102} stroke={D} strokeWidth={1.2} opacity={0.5} />
      <Line x1={158} y1={112} x2={222} y2={112} stroke={D} strokeWidth={1.2} opacity={0.5} />

      {/* Cheek spots */}
      <Circle cx={102} cy={108} r={5} fill={P} opacity={0.6} />
      <Circle cx={178} cy={108} r={5} fill={P} opacity={0.6} />
    </Svg>
  );
}
