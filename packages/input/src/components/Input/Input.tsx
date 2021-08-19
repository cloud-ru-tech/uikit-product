import copyText from 'copy-to-clipboard';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { CopyButton } from '@sbercloud/uikit-react-button';
import { CloseInterfaceSVG, EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { getInputType } from '../../helpers/getInputType';
import { InputElementType, InputProps, InputTypes } from '../../helpers/types';
import {
  BasicButtonWrapper,
  Label,
  OpenDialogButton,
  OpenDialogButtonWrapper,
  StyledClearButton,
  StyledIconWrapper,
  StyledInput,
  StyledInputWrapper,
  StyledSecurityButton,
  StyledWrap,
} from './styled';

export type { InputProps };

export const Input = ({
  type = InputTypes.default,
  onChange,
  value = '',
  defaultValue,
  placeholder,
  wrapperClassName,
  copyButtonClassName,
  postfix,
  allowClear,
  allowCopy,
  max,
  min,
  label,
  labelMinWidth,
  disabled = false,
  wrapperRef,
  error,
  className,
  getInstance,
  name,
  autoComplete,
  onOpenDialog,
  onBlur,
  onFocus,
  ...rest
}: WithSupportProps<InputProps>) => {
  const inputEl = useRef<InputElementType>(null);
  const [correctValue, setCorrectValue] = useState(value);
  const [isViewMode, setViewMode] = useState(type !== 'security');

  useEffect(() => {
    getInstance?.(inputEl as React.RefObject<HTMLInputElement>);
  }, [getInstance, inputEl]);

  const handleChange = useCallback(
    e => {
      if ((min !== undefined || max !== undefined) && type === 'number') {
        if (e.target.value === '') {
          setCorrectValue('');
          onChange?.(e);
          return;
        }

        if (!/^[0-9]+$/.test(e.target.value) && e.target.value !== '') {
          e.preventDefault();
          return;
        }

        let val = e.target.value;

        if (min && val < min) {
          val = min;
        }

        if (max && val > max) {
          val = max;
        }
        e.target.value = val;
      }
      setCorrectValue(e.target.value);

      if (onChange) {
        onChange(e);
      }
    },
    [max, min, onChange, type],
  );

  useEffect(() => {
    setCorrectValue(value);
  }, [value]);

  const handleClickClear = () => {
    if (!inputEl.current) return;
    const lastValue = inputEl.current?.value;
    const event = new Event('change', { bubbles: true });
    inputEl.current.value = '';
    inputEl.current._valueTracker.setValue(lastValue);
    inputEl.current.dispatchEvent(event);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (!allowCopy || !correctValue) {
      return;
    }

    copyText(correctValue.toString());
  };

  const paddingRight = useMemo(() => {
    let result = 0;
    const paddingConfig = [
      {
        enabled: allowCopy,
        padding: 40,
      },
      {
        enabled: allowClear && correctValue && correctValue !== '',
        padding: 44,
      },
      {
        enabled: !!postfix,
        padding: 40,
      },
      {
        enabled: !!onOpenDialog,
        padding: 44,
      },
    ];

    paddingConfig.forEach(paddingItem => {
      if (paddingItem.enabled) {
        result = result + paddingItem.padding;
      }
    });

    return result;
  }, [allowCopy, allowClear, postfix, onOpenDialog, correctValue]);

  return (
    <StyledWrap className={wrapperClassName} ref={wrapperRef} {...extractSupportProps(rest)}>
      {label && <Label minWidth={labelMinWidth || 'none'}>{label}</Label>}
      <StyledInputWrapper>
        <div role='presentation' onClick={handleInputClick}>
          <StyledInput
            ref={inputEl}
            paddingRight={paddingRight}
            allowCopy={allowCopy}
            type={getInputType({ type, isViewMode })}
            onChange={handleChange}
            value={correctValue}
            data-type={type}
            data-disabled={disabled}
            className={className}
            placeholder={placeholder}
            min={min}
            max={max}
            step={1}
            defaultValue={defaultValue}
            disabled={disabled}
            data-error={error || undefined}
            name={name}
            autoComplete={autoComplete}
            onBlur={onBlur}
            onFocus={onFocus}
            data-test-id='input__value'
          />
        </div>
        <StyledIconWrapper>
          <BasicButtonWrapper>
            {!disabled && allowClear && correctValue && correctValue !== '' && (
              <StyledClearButton onClick={handleClickClear} data-test-id='input__clear-btn'>
                <CloseInterfaceSVG />
              </StyledClearButton>
            )}
            {postfix}
            {type === 'security' ? (
              <StyledSecurityButton onClick={(): void => setViewMode(!isViewMode)} data-test-id='input__security-btn'>
                {isViewMode ? <EyeClosedInterfaceSVG /> : <EyeOpenedInterfaceSVG />}
              </StyledSecurityButton>
            ) : null}
            {allowCopy && (
              <CopyButton text={value.toString()} className={copyButtonClassName} data-test-id='input__copy-btn' />
            )}
          </BasicButtonWrapper>
          {onOpenDialog && (
            <OpenDialogButtonWrapper onClick={onOpenDialog} data-test-id='input__open-dialog-btn'>
              <OpenDialogButton />
            </OpenDialogButtonWrapper>
          )}
        </StyledIconWrapper>
      </StyledInputWrapper>
    </StyledWrap>
  );
};

Input.types = InputTypes;
