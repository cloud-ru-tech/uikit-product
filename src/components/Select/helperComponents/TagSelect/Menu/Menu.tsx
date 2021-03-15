import { css } from '@linaria/core';
import { components as ReactSelectComponents } from 'react-select';

import { StyledSearchInput } from './styled';

const searchInputWrapClassname = css`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #cccccc;
  padding: 4px 0;
`;

export const Menu = (
  props: React.ComponentProps<typeof ReactSelectComponents.Menu>,
): JSX.Element => {
  const {
    children,
    className,
    cx,
    getStyles,
    selectProps: { inputValue: search, onSearch, dropdownPlacement },
  } = props;

  const dropdownStyles =
    dropdownPlacement === 'right' ? { right: 0 } : { left: 0 };

  return (
    <div
      style={{
        ...getStyles('menu', props),
        minWidth: 250,
        overflow: 'hidden',
        ...dropdownStyles,
      }}
      className={cx({ menu: true }, className)}
    >
      <StyledSearchInput
        value={search}
        // TODO: check type error
        onChange={(search: string): void => onSearch(search)}
        wrapperClassName={searchInputWrapClassname}
      />
      {children}
    </div>
  );
};
