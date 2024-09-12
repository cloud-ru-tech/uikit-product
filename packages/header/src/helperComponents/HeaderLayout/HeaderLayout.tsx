import { MouseEventHandler, ReactNode } from 'react';

import { MainMenuSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';

import styles from './styles.modules.scss';

export type HeaderLayoutProps = WithSupportProps<{
  className?: string;
  homePageUrl: string;
  onLogoClick?: MouseEventHandler<HTMLAnchorElement>;
  toolbar: ReactNode;
  logo: ReactNode;
  path?: ReactNode;
  onMainMenuClick(): void;
  pathFooter?: boolean;
  showMainMenu?: boolean;
  disableMainMenu?: boolean;
}>;

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
            {logo}
          </a>

          {!pathFooter && Boolean(path) && <div className={styles.path}>{path}</div>}
        </div>

        <div className={styles.right}>{toolbar}</div>
      </div>

      {pathFooter && Boolean(path) && <div className={styles.footer}>{path}</div>}
    </header>
  );
}
