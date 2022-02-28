import { css, cx } from '@linaria/core';

import { ANIMATIONS, DEFAULT_STYLES } from '@sbercloud/uikit-utils';

import { CommonButtonProps } from '../types';

const baseClassName = css`
  ${DEFAULT_STYLES.COMMON};
  ${DEFAULT_STYLES.BORDERLESS};

  cursor: pointer;
  text-transform: none;
  color: inherit;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: max-content;
  transition: fill ${ANIMATIONS.TRANSITION}, color ${ANIMATIONS.TRANSITION}, border-color ${ANIMATIONS.TRANSITION},
    background-color ${ANIMATIONS.TRANSITION};
  text-decoration: none;
  font-weight: normal;

  :disabled,
  &[disabled] {
    cursor: not-allowed;

    svg {
      pointer-events: none;
    }
  }

  /* чтобы к иконкам применялся align-items */
  svg {
    display: block;
  }
`;

export const BaseButton = (props: React.PropsWithChildren<CommonButtonProps>) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { disabled, onClick } = props;

    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return 'href' in props && Boolean(props.href) ? (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      {...props}
      onClick={handleClick}
      href={props.disabled ? '#' : props.href}
      target={props.target || '_blank'}
      className={cx(baseClassName, props.className)}
      tabIndex={props.disabled ? -1 : 0}
    >
      {props.children}
    </a>
  ) : (
    <button {...props} className={cx(baseClassName, props.className)} />
  );
};
