import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

export type HeadlineProps = WithSupportProps<{
  title: string;
  beforeHeadline?: ReactNode;
  afterHeadline?: ReactNode;
  actions?: ReactNode;
  subHeader?: ReactNode;
  truncateTitle?: boolean;
}>;

export function Headline({
  title,
  actions,
  beforeHeadline,
  afterHeadline,
  subHeader,
  truncateTitle,
  ...rest
}: HeadlineProps) {
  const needsRender = Boolean(title || beforeHeadline || afterHeadline || subHeader || actions);

  if (!needsRender) return null;

  return (
    <div className={styles.headline} {...extractSupportProps(rest)}>
      <div className={styles.headlineLayout}>
        <div className={styles.titleLayout}>
          {beforeHeadline && <div className={styles.prefixButtonWrapper}>{beforeHeadline}</div>}
          <Typography.SansHeadlineM tag='h1' className={styles.title}>
            {truncateTitle ? <TruncateString variant='end' text={title} maxLines={1} /> : title}
          </Typography.SansHeadlineM>

          {afterHeadline && <div className={styles.statusWrapper}>{afterHeadline}</div>}
        </div>

        {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
      </div>

      {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
    </div>
  );
}
