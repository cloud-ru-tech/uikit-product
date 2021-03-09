import React from 'react';
import { components as ReactSelectComponents } from 'react-select';

export const Menu = (
  props: React.ComponentProps<typeof ReactSelectComponents.Menu>,
): JSX.Element => {
  const {
    children,
    className,
    cx,
    getStyles,
    selectProps: { dropdownPlacement },
  } = props;

  const dropdownStyles =
    dropdownPlacement === 'right' ? { right: 0 } : { left: 0 };

  return (
    <div
      style={{ ...getStyles('menu', props), ...dropdownStyles }}
      className={cx({ menu: true }, className)}
    >
      {children}
    </div>
  );
};
