import React from 'react';

// CharacterMarker.jsx
// Simple circular marker centered in its SVG element. Resizable via `size` and
// `radius` props; by default radius is chosen to visually match other markers.

const CharacterMarker = React.forwardRef(({
  size = 24,               // width and height of the SVG
  radius = null,           // if null, computed as a fraction of size
  strokeWidth = 2,
  fill = 'currentColor',
  stroke = 'none',
  className = '',
  title = 'Character Marker',
  ariaLabel,
  style = {},
  ...props
}, ref) => {
  // Use the same 24x24 viewBox as other markers so sizing & centering are consistent
  const VIEWBOX_SIZE = 24;
  const cx = VIEWBOX_SIZE / 2;
  const cy = VIEWBOX_SIZE / 2;
  // Default radius: leave a small padding so the circle visually matches other icons
  const defaultRadius = 6.5;
  const r = radius == null ? defaultRadius : radius;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      className={`inline-block ${className}`}
      style={style}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
});

CharacterMarker.displayName = 'CharacterMarker';
export default CharacterMarker;

/* Usage examples:

import CharacterMarker from './CharacterMarker';

// Default
<CharacterMarker />

// Larger
<CharacterMarker size={32} />

// Custom radius and colors
<CharacterMarker size={28} radius={8} fill="#4F46E5" stroke="#111827" strokeWidth={1} />

*/