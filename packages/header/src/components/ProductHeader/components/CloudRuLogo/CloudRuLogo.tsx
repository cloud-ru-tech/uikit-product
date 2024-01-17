import { CSSProperties, SVGProps } from 'react';

export type CloudRuLogoProps = {
  className?: string;
  size?: string | number;
  style?: CSSProperties;
} & SVGProps<SVGSVGElement>;

export function CloudRuLogo({ size = 24, ...props }: CloudRuLogoProps) {
  props.width = undefined;
  props.height = undefined;
  const testId = 'icon-sign24-px';
  const isCustomSize = typeof size === 'number';
  if (isCustomSize) {
    if (!props.style) props.style = {};
    props.style.width = size + 'px';
    props.style.height = size + 'px';
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='currentColor'
      viewBox='0 0 24 24'
      data-test-id={testId}
      {...props}
    >
      <path
        fillRule='evenodd'
        d='M6.18 2.776 1.22 4.867v14.267l4.92 2.073c2.706 1.14 4.952 2.083 4.99 2.096.067.021.07-.535.07-11.3 0-6.228-.013-11.322-.03-11.32-.017.002-2.262.944-4.99 2.093M12.8 5.98v5.3h10l-.01-3.206-.01-3.207-4.96-2.091A851.901 851.901 0 0 0 12.83.682c-.017-.001-.03 2.383-.03 5.298m0 12.06c0 2.904.013 5.279.03 5.278.017-.002 2.262-.943 4.99-2.093l4.96-2.09.01-3.187.01-3.188h-10z'
      />
    </svg>
  );
}
