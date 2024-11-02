import cn from 'classnames';
import { CSSProperties, MouseEventHandler, ReactNode, RefObject } from 'react';

import { Size } from '@snack-uikit/input-private';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { VALIDATION_STATE } from '../../constants';
import { ContainerVariant, ValidationState } from '../../types';
import styles from './styles.module.scss';

export type FieldContainerPrivateProps = WithSupportProps<{
  className?: string;
  children: ReactNode;
  size: Size;
  validationState: ValidationState;
  variant: ContainerVariant;
  disabled: boolean;
  readonly: boolean;
  focused?: boolean;
  selectable?: boolean;
  style?: CSSProperties;
  prefix?: ReactNode;
  postfix?: ReactNode;
  inputRef: RefObject<HTMLElement>;
  onClick?: MouseEventHandler;
}>;

export function FieldContainerPrivate({
  className,
  children,
  size,
  validationState,
  variant,
  disabled,
  readonly,
  focused,
  selectable,
  style,
  prefix,
  postfix,
  onClick,
  ...rest
}: FieldContainerPrivateProps) {
  const handleContainerClick: MouseEventHandler<HTMLDivElement> = event => {
    if (disabled) {
      return;
    }
    onClick?.(event);
  };

  return (
    <div
      className={cn(className, styles.container)}
      style={style}
      data-size={size}
      data-validation={disabled || readonly ? VALIDATION_STATE.Default : validationState}
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-readonly={readonly || undefined}
      data-focused={focused || undefined}
      data-selectable={selectable || undefined}
      data-test-id='field-container-private'
      onClick={handleContainerClick}
      role='textbox'
      tabIndex={-1}
      {...extractSupportProps(rest)}
    >
      {prefix && (
        <span className={styles.prefix} data-test-id='field-container-private__prefix-icon'>
          {prefix}
        </span>
      )}

      {children}

      {postfix && <span className={styles.postfix}>{postfix}</span>}
    </div>
  );
}
