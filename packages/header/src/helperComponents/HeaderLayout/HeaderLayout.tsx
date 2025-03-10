import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';

import {
  CloudLogoDevSVG,
  CloudLogoHybridSVG,
  CloudLogoStageSVG,
  CloudLogoSVG,
  MainMenuSVG,
} from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';
import { Skeleton } from '@snack-uikit/skeleton';

import { HEADER_LOGO_MODE, HeaderLogo } from '../../types';
import styles from './styles.module.scss';

export type HeaderLayoutProps = WithSupportProps<{
  className?: string;
  homePageUrl: string;
  onLogoClick?: MouseEventHandler<HTMLAnchorElement>;
  toolbar: ReactNode;
  logo?: HeaderLogo;
  path?: ReactNode;
  onMainMenuClick(): void;
  pathFooter?: boolean;
  showMainMenu?: boolean;
  disableMainMenu?: boolean;
}>;

function LogoWithFallBack({ path, loading, mode }: HeaderLogo) {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
  }, [path, loading]);

  if (loading) {
    return <Skeleton width={24} height={24} loading borderRadius={4} />;
  }

  if (path && !error) {
    return (
      <>
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
      </>
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
}

export function HeaderLayout({
  className,
  homePageUrl,
  onLogoClick,
  logo,
  path,
  toolbar,
  onMainMenuClick,
  pathFooter,
  showMainMenu,
  disableMainMenu,
  ...rest
}: HeaderLayoutProps) {
  return (
    <header className={className} {...extractSupportProps(rest)}>
      <div className={styles.header}>
        <div className={styles.left}>
          {showMainMenu && (
            <ButtonFunction
              size='m'
              icon={<MainMenuSVG />}
              onClick={onMainMenuClick}
              disabled={disableMainMenu}
              data-test-id='header__drawer-menu-button'
            />
          )}

          <a className={styles.logo} href={homePageUrl} tabIndex={0} onClick={onLogoClick} data-test-id='header__logo'>
            <LogoWithFallBack {...logo} />
          </a>

          {!pathFooter && Boolean(path) && <div className={styles.path}>{path}</div>}
        </div>

        <div className={styles.right}>{toolbar}</div>
      </div>

      {pathFooter && Boolean(path) && <div className={styles.footer}>{path}</div>}
    </header>
  );
}
