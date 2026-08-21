import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';
import { Typography } from '@snack-uikit/typography';

import { type FooterHandlers, type FooterLinkItem, type FooterSocialItem } from '../../types';
import { FooterLink } from '../FooterLink';
import { SocialButtons } from '../SocialButtons';
import styles from './styles.module.scss';

export type FooterBottomProps = WithLayoutType<
  FooterHandlers & {
    links: FooterLinkItem[];
    socials: FooterSocialItem[];
    copyrightOwner: string;
  }
>;

export function FooterBottom({
  layoutType,
  links,
  socials,
  copyrightOwner,
  onElementClick,
  onNavigate,
}: FooterBottomProps) {
  return (
    <div className={styles.root} data-qa='footer-bottom'>
      <Divider className={styles.divider} data-layout-type={layoutType} data-qa='footer-bottom-divider' />

      <div className={styles.content} data-layout-type={layoutType} data-qa='footer-bottom-content'>
        <Typography
          className={styles.copyright}
          tag='div'
          family='sans'
          purpose='body'
          size='m'
          data-layout-type={layoutType}
          data-qa='footer-copyright'
        >
          &copy;&nbsp;{new Date().getFullYear()}&nbsp;{copyrightOwner}
        </Typography>

        <div className={styles.meta} data-layout-type={layoutType} data-qa='footer-bottom-meta'>
          <ul className={styles.links} data-qa='footer-bottom-links'>
            {links.map(link => (
              <li className={styles.linkItem} data-layout-type={layoutType} key={link.id ?? link.url ?? link.text}>
                <FooterLink {...link} onElementClick={onElementClick} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>

          <SocialButtons socials={socials} onElementClick={onElementClick} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
