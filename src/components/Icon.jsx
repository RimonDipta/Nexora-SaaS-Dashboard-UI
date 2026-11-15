import { ICON_PATHS } from '../icons/paths';

/**
 * Nexora icon set, exported from the Figma design system.
 * Strokes use currentColor so icons inherit text colour; 16px is the default UI size.
 */
export default function Icon({ name, size = 16, color, className, style, title, strokeWidth = 1.45833 }) {
  const paths = ICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke={color || 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, display: 'block', ...style }}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
