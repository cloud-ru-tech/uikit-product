import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type ItemContentProps = WithSupportProps<{
  option: string | number;
  caption?: string | number;
  description?: string;
  disabled?: boolean;
  className?: string;
}>;

export function ItemContent({ caption, description, option, className, disabled, ...rest }: ItemContentProps) {
  return (
    <div
      className={cn(styles.content, className)}
      {...extractSupportProps(rest)}
      data-size='l'
      data-disabled={disabled || undefined}
    >
      <div className={styles.headline}>
        <div className={styles.label}>
          <span data-test-id='list__base-item-option'>{option}</span>
        </div>
        {caption && <span className={styles.caption}>{caption}</span>}
      </div>

      {description && (
        <div className={styles.description}>
          <span data-test-id='list__base-item-description'>{description}</span>
        </div>
      )}
    </div>
  );
}
