import { CloudFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import { AdditionalLogoText, Logo } from '../../components/SiteHeaderBasic/SiteHeaderBasic';
import styles from './styles.module.scss';

export type LogoContentProps = {
  additionalLogoText?: AdditionalLogoText;
  logo: Logo;
  isMobile?: boolean;
};

export function LogoContent({ additionalLogoText, isMobile, logo }: LogoContentProps) {
  const heightIconSizeProp = isMobile ? 102 : 130;
  return (
    <div className={styles.logoContentContainer}>
      <a href={logo.logoLink} onClick={logo.onClick} className={styles.logoLink}>
        <CloudFullLogoSVG size={heightIconSizeProp} width='60px' />
      </a>
      {additionalLogoText && (
        <div className={styles.subLogo}>
          <Typography className={styles.slash} size='m' purpose='title' family='sans'>
            /
          </Typography>
          <a href={additionalLogoText.link} onClick={additionalLogoText.onClick} className={styles.link}>
            <Typography size='m' purpose='title' family='sans'>
              {additionalLogoText.text}
            </Typography>
          </a>
        </div>
      )}
    </div>
  );
}
