import { components as ReactSelectComponents } from 'react-select';

import { StyledSearchInput, searchInputWrapClassname } from './styled';

export const Menu = (props: React.ComponentProps<typeof ReactSelectComponents.Menu>): JSX.Element => {
  const {
    children,
    className,
    cx,
    getStyles,
    selectProps: { inputValue: search, onSearch, dropdownPlacement },
  } = props;

  const dropdownStyles = dropdownPlacement === 'right' ? { right: 0 } : { left: 0 };

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
        onChange={(val: any): void => onSearch(val)}
        wrapperClassName={searchInputWrapClassname}
      />
      {children}
    </div>
  );
};
