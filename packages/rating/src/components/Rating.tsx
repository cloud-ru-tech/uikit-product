import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@cloud-ru/uikit-product-utils';
import { Favorite } from '@snack-uikit/toggles';

import styles from './styles.module.scss';

export type RatingProps = WithSupportProps<{
  value?: number;
  disabled?: boolean;
  elements?: number;
  className?: string;
  onChange: (value: number) => void;
}>;

export function Rating({ value, elements = 5, disabled = false, onChange, className, ...rest }: RatingProps) {
  const handleMarkClick = (value: number) => {
    onChange(value);
  };

  const marksArray = Array.from({ length: elements }, (_, index) => index + 1);

  return (
    <div {...extractSupportProps(rest)} className={cn(className, styles.markContainer)}>
      {marksArray.map(mark => (
        <label key={mark} className={styles.toggleWrapper} htmlFor={String(mark)}>
          <Favorite
            id={String(mark)}
            onClick={() => handleMarkClick(mark)}
            disabled={disabled || undefined}
            checked={(value && value >= mark) || undefined}
            icon='star'
          />
        </label>
      ))}
    </div>
  );
}
