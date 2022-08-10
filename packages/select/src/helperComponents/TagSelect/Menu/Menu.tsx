import { useEffect, useMemo, useRef } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { AddTag } from '../AddTag';
import { searchInputWrapClassname, StyledSearchInput } from './styled';

export const Menu = (props: React.ComponentProps<typeof ReactSelectComponents.Menu>): JSX.Element => {
  const {
    children,
    className,
    cx,
    getStyles,
    selectProps: { inputValue: search, onSearch, dropdownPlacement },
  } = props;

  const dropdownStyles = useMemo(
    () => (dropdownPlacement === 'right' ? { right: 0 } : { left: 0 }),
    [dropdownPlacement],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef?.current?.focus(), [inputRef.current]);

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
      <StyledSearchInput ref={inputRef} value={search || ''} onChange={onSearch} className={searchInputWrapClassname} />
      {children}
      <AddTag {...props} />
    </div>
  );
};
