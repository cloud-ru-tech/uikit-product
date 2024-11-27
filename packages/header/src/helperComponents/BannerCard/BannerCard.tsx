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
import { PromoTag } from '@snack-uikit/promo-tag';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type BannerCardProps = Pick<CardProps, 'onClick'> & {
  promoBadge: string;
  title: string;
  text?: string;
  isMobile?: boolean;
};

export function BannerCard(props: BannerCardProps) {
  return (
    <div className={cn(!props.isMobile && styles.card)}>
      <Card size={'m'} onClick={props.onClick}>
        <div className={cn(styles.wrapper, props.isMobile && styles.mobile)}>
          <div className={styles.left}>
            <Typography.SansTitleM className={styles.title}>
              {props.title}
              <PromoTag text={props.promoBadge as string} />
            </Typography.SansTitleM>

            {props.text && <Typography.SansBodyM className={styles.text}>{props.text}</Typography.SansBodyM>}
          </div>

          <div className={cn(styles.icons, props.isMobile && styles.mobile)}>
            {props.isMobile ? (
              <>
                <NodejsLogoSVG size={24} />
                <KuberLogoSVG size={24} />
                <NginxLogoSVG size={24} />
              </>
            ) : (
              <>
                <StrongSwanLogoSVG size={24} />
                <KuberLogoSVG size={24} />
                <NodejsLogoSVG size={24} />
                <NginxLogoSVG size={24} />
                <UbuntuLogoSVG size={24} />
                <GigaChatLogoSVG size={24} />
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
