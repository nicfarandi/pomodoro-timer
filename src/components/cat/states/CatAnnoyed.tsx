import React from 'react';
import Svg, { Circle, Ellipse, Path, Line, G, Rect } from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';
const EG = '#6DB665';
const EP = '#1A1A1A';
const N = '#E8849C';

export default function CatAnnoyed() {
  return (
    <Svg width={260} height={280} viewBox="0 0 260 280">
      {/* Falling pen */}
      <G transform="rotate(35, 230, 200)">
        <Rect x={222} y={155} width={8} height={60} rx={2} fill="#888" />
        <Path d="M 222 215 L 226 230 L 230 215 Z" fill="#FFD700" />
      </G>

      {/* Tail */}
      <Path d="M 195 195 Q 230 170 226 125 Q 222 100 208 105 Q 196 110 200 140 Q 204 165 188 182 Q 178 192 190 200 Z" fill={O} />

      {/* Body */}
      <Ellipse cx={128} cy={210} rx={78} ry={65} fill={O} />
      <Ellipse cx={128} cy={218} rx={42} ry={50} fill={C} />

      {/* Body stripes */}
      <Path d="M 65 195 Q 76 184 87 195" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />

      {/* Sitting left paw */}
      <Ellipse cx={88} cy={266} rx={28} ry={13} fill={O} />

      {/* RIGHT PAW raised and swiping */}
      <G transform="rotate(-40, 180, 230)">
        <Ellipse cx={188} cy={240} rx={28} ry={13} fill={O} />
        <Path d="M 172 240 Q 178 246 184 242 Q 190 246 196 242 Q 202 246 204 240" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />
      </G>

      {/* Head */}
      <Circle cx={128} cy={100} r={72} fill={O} />

      {/* Left ear */}
      <Path d="M 70 58 L 45 8 L 86 62 Z" fill={O} />
      <Path d="M 71 57 L 52 16 L 84 60 Z" fill={P} />

      {/* Right ear */}
      <Path d="M 186 58 L 211 8 L 170 62 Z" fill={O} />
      <Path d="M 186 57 L 204 16 L 172 60 Z" fill={P} />

      {/* Forehead stripes — more intense when annoyed */}
      <Path d="M 112 42 Q 128 36 144 42" stroke={D} strokeWidth={3} fill="none" opacity={0.8} />
      <Path d="M 110 55 Q 128 48 146 55" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />

      {/* Judgey half-lidded eyes */}
      <Ellipse cx={110} cy={100} rx={14} ry={10} fill={EG} />
      <Circle cx={112} cy={101} r={6} fill={EP} />
      <Circle cx={109} cy={97} r={2.5} fill="white" />
      {/* Drooping eyelid (annoyed) */}
      <Path d="M 95 91 Q 110 87 125 91" stroke={EP} strokeWidth={3} fill={O} />

      <Ellipse cx={146} cy={100} rx={14} ry={10} fill={EG} />
      <Circle cx={148} cy={101} r={6} fill={EP} />
      <Circle cx={145} cy={97} r={2.5} fill="white" />
      <Path d="M 131 91 Q 146 87 161 91" stroke={EP} strokeWidth={3} fill={O} />

      {/* Nose */}
      <Path d="M 123 120 L 133 120 L 128 127 Z" fill={N} />

      {/* Flat displeased mouth */}
      <Path d="M 118 134 Q 128 130 138 134" stroke={D} strokeWidth={2} fill="none" strokeLinecap="round" />

      {/* Whiskers */}
      <Line x1={48} y1={112} x2={112} y2={118} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={43} y1={122} x2={112} y2={122} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={144} y1={118} x2={208} y2={112} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={144} y1={122} x2={213} y2={122} stroke={D} strokeWidth={1.2} opacity={0.55} />

      {/* Cheek spots */}
      <Circle cx={92} cy={116} r={5} fill={P} opacity={0.6} />
      <Circle cx={164} cy={116} r={5} fill={P} opacity={0.6} />
    </Svg>
  );
}
