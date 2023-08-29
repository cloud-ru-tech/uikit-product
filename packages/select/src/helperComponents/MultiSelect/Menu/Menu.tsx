import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { components as ReactSelectComponents, MenuProps } from 'react-select';

import { MultiSelectModeType, MultiSelectOptionType } from '../../../helpers/types';
import { InputSearch } from '../../Shared/InputSearch';
import * as S from './styled';

export function Menu(props: MenuProps<MultiSelectOptionType, true>): JSX.Element {
  const {
    children,
    options,
    selectProps: { inputValue = '', mode, onInputChange, onMenuInputFocus },
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const isInMenuSearch = mode.type === MultiSelectModeType.InMenuSearch;

  const handleChange = (value: string) => {
    if (onInputChange) {
      onInputChange(value, { action: 'input-change' });
    }
  };

  const handleFocus = useCallback(() => {
    if (isInMenuSearch) {
      inputRef.current?.focus();
    }
  }, [isInMenuSearch]);

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    handleFocus();
  };

  useEffect(handleFocus, [handleFocus]);

  return (
    <ReactSelectComponents.Menu {...props}>
      <>
        {isInMenuSearch && options.length > 0 && (
          <InputSearch
            ref={inputRef}
            className={S.inputSearchClassName}
            value={inputValue}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onFocus={onMenuInputFocus}
          />
        )}
        {children}
      </>
    </ReactSelectComponents.Menu>
  );
}
