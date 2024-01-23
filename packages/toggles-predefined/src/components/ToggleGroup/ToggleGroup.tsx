import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ToggleGroup as ToggleGroupSnack, ToggleGroupProps as ToggleGroupPropsSnack } from '@snack-uikit/toggles';

import styles from './styles.module.scss';

export type ToggleGroupProps = ToggleGroupPropsSnack &
  WithSupportProps<{
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    gap?: 's' | 'm' | 'l';
    breakpoint?: number;
  }>;
export function ToggleGroup({
  children,
  value,
  onChange,
  defaultValue,
  orientation = 'vertical',
  selectionMode = 'single',
  gap = 's',
  breakpoint = 0,
  className,
  ...rest
}: ToggleGroupProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroupSnack value={value} onChange={onChange} defaultValue={defaultValue} selectionMode={selectionMode}>
      <div
        style={{ '--toggle-group-breakpoint': `${breakpoint}px` }}
        className={cn(styles.toggleGroup, className)}
        data-orientation={orientation}
        data-gap={gap}
        {...extractSupportProps(rest)}
      >
        {children}
      </div>
    </ToggleGroupSnack>
  );
}
