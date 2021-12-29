import { css, cx } from '@linaria/core';

import { CommonButtonProps } from '../types';

const baseClassName = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  min-width: max-content;
  padding: 0;
  border: none;
  border-width: 0;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: normal;
  box-sizing: border-box;

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
