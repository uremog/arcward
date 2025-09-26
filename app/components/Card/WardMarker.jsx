import React from 'react';

// WardMarker.jsx
// Renders either a straight line or a corner marker, fully centered and rotatable
// Fixed: rotation now uses the SVG viewBox center (12,12) so rotation is consistent
// with other icons (like ArcMarker). The corner variant's coordinates are chosen so
// the centroid of the L-shape sits at (12,12), keeping it visually centered.

const WardMarker = React.forwardRef(({
  variant = 'line',           // 'line' | 'corner'
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  rotate = 0,
  className = '',
  title = 'Ward Marker',
  ariaLabel,
  style = {},
  visible = true,
  ...props
}, ref) => {  
  // Use the viewBox center (12,12) for rotation so behavior is stable regardless
  // of the CSS-rendered `size` prop.
  const VIEWBOX_CENTER = 12;
  const transform = `rotate(${rotate} ${VIEWBOX_CENTER} ${VIEWBOX_CENTER})`;

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
      style={{ ...style, visibility: visible ? 'visible' : 'hidden' }}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g transform={transform}>
        {variant === 'line' && (
          // Centered horizontal line (midpoint at 12)
          <line x1="6" y1="12" x2="18" y2="12" stroke={color} strokeWidth={strokeWidth}
                strokeLinecap="round" strokeLinejoin="round" />
        )}
        {variant === 'corner' && (
          // Corner whose centroid is at (12,12): points chosen so the average of
          // the three polyline points equals (12,12). This keeps the L-shape
          // visually centered when rotated.
          // Points: (6,15) -> (15,15) -> (15,6)
          <polyline points="6,15 15,15 15,6" stroke={color} strokeWidth={strokeWidth}
                    strokeLinecap="round" strokeLinejoin="round" fill="none" />
        )}
      </g>
    </svg>
  );
});

WardMarker.displayName = 'WardMarker';
export default WardMarker;

/* Usage examples:

import WardMarker from './WardMarker';

<WardMarker variant="line" rotate={0} size={24} />
<WardMarker variant="line" rotate={90} size={24} />
<WardMarker variant="corner" rotate={0} size={24} />
<WardMarker variant="corner" rotate={90} size={24} />

*/
