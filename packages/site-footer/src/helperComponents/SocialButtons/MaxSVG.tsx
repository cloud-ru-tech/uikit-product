import { CSSProperties, SVGProps } from 'react';

type MaxSVGProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function MaxSVG({ size = 24, ...props }: MaxSVGProps) {
  const style: CSSProperties = { width: size, height: size, ...props.style };

  return (
    <svg xmlns='http://w3.org' viewBox='0 0 24 24' fill='none' data-test-id='icon-max-v3' {...props} style={style}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.15 19.84C10.59 19.84 9.86 19.61 8.59 18.7C7.79 19.72 5.27 20.52 5.15 19.15C5.15 18.11 4.92 17.25 4.67 16.29C4.36 15.11 4 13.82 4 11.92C4 7.4 7.71 4 12.1 4C16.5 4 19.95 7.57 19.95 11.96C19.96 14.04 19.14 16.03 17.68 17.51C16.22 18.98 14.23 19.82 12.15 19.84ZM12.21 7.91C10.08 7.8 8.41 9.28 8.04 11.61C7.74 13.53 8.28 15.87 8.74 15.99C8.96 16.05 9.51 15.59 9.86 15.25C10.43 15.65 11.1 15.88 11.79 15.94C12.86 16 13.9 15.62 14.7 14.92C15.49 14.21 15.98 13.22 16.05 12.16C16.09 11.09 15.72 10.05 15 9.25C14.29 8.46 13.28 7.98 12.21 7.91V7.91Z'
        fill='currentColor'
      />
    </svg>
  );
}
