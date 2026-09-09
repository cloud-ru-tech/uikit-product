import cn from 'classnames';
import { MouseEvent } from 'react';

import { Typography } from '@snack-uikit/typography';

import { FOOTER_ELEMENT } from '../../constants';
import { useFooterClick } from '../../hooks';
import { type FooterCsatItem, type FooterHandlers } from '../../types';
import { isExternalUrl } from '../../utils';
import styles from './styles.module.scss';

export type FooterCsatProps = FooterCsatItem &
  FooterHandlers & {
    className?: string;
  };

export function FooterCsat({
  title,
  description,
  url,
  target,
  id,
  onClick,
  className,
  onElementClick,
  onNavigate,
}: FooterCsatProps) {
  const handleClick = useFooterClick({ onElementClick, onNavigate });
  const dataQa = `footer-csat-${id ?? url}`;

  const handleCsatClick = (event: MouseEvent<HTMLElement>) =>
    handleClick(
      { element: FOOTER_ELEMENT.Csat, id, text: title, url, target, isExternal: isExternalUrl(url) },
      event,
      onClick,
    );

  return (
    <a
      data-qa={dataQa}
      className={cn(styles.root, className)}
      href={url}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onClick={handleCsatClick}
    >
      <Typography className={styles.title} family='sans' purpose='label' size='l' data-qa={`${dataQa}-title`}>
        {title}
      </Typography>
      <Typography
        className={styles.description}
        family='sans'
        purpose='body'
        size='s'
        data-qa={`${dataQa}-description`}
      >
        {description}
      </Typography>
    </a>
  );
}
