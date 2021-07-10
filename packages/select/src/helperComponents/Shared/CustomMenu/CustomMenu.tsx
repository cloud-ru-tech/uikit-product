import { css } from '@linaria/core';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { useEffect, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { StyledInputSearch } from './styled';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

const inputWrapperClassName = css`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #cccccc;
  padding: 4px 0;
  background: var(${COLORS_SELECT.BACKGROUND});
`;

export const CustomMenu = (props: React.ComponentProps<typeof ReactSelectComponents.Menu>): JSX.Element => {
  const [inputRef, setInputRef] = useState<React.RefObject<HTMLInputElement>>();
  const {
    children,
    className,
    cx,
    getStyles,
    selectProps: { isSearchableCustom, searchValue, onSearch, footer },
  } = props;

  useEffect(() => {
    inputRef?.current?.focus();
    return () => {
      onSearch(undefined);
    };
  }, [inputRef, onSearch]);

  return (
    <div style={{ ...getStyles('menu', props), overflow: 'hidden' }} className={cx({ menu: true }, className)}>
      {isSearchableCustom && (
        <StyledInputSearch
          getInstance={setInputRef}
          value={searchValue}
          onChange={onSearch}
          wrapperClassName={inputWrapperClassName}
        />
      )}
      {children}
      {footer}
    </div>
  );
};
