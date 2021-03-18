import { forwardRef, useCallback, useState, useEffect } from 'react';

import { CloseSVG, EyeSVG, EyeClosedSVG } from '@aicloud/ui-icons';

import { CopyButton } from 'components/Button';
import { IInputProps } from 'components/Input/helpers/types';
import { getInputType } from 'components/Input/helpers/getInputType';
import { copyText } from 'utils/copyText';

import {
  Label,
  StyledWrap,
  StyledInput,
  StyledClearButton,
  StyledIconWrapper,
  StyledInputWrapper,
  StyledSecurityButton,
} from './styled';

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type = 'default',
      onChange,
      value = '',
      placeholder,
      className,
      wrapperClassName,
      postfix,
      allowClear,
      allowCopy,
      numberMax,
      numberMin,
      label,
      labelMinWidth,
      disabled = false,
    },
    ref,
  ) => {
    const [correctValue, setCorrectValue] = useState(value);
    const [isViewMode, setViewMode] = useState(type !== 'security');

    const handleChange = useCallback(
      e => {
        if (
          (numberMin !== undefined || numberMax !== undefined) &&
          type === 'number'
        ) {
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

          if (numberMin && val < numberMin) {
            val = numberMin;
          }

          if (numberMax && val > numberMax) {
            val = numberMax;
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
      setCorrectValue('');
      const e = {
        target: {
          value: '',
        },
      };
      handleChange(e);
    };

    const handleCopyButtonClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void => {
      e.stopPropagation();
    };

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();

      if (!allowCopy || !correctValue) {
        return;
      }

      copyText(correctValue);
    };

    return (
      <StyledWrap>
        {label && <Label minWidth={labelMinWidth || 'none'}>{label}</Label>}
        <StyledInputWrapper ref={ref} className={wrapperClassName}>
          <div onClick={handleInputClick}>
            <StyledInput
              allowCopy={allowCopy}
              type={getInputType({ type, isViewMode })}
              onChange={handleChange}
              value={correctValue}
              data-type={type}
              data-disabled={disabled}
              className={className}
              placeholder={placeholder}
              min={numberMin}
              max={numberMax}
              step={1}
              disabled={disabled}
            />
          </div>
          <StyledIconWrapper>
            {!disabled && allowClear && correctValue && correctValue !== '' && (
              <StyledClearButton onClick={handleClickClear}>
                <CloseSVG />
              </StyledClearButton>
            )}
            <div>{postfix}</div>
            {type === 'security' ? (
              <StyledSecurityButton
                onClick={(): void => setViewMode(!isViewMode)}
              >
                {isViewMode ? <EyeSVG /> : <EyeClosedSVG />}
              </StyledSecurityButton>
            ) : null}
            {allowCopy && (
              <CopyButton
                text={value.toString()}
                onClick={handleCopyButtonClick}
              />
            )}
          </StyledIconWrapper>
        </StyledInputWrapper>
      </StyledWrap>
    );
  },
);
