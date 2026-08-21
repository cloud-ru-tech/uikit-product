import { MouseEvent } from 'react';

import { LAYOUT_TYPE, WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { Typography } from '@snack-uikit/typography';

import { FOOTER_ELEMENT } from '../../constants';
import { useFooterClick } from '../../hooks';
import { type FooterHandlers, type FooterSubscribeContent } from '../../types';
import { isExternalUrl } from '../../utils';
import styles from './styles.module.scss';

export type FooterSubscribeProps = WithLayoutType<
  FooterSubscribeContent &
    FooterHandlers & {
      disabled?: boolean;
    }
>;

export function FooterSubscribe({
  title,
  description,
  buttonLabel,
  url,
  disabled = false,
  layoutType,
  onElementClick,
  onNavigate,
}: FooterSubscribeProps) {
  const handleClick = useFooterClick({ onElementClick, onNavigate });

  const isMobileTablet = layoutType === LAYOUT_TYPE.Mobile || layoutType === LAYOUT_TYPE.Tablet;

  const onSubscribeClick = (event: MouseEvent<HTMLElement>) =>
    handleClick(
      { element: FOOTER_ELEMENT.Subscribe, text: buttonLabel, url, target: '_self', isExternal: isExternalUrl(url) },
      event,
    );

  return (
    <div className={styles.root} data-layout-type={layoutType} data-qa='footer-subscribe'>
      <div className={styles.description} data-layout-type={layoutType} data-qa='footer-subscribe-description'>
        <Typography
          tag='div'
          size='l'
          family='sans'
          purpose='title'
          className={styles.title}
          data-qa='footer-subscribe-title'
        >
          {title}
        </Typography>

        <Typography
          tag='p'
          size='m'
          family='sans'
          purpose='body'
          className={styles.text}
          data-qa='footer-subscribe-text'
        >
          {description}
        </Typography>
      </div>

      <ButtonFilled
        data-qa='footer-subscribe-button'
        label={buttonLabel}
        href={url}
        fullWidth={isMobileTablet}
        size={isMobileTablet ? 'l' : 'm'}
        target='_self'
        disabled={disabled}
        onClick={onSubscribeClick}
      />
    </div>
  );
}
