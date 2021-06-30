import { useCallback, useMemo } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { AddTag } from '../AddTag';
import { StyledSearchInput, searchInputWrapClassname } from './styled';

export const Menu = (props: React.ComponentProps<typeof ReactSelectComponents.Menu>): JSX.Element => {
  const {
    children,
    className,
    cx,
    getStyles,
    selectProps: { inputValue: search, onSearch, dropdownPlacement, language },
  } = props;

  const dropdownStyles = useMemo(
    () => (dropdownPlacement === 'right' ? { right: 0 } : { left: 0 }),
    [dropdownPlacement],
  );

  const getInstance = useCallback(instance => {
    instance?.current?.focus();
  }, []);

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
        language={language}
        getInstance={getInstance}
        value={search}
        onChange={onSearch}
        wrapperClassName={searchInputWrapClassname}
      />
      {children}
      <AddTag {...props} />
    </div>
  );
};
