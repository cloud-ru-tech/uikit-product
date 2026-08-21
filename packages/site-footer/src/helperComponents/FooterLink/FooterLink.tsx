import cn from 'classnames';
import { MouseEvent } from 'react';

import { Typography } from '@snack-uikit/typography';

import { FOOTER_ELEMENT } from '../../constants';
import { useFooterClick } from '../../hooks';
import { type FooterHandlers, type FooterLinkItem } from '../../types';
import { isExternalUrl } from '../../utils';
import styles from './styles.module.scss';

export type FooterLinkProps = FooterLinkItem &
  FooterHandlers & {
    className?: string;
  };

export function FooterLink({ text, url, target, id, onClick, className, onElementClick, onNavigate }: FooterLinkProps) {
  const handleClick = useFooterClick({ onElementClick, onNavigate });
  const dataQa = `footer-link-${id ?? url ?? text}`;

  const onLinkClick = (event: MouseEvent<HTMLElement>) =>
    handleClick(
      { element: FOOTER_ELEMENT.Link, id, text, url, target, isExternal: isExternalUrl(url) },
      event,
      onClick,
    );

  const label = (
    <Typography className={styles.text} family='sans' purpose='body' size='m'>
      {text}
    </Typography>
  );

  if (!url) {
    return (
      <button
        type='button'
        data-qa={dataQa}
        className={cn(styles.root, styles.button, className)}
        onClick={onLinkClick}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      data-qa={dataQa}
      className={cn(styles.root, className)}
      href={url}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      onClick={onLinkClick}
    >
      {label}
    </a>
  );
}
