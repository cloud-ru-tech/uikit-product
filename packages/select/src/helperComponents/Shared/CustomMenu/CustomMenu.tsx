import { css } from '@linaria/core';
import { useEffect, useRef } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

import { StyledInputSearch } from './styled';

const { COLORS_SELECT } = DEPRECATED_EXPORT_VARS;

const inputWrapperClassName = css`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #cccccc;
  padding: 8px;
  background: var(${COLORS_SELECT.BACKGROUND});
`;

export const CustomMenu = (props: React.ComponentProps<typeof ReactSelectComponents.Menu>): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
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
      onSearch('');
    };
  }, [inputRef, onSearch]);

  return (
    <div style={{ ...getStyles('menu', props), overflow: 'hidden' }} className={cx({ menu: true }, className)}>
      {isSearchableCustom && (
        <StyledInputSearch ref={inputRef} value={searchValue} onChange={onSearch} className={inputWrapperClassName} />
      )}
      {children}
      {footer}
    </div>
  );
};
