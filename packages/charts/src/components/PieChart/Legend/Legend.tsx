import { Fragment, MouseEvent } from 'react';

import { Divider } from '@snack-uikit/divider';
import { Link } from '@snack-uikit/link';
import { Typography } from '@snack-uikit/typography';

import { TextLike } from '../types';
import styles from './styles.module.scss';

type LegendItem = {
  label: TextLike;
  value: TextLike;
  color?: string;
  id?: string;
};

type LegendItemProps = LegendItem & {
  size: 's' | 'm' | 'l';
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function LegendItem({ color, label, value, size, onItemClick }: LegendItemProps) {
  return (
    <div className={styles.legendItemWrapper}>
      <span className={styles.legendItemTitle}>
        {color && <span className={styles.dot} style={{ '--color': color }} />}
        <Link onClick={onItemClick} text={String(label)} size={size} />
      </span>

      <span className={styles.legendValue}>{value}</span>
    </div>
  );
}

type LegendProps = {
  data: Array<LegendItem>;
  typographySize: 's' | 'm' | 'l';
  legendTitle?: string;
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>, data: LegendItem) => void;
};

export function Legend({ data, legendTitle, typographySize, onItemClick }: LegendProps) {
  return (
    <div className={styles.legend}>
      {legendTitle && (
        <>
          <Typography purpose={'label'} family={'sans'} size={typographySize}>
            {legendTitle}
          </Typography>
          <div className={styles.legendDividerWrapper}>
            <Divider />
          </div>
        </>
      )}
      {data.map((item, index) => (
        <Fragment key={`legend_${item.label}_${index}`}>
          <LegendItem
            {...item}
            size={typographySize}
            onItemClick={onItemClick ? event => onItemClick(event, item) : undefined}
          />
          {index !== data.length - 1 && (
            <div className={styles.legendDividerWrapper}>
              <Divider />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
