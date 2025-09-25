import React from 'react';

// ArcMarker.jsx
// Reusable arrow marker component

const DIRECTION_TO_DEG = {
  right: 0,
  down: 90,
  left: 180,
  up: -90,
};

const ArcMarker = React.forwardRef(({
  direction = 'right',
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  rotate = 0,
  className = '',
  title = 'Arc Marker',
  ariaLabel,
  style = {},
  visible = true,
  ...props
}, ref) => {
  if (!visible) return null;
  
  const baseDeg = DIRECTION_TO_DEG[direction] ?? 0;
  const totalDeg = baseDeg + Number(rotate || 0);
  const transform = `rotate(${totalDeg} 12 12)`;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      className={`inline-block ${className}`}
      style={style}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g transform={transform}>
        <line x1="3" y1="12" x2="17" y2="12" stroke={color} strokeWidth={strokeWidth}
              strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="11 6 17 12 11 18" stroke={color} strokeWidth={strokeWidth}
                  strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
});

ArcMarker.displayName = 'ArcMarker';
export default ArcMarker;

/* Usage examples:

import ArcMarker from './ArcMarker';

<ArcMarker direction="up" size={20} />
<ArcMarker direction="left" rotate={45} size={32} />

*/
