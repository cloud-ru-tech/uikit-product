import copyText from 'copy-to-clipboard';
import { useCallback, useState, useMemo } from 'react';

import { Button, CopyButton } from '@sbercloud/uikit-react-button';
import { EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-react-icons';

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

export const CopyInput: React.FC<CopyInputProps> = ({
  value,
  label,
  onCopy,
  security,
  labelMinWidth,
  wrapperClassName,
}) => {
  const [isCopyCompleted, setIsCopyCompleted] = useState(false);
  const [showContent, setShowContent] = useState(!security);

  const handleCopyButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.stopPropagation();
    onCopy?.();
  }, []);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();

      setIsCopyCompleted(true);
      copyText(value);
      onCopy?.();

      setTimeout(() => {
        setIsCopyCompleted(false);
      }, 3000);
    },
    [value],
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
    <StyledWrap className={wrapperClassName}>
      {label && <Label minWidth={labelMinWidth || 'none'}>{label}</Label>}
      <StyledInputWrapper labelMinWidth={labelMinWidth}>
        <StyledInput hasSecurityIcon={!!security} onClick={handleInputClick}>
          {valueToShow}
        </StyledInput>
        {security ? (
          <StyledIconWrapper right={36}>
            <Button
              onClick={handleSecurityButtonClick}
              className={securityButtonClassName}
              variant={Button.variants.TableMenu}
            >
              {showContent ? <EyeOpenedInterfaceSVG /> : <EyeClosedInterfaceSVG />}
            </Button>
          </StyledIconWrapper>
        ) : null}
        <StyledIconWrapper right={12}>
          <CopyButton
            text={value.toString()}
            onClick={handleCopyButtonClick}
            className={copyButtonClassName}
            showCopyCompleted={isCopyCompleted}
          />
        </StyledIconWrapper>
      </StyledInputWrapper>
    </StyledWrap>
  );
};
