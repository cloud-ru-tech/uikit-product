import copyText from 'copy-to-clipboard';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { CrossSVG, EyeClosedSVG, EyeSVG } from '@sbercloud/icons';
import { CopyButton } from '@sbercloud/uikit-react-button';

import { getInputType } from '../../helpers/getInputType';
import { IInputProps } from '../../helpers/types';
import {
  Label,
  StyledClearButton,
  StyledIconWrapper,
  StyledInput,
  StyledInputWrapper,
  StyledSecurityButton,
  StyledWrap,
} from './styled';

export type { IInputProps };

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      type = 'default',
      onChange,
      value = '',
      placeholder,
      className,
      wrapperClassName,
      copyButtonClassName,
      postfix,
      allowClear,
      allowCopy,
      numberMax,
      numberMin,
      label,
      labelMinWidth,
      disabled = false,
      wrapperRef,
      error,
      ...rest
    },
    ref,
  ) => {
    const [correctValue, setCorrectValue] = useState(value);
    const [isCopyCompleted, setIsCopyCompleted] = useState(false);
    const [isViewMode, setViewMode] = useState(type !== 'security');

    const handleChange = useCallback(
      e => {
        if ((numberMin !== undefined || numberMax !== undefined) && type === 'number') {
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
              ref={ref}
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
              data-error={error || undefined}
              {...rest}
            />
          </div>
          <StyledIconWrapper>
            {!disabled && allowClear && correctValue && correctValue !== '' && (
              <StyledClearButton onClick={handleClickClear}>
                <CrossSVG />
              </StyledClearButton>
            )}
            {postfix}
            {type === 'security' ? (
              <StyledSecurityButton onClick={(): void => setViewMode(!isViewMode)}>
                {isViewMode ? <EyeSVG /> : <EyeClosedSVG />}
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
  },
);
