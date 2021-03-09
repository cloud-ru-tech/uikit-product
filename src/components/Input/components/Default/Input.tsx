import { forwardRef, useCallback, useState, useEffect } from 'react';
import { css } from '@linaria/core';

import { CloseSVG, CopySVG, CopyCompletedSVG } from '@aicloud/ui-icons';

import { copyText } from 'utils/copyText';
import { InputProps } from 'components/Input/helpers/types';

import {
  CopyButton,
  StyledInput,
  StyledClearButton,
  StyledInputWrapper,
} from './styled';

const TYPE_SETTINGS: { [key: string]: string } = {
  security: 'password',
  number: 'number',
};

const iconStyle = css`
  transition: opacity 1s, visibility 0s;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
      disabled = false,
    },
    ref,
  ) => {
    const [correctValue, setCorrectValue] = useState(value);
    const [isCompleted, setIsCompleted] = useState(false);

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

    return (
      <StyledInputWrapper
        ref={ref}
        data-type={type}
        data-disabled={disabled}
        className={wrapperClassName}
      >
        <StyledInput
          type={TYPE_SETTINGS[type] || 'text'}
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
        {!disabled && allowClear && correctValue && correctValue !== '' && (
          <StyledClearButton onClick={handleClickClear}>
            <CloseSVG />
          </StyledClearButton>
        )}
        <div>{postfix}</div>
        {allowCopy && (
          <CopyButton
            onClick={(): void => {
              copyText(correctValue);
              setIsCompleted(true);

              setTimeout(() => {
                setIsCompleted(false);
              }, 3000);
            }}
          >
            {isCompleted ? (
              <CopyCompletedSVG className={iconStyle} />
            ) : (
              <CopySVG className={iconStyle} />
            )}
          </CopyButton>
        )}
      </StyledInputWrapper>
    );
  },
);
