import { CSSProperties, SVGProps } from 'react';

import styles from './styles.modules.scss';

export type PlatformLogoProps = {
  className?: string;
  size?: string | number;
  style?: CSSProperties;
} & SVGProps<SVGSVGElement>;

export function EvolutionPlatformLogo({ size = 24, ...props }: PlatformLogoProps) {
  props.width = undefined;
  props.height = undefined;
  const testId = 'icon-logo';
  const isCustomSize = typeof size === 'number';
  if (isCustomSize) {
    if (!props.style) props.style = {};
    props.style.width = size + 'px';
    props.style.height = size + 'px';
  }
  return (
    <div className={styles.logo} data-platform='evolution'>
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
          d='M10.663 2.185c-3.25.416-6.136 2.491-7.561 5.435a8.633 8.633 0 0 0-.645 1.695 9.807 9.807 0 0 0 1.055 7.697c.437.721.81 1.191 1.467 1.851.585.588.927.872 1.541 1.284 1.242.833 2.811 1.401 4.34 1.572.512.057 1.65.058 2.14.001 1.918-.22 3.796-1.02 5.24-2.231A9.928 9.928 0 0 0 21.72 13c.057-.489.057-1.631 0-2.12-.254-2.218-1.184-4.192-2.719-5.775-1.586-1.635-3.612-2.649-5.84-2.924-.617-.076-1.891-.074-2.498.004m2.119 1.411c.668.138 1.13.381 1.838.97.468.389 3.568 3.454 4.269 4.221 1.059 1.159 1.366 1.738 1.474 2.786.072.689-.074 1.507-.37 2.076-.361.694-.847 1.235-3.26 3.633-1.94 1.928-2.469 2.394-3.061 2.7-.551.284-1.007.389-1.712.392-.696.004-1.098-.082-1.66-.355-.713-.346-1.313-.879-3.721-3.305-2.093-2.11-2.525-2.621-2.809-3.324-.323-.798-.334-2.004-.026-2.826.273-.73.699-1.243 2.793-3.358 2.404-2.428 3.238-3.15 3.983-3.447.598-.239 1.56-.308 2.262-.163'
        />
      </svg>
    </div>
  );
}
