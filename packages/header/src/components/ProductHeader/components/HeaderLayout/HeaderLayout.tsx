import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFunction } from '@snack-uikit/button';

import { MainMenuIcon } from '../MainMenuIcon';
import styles from './styles.modules.scss';

export type HeaderLayoutProps = WithSupportProps<{
  className?: string;
  homePageUrl: string;
  toolbar: ReactNode;
  logo: ReactNode;
  path: ReactNode;
  onMainMenuClick(): void;
}>;

export function HeaderLayout({
  className,
  homePageUrl,
  logo,
  path,
  toolbar,
  onMainMenuClick,
  ...rest
}: HeaderLayoutProps) {
  return (
    <header className={cn(styles.header, className)} {...extractSupportProps(rest)}>
      <div className={styles.left}>
        <a className={styles.logo} href={homePageUrl} tabIndex={0}>
          {logo}
        </a>

        <ButtonFunction size='m' icon={<MainMenuIcon />} onClick={onMainMenuClick} />

        <div className={styles.path}>{path}</div>
      </div>

      <div className={styles.right}>{toolbar}</div>
    </header>
  );
}
