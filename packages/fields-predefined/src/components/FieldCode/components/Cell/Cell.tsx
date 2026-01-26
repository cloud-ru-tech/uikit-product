import cn from 'classnames';
import { forwardRef } from 'react';

import { FieldText, FieldTextProps } from '@snack-uikit/fields';

import { ZERO_WIDTH_SPACE } from '../../constants';
import styles from './styles.module.scss';

type CellProps = {
  /** CSS-класс ячейки кода */
  className?: string;
  /** Растягивать ячейку на всю доступную ширину */
  stretchCells?: boolean;
} & Pick<
  FieldTextProps,
  'size' | 'disabled' | 'value' | 'autoComplete' | 'onKeyDown' | 'onPaste' | 'onChange' | 'validationState'
>;

export const Cell = forwardRef<HTMLInputElement, CellProps>((props, ref) => {
  const { className, size, stretchCells, value, ...fieldCellProps } = props;

  return (
    <FieldText
      inputMode='numeric'
      ref={ref}
      className={cn(styles.cell, className)}
      data-size={size}
      data-stretch-cells={stretchCells || undefined}
      showClearButton={false}
      value={value === ZERO_WIDTH_SPACE ? '' : value}
      size={size}
      {...fieldCellProps}
    />
  );
});
