import { CloseInterfaceSVG, EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { CopyButton } from '@sbercloud/uikit-react-button';
import copyText from 'copy-to-clipboard';
import { useCallback, useEffect, useRef, useState } from 'react';

import { getInputType } from '../../helpers/getInputType';
import { InputElementType, InputProps, InputTypes } from '../../helpers/types';
import {
  Label,
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
}: InputProps) => {
  const inputEl = useRef<InputElementType>(null);
  const [correctValue, setCorrectValue] = useState(value);
  const [isCopyCompleted, setIsCopyCompleted] = useState(false);
  const [isViewMode, setViewMode] = useState(type !== 'security');

  useEffect(() => {
    getInstance?.(inputEl as React.RefObject<HTMLInputElement>);
  }, [inputEl]);

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
    [onChange],
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

  const handleCopyButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (!allowCopy || !correctValue) {
      return;
    }

    setIsCopyCompleted(true);
    copyText(correctValue.toString());

    setTimeout(() => {
      setIsCopyCompleted(false);
    }, 3000);
  };

  return (
    <StyledWrap className={wrapperClassName} ref={wrapperRef}>
      {label && <Label minWidth={labelMinWidth || 'none'}>{label}</Label>}
      <StyledInputWrapper>
        <div role='presentation' onClick={handleInputClick}>
          <StyledInput
            ref={inputEl}
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
          />
        </div>
        <StyledIconWrapper>
          {!disabled && allowClear && correctValue && correctValue !== '' && (
            <StyledClearButton onClick={handleClickClear}>
              <CloseInterfaceSVG />
            </StyledClearButton>
          )}
          {postfix}
          {type === 'security' ? (
            <StyledSecurityButton onClick={(): void => setViewMode(!isViewMode)}>
              {isViewMode ? <EyeClosedInterfaceSVG /> : <EyeOpenedInterfaceSVG />}
            </StyledSecurityButton>
          ) : null}
          {allowCopy && (
            <CopyButton
              text={value.toString()}
              onClick={handleCopyButtonClick}
              className={copyButtonClassName}
              showCopyCompleted={isCopyCompleted}
            />
          )}
        </StyledIconWrapper>
      </StyledInputWrapper>
    </StyledWrap>
  );
};

Input.types = InputTypes;
