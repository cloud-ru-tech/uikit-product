import { FC, createRef, useEffect, useState } from 'react';

import { CrossSVG, SearchSVG } from '@sbercloud/icons';
import { IInputProps, Input } from '@sbercloud/uikit-react-input';

import { InputWrapStyled, crossIconClassName, inputClassName, searchIconClassname } from './styled';

export interface ToolbarInputProps extends Omit<IInputProps, 'onChange'> {
  onChange: (value: string) => void;
}

export const ToolbarInput: FC<ToolbarInputProps> = ({ value, onChange, wrapperClassName, ...inputProps }) => {
  const inputWrapperRef = createRef<HTMLDivElement>();
  const [hasPrevSibling, setPrevSibling] = useState<undefined | boolean>();
  const [hasNextSibling, setNextSibling] = useState<undefined | boolean>();

  useEffect(() => {
    const inputWrapper = inputWrapperRef?.current;

    if (!inputWrapper) {
      return;
    }

    setPrevSibling(Boolean(inputWrapper.previousElementSibling) || undefined);
    setNextSibling(Boolean(inputWrapper.nextElementSibling) || undefined);
  }, [inputWrapperRef]);

  return (
    <InputWrapStyled
      ref={inputWrapperRef}
      data-has-prev-sibling={hasPrevSibling || undefined}
      data-has-next-sibling={hasNextSibling || undefined}
    >
      <Input
        {...inputProps}
        value={value}
        onChange={event => {
          onChange(event.target.value);
        }}
        className={inputClassName}
        wrapperClassName={wrapperClassName}
        type='embed'
        postfix={
          value ? (
            <CrossSVG
              className={crossIconClassName}
              onClick={(): void => {
                onChange('');
              }}
            />
          ) : (
            <SearchSVG className={searchIconClassname} />
          )
        }
      />
    </InputWrapStyled>
  );
};
