import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';

import { ExpertDetails } from '../../components/SectionExpertsCarousel/types';
import styles from './styles.module.scss';

export type ExpertProps = ExpertDetails & {
  className?: string;
};

export function Expert({ image, name, surname, jobTitle, className }: ExpertProps) {
  return (
    <div className={cn(styles.expert, className)}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageBackground}></div>
        <img src={image} alt='expert' className={styles.image} />
      </div>
      <div className={styles.personalDetails}>
        <Typography.SansTitleL className={styles.detailsColor}>{name}</Typography.SansTitleL>
        <Typography.SansTitleL className={styles.detailsColor}>{surname}</Typography.SansTitleL>
      </div>
      <div className={styles.jobTitle}>
        <Typography.SansBodyM className={styles.detailsColor}>{jobTitle}</Typography.SansBodyM>
      </div>
    </div>
  );
}
