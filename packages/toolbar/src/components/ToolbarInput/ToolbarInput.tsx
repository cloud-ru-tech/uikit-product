import { CloseSVG, SearchSVG } from '@sbercloud/icons';
import { Input, InputProps } from '@sbercloud/uikit-react-input';
import { FC, createRef, useEffect, useState } from 'react';

import { InputWrapStyled, crossIconClassName, inputClassName, searchIconClassname } from './styled';

export interface ToolbarInputProps extends Omit<InputProps, 'onChange'> {
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
        type={Input.types.embed}
        postfix={
          value ? (
            <CloseSVG
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
