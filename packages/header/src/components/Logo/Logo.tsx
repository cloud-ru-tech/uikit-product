import cn from 'classnames';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';

import { CloudLogoDevSVG, CloudLogoHybridSVG, CloudLogoStageSVG, CloudLogoSVG } from '@sbercloud/uikit-product-icons';
import { Skeleton } from '@snack-uikit/skeleton';
import { extractDataTestProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export const HEADER_LOGO_MODE = {
  develop: 'develop',
  stage: 'stage',
  hybrid: 'hybrid',
  prod: 'prod',
} as const;

type ValueOf<T> = T[keyof T];

export type HeaderLogoMode = ValueOf<typeof HEADER_LOGO_MODE>;

export type LogoProps = WithSupportProps<{
  loading?: boolean;

  path?: string;

  mode?: HeaderLogoMode;

  href: string;

  onClick?: MouseEventHandler<HTMLAnchorElement>;

  className?: string;
}>;

export function Logo({ path, loading, mode, href, onClick, className, ...rest }: LogoProps) {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [path, loading]);

  const logo = useMemo(() => {
    if (path && !error) {
      return (
        <img
          src={path}
          alt='logo'
          className={styles.logoImg}
          onLoad={() => {
            setError(false);
          }}
          onError={() => {
            setError(true);
          }}
        />
      );
    }

    if (mode === HEADER_LOGO_MODE.develop) {
      return <CloudLogoDevSVG size={64} />;
    }

    if (mode === HEADER_LOGO_MODE.stage) {
      return <CloudLogoStageSVG size={74} />;
    }

    if (mode === HEADER_LOGO_MODE.hybrid) {
      return <CloudLogoHybridSVG size={78} />;
    }

    return <CloudLogoSVG size={24} />;
  }, [error, mode, path]);

  if (loading) {
    return (
      <div className={styles.skeletonWrapper}>
        <Skeleton width={24} height={24} loading borderRadius={4} />
      </div>
    );
  }

  return (
    <a
      className={cn(styles.logo, className)}
      href={href}
      tabIndex={0}
      onClick={onClick}
      {...extractDataTestProps(rest)}
    >
      {logo}
    </a>
  );
}
