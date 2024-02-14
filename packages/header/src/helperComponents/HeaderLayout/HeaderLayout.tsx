import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';

import { MainMenuIcon } from '../icons';
import styles from './styles.modules.scss';

export type HeaderLayoutProps = WithSupportProps<{
  className?: string;
  homePageUrl: string;
  toolbar: ReactNode;
  logo: ReactNode;
  path?: ReactNode;
  onMainMenuClick(): void;
  pathFooter?: boolean;
}>;

export function HeaderLayout({
  className,
  homePageUrl,
  logo,
  path,
  toolbar,
  onMainMenuClick,
  pathFooter,
  ...rest
}: HeaderLayoutProps) {
  return (
    <header className={className} {...extractSupportProps(rest)}>
      <div className={styles.header}>
        <div className={styles.left}>
          <a className={styles.logo} href={homePageUrl} tabIndex={0}>
            {logo}
          </a>

          <ButtonFunction
            size='m'
            icon={<MainMenuIcon />}
            onClick={onMainMenuClick}
            data-test-id='header__drawer-menu-button'
          />

          {!pathFooter && Boolean(path) && <div className={styles.path}>{path}</div>}
        </div>

        <div className={styles.right}>{toolbar}</div>
      </div>

      {pathFooter && Boolean(path) && <div className={styles.footer}>{path}</div>}
    </header>
  );
}
