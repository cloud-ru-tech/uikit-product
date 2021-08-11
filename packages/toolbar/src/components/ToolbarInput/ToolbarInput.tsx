import { FC, createRef, useEffect, useState } from 'react';

import { CloseInterfaceSVG, SearchInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Input, InputProps } from '@sbercloud/uikit-react-input';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import { InputWrapStyled, crossIconClassName, inputClassName, searchIconClassname } from './styled';

export interface ToolbarInputProps extends Omit<InputProps, 'onChange'> {
  onChange(value: string): void;
}

export const ToolbarInput: FC<WithSupportProps<ToolbarInputProps>> = ({
  value,
  onChange,
  wrapperClassName,
  ...inputAndSupportProps
}) => {
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
      data-test-id='toolbar__input'
    >
      <Input
        {...inputAndSupportProps}
        value={value}
        onChange={event => {
          onChange(event.target.value);
        }}
        className={inputClassName}
        wrapperClassName={wrapperClassName}
        type={Input.types.embed}
        postfix={
          value ? (
            <CloseInterfaceSVG
              className={crossIconClassName}
              data-test-action-id='toolbar__input-clear-btn'
              onClick={(): void => {
                onChange('');
              }}
            />
          ) : (
            <SearchInterfaceSVG className={searchIconClassname} />
          )
        }
      />
    </InputWrapStyled>
  );
};
