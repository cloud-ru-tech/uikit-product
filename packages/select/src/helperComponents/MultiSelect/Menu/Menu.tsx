import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { components as ReactSelectComponents, MenuProps } from 'react-select';

import { MultiselectOptionType } from '../../../helpers/types';
import { InputSearch } from '../../Shared/InputSearch';
import * as S from './styled';

export function Menu(props: MenuProps<MultiselectOptionType, true>): JSX.Element {
  const {
    children,
    selectProps: { inputValue = '', isLoading, isMenuSearch, onInputChange, onMenuInputFocus },
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    if (onInputChange) {
      onInputChange(value, { action: 'input-change' });
    }
  };

  const handleFocus = useCallback(() => {
    if (isMenuSearch) {
      inputRef.current?.focus();
    }
  }, [isMenuSearch]);

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    handleFocus();
  };

  useEffect(handleFocus, [handleFocus]);

  return (
    <ReactSelectComponents.Menu {...props}>
      <>
        {isMenuSearch && !isLoading && (
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
