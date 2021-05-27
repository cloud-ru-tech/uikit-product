import { css } from '@linaria/core';
import { useEffect, useRef } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';

import { StyledInputSearch } from './styled';

const { COLORS_SELECT } = EXPORT_VARS;

const inputWrapperClassName = css`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 1px solid #cccccc;
  padding: 4px 0;
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
    (inputRef.current?.firstChild as HTMLInputElement)?.focus();

    return () => {
      onSearch(undefined);
    };
  }, [inputRef, onSearch]);

  return (
    <div style={{ ...getStyles('menu', props), overflow: 'hidden' }} className={cx({ menu: true }, className)}>
      {isSearchableCustom && (
        <StyledInputSearch
          ref={inputRef}
          value={searchValue}
          onChange={(value: any): void => {
            onSearch(value || undefined);
          }}
          wrapperClassName={inputWrapperClassName}
        />
      )}
      {children}
      {footer}
    </div>
  );
};
