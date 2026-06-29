import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Path,
  Line,
  G,
} from 'react-native-svg';

const O = '#F5A623';
const D = '#D4841A';
const C = '#FDE9B4';
const P = '#F8C4D0';
const EG = '#6DB665';
const EP = '#1A1A1A';
const N = '#E8849C';

interface Props {
  eyesClosed?: boolean;
  happyEyes?: boolean;
  judgeyEyes?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export default function CatSitting({
  eyesClosed = false,
  happyEyes = false,
  judgeyEyes = false,
  glow = false,
  glowColor = '#FFD700',
}: Props) {
  return (
    <Svg width={260} height={280} viewBox="0 0 260 280">
      {/* Glow behind cat */}
      {glow && (
        <Circle cx={130} cy={165} r={120} fill={glowColor} opacity={0.18} />
      )}

      {/* Tail */}
      <Path
        d="M 195 195 Q 235 165 230 120 Q 226 95 212 100 Q 198 106 203 138 Q 208 162 190 182 Q 180 192 192 200 Z"
        fill={O}
      />
      <Path
        d="M 197 196 Q 225 170 222 130 Q 220 110 210 114 Q 202 118 206 140 Q 210 160 194 180 Q 186 190 194 198 Z"
        fill={D}
        opacity={0.4}
      />

      {/* Body */}
      <Ellipse cx={130} cy={210} rx={78} ry={65} fill={O} />

      {/* Belly */}
      <Ellipse cx={130} cy={218} rx={42} ry={50} fill={C} />

      {/* Body stripes */}
      <Path d="M 70 195 Q 80 185 90 195" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />
      <Path d="M 60 212 Q 72 200 84 212" stroke={D} strokeWidth={2.5} fill="none" opacity={0.6} />

      {/* Left paw */}
      <Ellipse cx={90} cy={266} rx={28} ry={13} fill={O} />
      <Path d="M 72 266 Q 78 272 84 268 Q 90 272 96 268 Q 102 272 108 266" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />

      {/* Right paw */}
      <Ellipse cx={170} cy={266} rx={28} ry={13} fill={O} />
      <Path d="M 152 266 Q 158 272 164 268 Q 170 272 176 268 Q 182 272 188 266" stroke={D} strokeWidth={1.5} fill="none" opacity={0.5} />

      {/* Head */}
      <Circle cx={130} cy={100} r={72} fill={O} />

      {/* Left ear outer */}
      <Path d="M 73 58 L 48 10 L 88 62 Z" fill={O} />
      {/* Left ear inner */}
      <Path d="M 73 56 L 55 18 L 86 58 Z" fill={P} />

      {/* Right ear outer */}
      <Path d="M 187 58 L 212 10 L 172 62 Z" fill={O} />
      {/* Right ear inner */}
      <Path d="M 187 56 L 205 18 L 174 58 Z" fill={P} />

      {/* Forehead stripes */}
      <Path d="M 115 42 Q 130 36 145 42" stroke={D} strokeWidth={2.5} fill="none" opacity={0.7} />
      <Path d="M 112 55 Q 130 48 148 55" stroke={D} strokeWidth={2} fill="none" opacity={0.5} />

      {/* Eyes */}
      {eyesClosed ? (
        <G>
          <Path d="M 103 98 Q 112 106 121 98" stroke={EP} strokeWidth={3} fill="none" strokeLinecap="round" />
          <Path d="M 139 98 Q 148 106 157 98" stroke={EP} strokeWidth={3} fill="none" strokeLinecap="round" />
        </G>
      ) : happyEyes ? (
        <G>
          <Path d="M 100 94 Q 112 108 124 94" stroke={EP} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d="M 136 94 Q 148 108 160 94" stroke={EP} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        </G>
      ) : judgeyEyes ? (
        <G>
          <Ellipse cx={112} cy={100} rx={13} ry={10} fill={EG} />
          <Circle cx={114} cy={101} r={6} fill={EP} />
          <Circle cx={111} cy={97} r={2} fill="white" />
          <Path d="M 98 90 Q 112 86 126 90" stroke={EP} strokeWidth={2.5} fill="none" />
          <Ellipse cx={148} cy={100} rx={13} ry={10} fill={EG} />
          <Circle cx={150} cy={101} r={6} fill={EP} />
          <Circle cx={147} cy={97} r={2} fill="white" />
          <Path d="M 134 90 Q 148 86 162 90" stroke={EP} strokeWidth={2.5} fill="none" />
        </G>
      ) : (
        <G>
          <Ellipse cx={112} cy={100} rx={14} ry={16} fill={EG} />
          <Circle cx={114} cy={102} r={8} fill={EP} />
          <Circle cx={110} cy={97} r={3} fill="white" />
          <Ellipse cx={148} cy={100} rx={14} ry={16} fill={EG} />
          <Circle cx={150} cy={102} r={8} fill={EP} />
          <Circle cx={146} cy={97} r={3} fill="white" />
        </G>
      )}

      {/* Nose */}
      <Path d="M 125 120 L 135 120 L 130 127 Z" fill={N} />

      {/* Mouth */}
      <Path d="M 130 127 Q 120 134 114 131" stroke={D} strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <Path d="M 130 127 Q 140 134 146 131" stroke={D} strokeWidth={1.8} fill="none" strokeLinecap="round" />

      {/* Whiskers left */}
      <Line x1={50} y1={112} x2={115} y2={118} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={45} y1={122} x2={115} y2={122} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={52} y1={132} x2={115} y2={126} stroke={D} strokeWidth={1.2} opacity={0.55} />

      {/* Whiskers right */}
      <Line x1={145} y1={118} x2={210} y2={112} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={145} y1={122} x2={215} y2={122} stroke={D} strokeWidth={1.2} opacity={0.55} />
      <Line x1={145} y1={126} x2={208} y2={132} stroke={D} strokeWidth={1.2} opacity={0.55} />

      {/* Cheek spots */}
      <Circle cx={94} cy={116} r={5} fill={P} opacity={0.6} />
      <Circle cx={166} cy={116} r={5} fill={P} opacity={0.6} />
    </Svg>
  );
}
