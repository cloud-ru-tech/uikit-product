import cn from 'classnames';

import {
  GigaChatLogoSVG,
  KuberLogoSVG,
  NginxLogoSVG,
  NodejsLogoSVG,
  StrongSwanLogoSVG,
  UbuntuLogoSVG,
} from '@sbercloud/uikit-product-icons';
import { Card, CardProps } from '@snack-uikit/card';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type MarketplaceBannerCardProps = Pick<CardProps, 'onClick'> & {
  title: string;
  text?: string;
  isMobile?: boolean;
};

export function MarketplaceBannerCard(props: MarketplaceBannerCardProps) {
  return (
    <div className={cn(!props.isMobile && styles.card)} data-test-id='header__drawer-menu__marketplace-banner'>
      <Card size={'m'} onClick={props.onClick}>
        <div className={cn(styles.wrapper, props.isMobile && styles.mobile)}>
          <div className={styles.left}>
            <Typography.SansTitleS className={styles.title}>{props.title}</Typography.SansTitleS>

            {props.text && <Typography.SansBodyS className={styles.text}>{props.text}</Typography.SansBodyS>}
          </div>

          <div className={cn(styles.icons, props.isMobile && styles.mobile)}>
            {props.isMobile ? (
              <>
                <NodejsLogoSVG size={20} />
                <KuberLogoSVG size={20} />
                <NginxLogoSVG size={20} />
              </>
            ) : (
              <>
                <StrongSwanLogoSVG size={16} />
                <KuberLogoSVG size={16} />
                <NodejsLogoSVG size={16} />
                <NginxLogoSVG size={16} />
                <UbuntuLogoSVG size={16} />
                <GigaChatLogoSVG size={16} />
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
