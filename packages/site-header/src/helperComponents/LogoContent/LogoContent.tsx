import { CloudFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type LogoContentProps = {
  logoContentText?: string;
  logoLink: string;
  isMobile?: boolean;
};

export function LogoContent({ logoContentText, isMobile, logoLink }: LogoContentProps) {
  const heightIconSizeProp = isMobile ? 102 : 130;
  return (
    <a href={logoLink} className={styles.linkLogo}>
      <div className={styles.logoContentContainer}>
        <CloudFullLogoSVG size={heightIconSizeProp} width='60px' />
        {logoContentText && (
          <div className={styles.subLogo}>
            <Typography className={styles.slash} size='m' purpose='title' family='sans'>
              /
            </Typography>
            <Typography size='m' purpose='title' family='sans'>
              {logoContentText}
            </Typography>
          </div>
        )}
      </div>
    </a>
  );
}
