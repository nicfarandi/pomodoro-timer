import React from 'react';
import Svg, { Circle, Ellipse, Path, G } from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';

export default function CatIgnoring() {
  return (
    <Svg width={260} height={280} viewBox="0 0 260 280">
      {/* Back of head */}
      <Circle cx={130} cy={95} r={72} fill={O} />

      {/* Ear backs (facing away) */}
      <Path d="M 78 55 L 52 8 L 90 60 Z" fill={O} />
      <Path d="M 79 54 L 58 16 L 88 58 Z" fill={D} opacity={0.3} />

      <Path d="M 182 55 L 208 8 L 170 60 Z" fill={O} />
      <Path d="M 182 54 L 202 16 L 172 58 Z" fill={D} opacity={0.3} />

      {/* Back stripes on head */}
      <Path d="M 112 42 Q 130 32 148 42" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />
      <Path d="M 108 60 Q 130 50 152 60" stroke={D} strokeWidth={2} fill="none" opacity={0.4} />

      {/* Body facing away */}
      <Ellipse cx={130} cy={210} rx={78} ry={65} fill={O} />

      {/* Back of body — no belly visible */}
      <Path d="M 60 195 Q 130 165 200 195 Q 200 265 130 270 Q 60 265 60 195 Z" fill={D} opacity={0.2} />

      {/* Body stripes on back */}
      <Path d="M 80 185 Q 98 170 116 185" stroke={D} strokeWidth={2.5} fill="none" opacity={0.5} />
      <Path d="M 144 185 Q 162 170 180 185" stroke={D} strokeWidth={2.5} fill="none" opacity={0.5} />

      {/* Paws tucked (view from behind) */}
      <Ellipse cx={90} cy={266} rx={28} ry={13} fill={O} />
      <Ellipse cx={170} cy={266} rx={28} ry={13} fill={O} />

      {/* Tail flicking upward (visible from behind) */}
      <Path
        d="M 205 195 Q 240 165 236 120 Q 232 90 218 95 Q 206 100 210 132 Q 214 158 198 178 Q 188 190 200 200 Z"
        fill={O}
      />
      {/* Tail tip darker */}
      <Ellipse cx={220} cy={92} rx={15} ry={12} fill={D} opacity={0.4} />

      {/* Small indication of face from behind (ear detail) */}
      <G opacity={0.6}>
        <Ellipse cx={80} cy={58} rx={10} ry={14} fill={P} opacity={0.4} />
        <Ellipse cx={180} cy={58} rx={10} ry={14} fill={P} opacity={0.4} />
      </G>
    </Svg>
  );
}
