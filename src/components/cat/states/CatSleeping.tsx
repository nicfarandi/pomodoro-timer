import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Path,
  Text as SvgText,
  G,
} from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';
const EP = '#1A1A1A';
const N = '#E8849C';

export default function CatSleeping() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      {/* Main curled body */}
      <Ellipse cx={130} cy={175} rx={95} ry={70} fill={O} />

      {/* Belly peek */}
      <Ellipse cx={110} cy={185} rx={50} ry={38} fill={C} />

      {/* Body stripes */}
      <Path d="M 50 175 Q 65 160 80 175" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />
      <Path d="M 42 192 Q 58 177 74 192" stroke={D} strokeWidth={2.5} fill="none" opacity={0.5} />

      {/* Tail wrapped around (top) */}
      <Path
        d="M 220 165 Q 240 140 225 105 Q 210 75 185 90 Q 165 105 178 140 Q 188 165 210 170 Z"
        fill={O}
      />
      <Path
        d="M 216 163 Q 232 142 218 110 Q 206 84 186 96 Q 170 108 180 138 Q 188 160 208 166 Z"
        fill={D}
        opacity={0.3}
      />

      {/* Tail tip */}
      <Ellipse cx={185} cy={90} rx={18} ry={14} fill={O} />
      <Ellipse cx={185} cy={91} rx={10} ry={8} fill={D} opacity={0.35} />

      {/* Head peeking from body */}
      <Circle cx={110} cy={122} r={62} fill={O} />

      {/* Left ear */}
      <Path d="M 62 88 L 42 48 L 78 92 Z" fill={O} />
      <Path d="M 63 87 L 48 55 L 76 90 Z" fill={P} />

      {/* Right ear */}
      <Path d="M 148 82 L 162 42 L 140 90 Z" fill={O} />
      <Path d="M 148 81 L 160 50 L 142 88 Z" fill={P} />

      {/* Forehead stripe */}
      <Path d="M 97 60 Q 110 54 123 60" stroke={D} strokeWidth={2.5} fill="none" opacity={0.7} />

      {/* Closed eyes — sleeping */}
      <Path d="M 82 112 Q 93 122 104 112" stroke={EP} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Path d="M 116 112 Q 127 122 138 112" stroke={EP} strokeWidth={3} fill="none" strokeLinecap="round" />

      {/* Tiny eyelashes */}
      <Path d="M 84 112 L 82 107" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M 93 118 L 93 113" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M 118 112 L 116 107" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M 127 118 L 127 113" stroke={EP} strokeWidth={1.5} strokeLinecap="round" />

      {/* Nose */}
      <Path d="M 106 130 L 114 130 L 110 136 Z" fill={N} />

      {/* Mouth */}
      <Path d="M 110 136 Q 103 141 98 139" stroke={D} strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <Path d="M 110 136 Q 117 141 122 139" stroke={D} strokeWidth={1.5} fill="none" strokeLinecap="round" />

      {/* Cheek */}
      <Circle cx={78} cy={128} r={5} fill={P} opacity={0.6} />

      {/* Paw tucked under */}
      <Ellipse cx={148} cy={224} rx={35} ry={16} fill={O} />
      <Ellipse cx={80} cy={228} rx={28} ry={13} fill={O} />

      {/* Z Z Z */}
      <G opacity={0.8}>
        <SvgText x={185} y={95} fontSize={22} fontWeight="bold" fill={D} opacity={0.7}>z</SvgText>
        <SvgText x={198} y={70} fontSize={28} fontWeight="bold" fill={D} opacity={0.85}>z</SvgText>
        <SvgText x={214} y={42} fontSize={34} fontWeight="bold" fill={D}>z</SvgText>
      </G>
    </Svg>
  );
}
