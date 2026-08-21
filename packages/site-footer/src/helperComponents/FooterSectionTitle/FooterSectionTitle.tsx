import { MouseEvent } from 'react';

import { ChevronRightSVG } from '@snack-uikit/icons';
import { Typography } from '@snack-uikit/typography';

import { FOOTER_ELEMENT } from '../../constants';
import { useFooterClick } from '../../hooks';
import { type FooterHandlers, type FooterSectionItem } from '../../types';
import { isExternalUrl } from '../../utils';
import styles from './styles.module.scss';

export type FooterSectionTitleProps = Omit<FooterSectionItem, 'links'> &
  FooterHandlers & {
    sectionId: string;
  };

export function FooterSectionTitle({
  title,
  titleUrl,
  titleTarget,
  id,
  sectionId,
  onElementClick,
  onNavigate,
}: FooterSectionTitleProps) {
  const handleClick = useFooterClick({ onElementClick, onNavigate });
  const dataQa = `footer-section-title-${sectionId}`;

  if (!titleUrl) {
    return (
      <Typography className={styles.title} family='sans' purpose='label' tag='h3' size='l' data-qa={dataQa}>
        {title}
      </Typography>
    );
  }

  const onTitleClick = (event: MouseEvent<HTMLElement>) =>
    handleClick(
      {
        element: FOOTER_ELEMENT.SectionTitle,
        id,
        text: title,
        url: titleUrl,
        target: titleTarget,
        isExternal: isExternalUrl(titleUrl),
      },
      event,
    );

  return (
    <a
      data-qa={dataQa}
      className={styles.titleLink}
      href={titleUrl}
      target={titleTarget}
      rel={titleTarget === '_blank' ? 'noreferrer' : undefined}
      onClick={onTitleClick}
    >
      <Typography className={styles.title} family='sans' purpose='label' tag='h3' size='l'>
        {title}
        <ChevronRightSVG className={styles.titleIcon} size={16} />
      </Typography>
    </a>
  );
}
