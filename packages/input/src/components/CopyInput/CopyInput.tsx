import { useCallback, useMemo, useState } from 'react';

import { ButtonIconTransparent, CopyButton } from '@sbercloud/uikit-react-button';
import { EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import {
  Label,
  StyledIconWrapper,
  StyledInput,
  StyledInputWrapper,
  StyledWrap,
  copyButtonClassName,
  securityButtonClassName,
} from './styled';

export type CopyInputProps = {
  value: string;
  label?: string;
  security?: boolean;
  labelMinWidth?: string;
  wrapperClassName?: string;
  onCopy?: () => void;
};

export const CopyInput: React.FC<WithSupportProps<CopyInputProps>> = ({
  value,
  label,
  onCopy,
  security,
  labelMinWidth,
  wrapperClassName,
  ...rest
}) => {
  const [showContent, setShowContent] = useState(!security);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();

      onCopy?.();
    },
    [onCopy],
  );

  const handleSecurityButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      setShowContent(!showContent);
    },
    [showContent],
  );

  const valueToShow = useMemo(() => {
    if (showContent) {
      return value;
    }

    return value.replaceAll(/./gi, '•');
  }, [showContent, value]);

  return (
    <StyledWrap className={wrapperClassName} {...extractSupportProps(rest)}>
      {label && (
        <Label minWidth={labelMinWidth || 'none'} data-test-id='copy-input__label'>
          {label}
        </Label>
      )}
      <StyledInputWrapper labelMinWidth={labelMinWidth}>
        <StyledInput hasSecurityIcon={!!security} onClick={handleInputClick} data-test-id='copy-input__value'>
          {valueToShow}
        </StyledInput>
        {security ? (
          <StyledIconWrapper right={36}>
            <ButtonIconTransparent
              onClick={handleSecurityButtonClick}
              className={securityButtonClassName}
              data-test-id='copy-input__security-btn'
              icon={showContent ? EyeOpenedInterfaceSVG : EyeClosedInterfaceSVG}
            />
          </StyledIconWrapper>
        ) : null}
        <StyledIconWrapper right={12}>
          <CopyButton
            text={value.toString()}
            onClick={onCopy}
            className={copyButtonClassName}
            data-test-id='copy-input__copy-btn'
          />
        </StyledIconWrapper>
      </StyledInputWrapper>
    </StyledWrap>
  );
};
