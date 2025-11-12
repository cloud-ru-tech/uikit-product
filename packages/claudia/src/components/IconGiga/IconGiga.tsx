import { CSSProperties, forwardRef, SVGProps } from 'react';

import { GIGA_ICON_GRADIENT_ID, GRADIENT_PARAMS, GRADIENT_STOPS, ICON_PATH } from './constants';

export type IconGigaProps = {
  className?: string;
  size?: number;
  style?: CSSProperties;
  withBranding?: boolean;
} & SVGProps<SVGSVGElement>;

export const IconGiga = forwardRef<SVGSVGElement, IconGigaProps>(
  ({ size = 24, className, style, withBranding, ...props }, ref) => {
    const customStyle: CSSProperties = {
      ...style,
    };

    if (typeof size === 'number') {
      customStyle.width = `${size}px`;
      customStyle.height = `${size}px`;
    }

    if (withBranding) {
      return (
        <svg
          ref={ref}
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={customStyle}
          className={className}
          {...props}
        >
          <path d={ICON_PATH} fill={`url(#${GIGA_ICON_GRADIENT_ID})`} />
          <defs>
            <radialGradient id={GIGA_ICON_GRADIENT_ID} {...GRADIENT_PARAMS}>
              {GRADIENT_STOPS.map(({ offset, stopColor }) => (
                <stop key={offset} offset={offset} stopColor={stopColor} />
              ))}
            </radialGradient>
          </defs>
        </svg>
      );
    }

    return (
      <svg
        ref={ref}
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={customStyle}
        className={className}
        {...props}
      >
        <path d={ICON_PATH} fill='currentColor' />
      </svg>
    );
  },
);
