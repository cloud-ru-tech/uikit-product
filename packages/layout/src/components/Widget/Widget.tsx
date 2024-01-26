import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type WidgetProps = WithSupportProps<{
  title: string;
  emblem?: Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;
  headerSlot?: ReactNode;
  children?: ReactNode;
  className?: string;
}>;

export function Widget({ title, emblem, headerSlot, className, children, ...rest }: WidgetProps) {
  return (
    // TODO: typescript error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div className={cn(styles.widget, className)} {...extractSupportProps(rest)}>
      <div className={styles.widgetHeading}>
        <div className={styles.widgetHeader}>
          {emblem && <IconPredefined {...emblem} size='m' />}

          <Typography.SansTitleM tag='div' className={styles.widgetTitle}>
            <TruncateString text={title} />
          </Typography.SansTitleM>
        </div>

        {headerSlot && <div className={styles.widgetHeaderSlot}>{headerSlot}</div>}
      </div>

      <Typography.SansBodyM tag='div' className={styles.widgetContent}>
        {children}
      </Typography.SansBodyM>
    </div>
  );
}
