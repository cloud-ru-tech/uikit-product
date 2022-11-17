import { ReactNode, useState } from 'react';

import { CopyButton } from '@sbercloud/uikit-product-button';
import { InputPrivate } from '@sbercloud/uikit-product-input-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SecuredIcon } from './components';
import { Types } from './constants';
import { Container, IconsContainer, StyledInputPrivate, StyledTextareaPrivate } from './styled';

export type TextFieldProps = WithSupportProps<{
  className?: string;
  type?: Types;
  text: string;
  extraIcons?: ReactNode;
  allowCopy?: boolean;
  onRequestSecuredField?: () => Promise<{ text?: string; preventAction?: boolean } | void>;
}>;

export function TextField({
  className,
  type = Types.OneLine,
  text,
  extraIcons,
  allowCopy = true,
  onRequestSecuredField,
  ...rest
}: TextFieldProps) {
  const isPassword = type === Types.Password;
  const isOneLine = type === Types.OneLine || isPassword;
  const isMultiLine = type === Types.MultiLine;

  const [secureIconLoading, setSecureIconLoading] = useState<boolean>(false);
  const [copyButtonLoading, setCopyButtonLoading] = useState<boolean>(false);
  const [isSecured, setIsSecured] = useState<boolean>(isPassword);
  const [isSecuredFieldRequested, setIsIsSecuredFieldRequested] = useState<boolean>(false);

  const hasActionButtons = allowCopy || Boolean(extraIcons);

  const onShowSecuredIconClick = async () => {
    if (!onRequestSecuredField || isSecuredFieldRequested) {
      setIsSecured(false);
      return;
    }

    setSecureIconLoading(true);

    const response = await onRequestSecuredField();

    if (!response?.preventAction) {
      setIsSecured(false);
      setIsIsSecuredFieldRequested(true);
    }

    setSecureIconLoading(false);
  };

  const onCopyButtonClick = async () => {
    if (!onRequestSecuredField || isSecuredFieldRequested) {
      return;
    }

    setCopyButtonLoading(true);

    const response = await onRequestSecuredField();

    setCopyButtonLoading(false);
    !response?.preventAction && setIsIsSecuredFieldRequested(true);

    return response?.preventAction ? { preventCopy: true } : { textToCopy: response?.text };
  };

  const hideSecuredText = () => setIsSecured(true);

  const inputType = isSecured ? InputPrivate.types.Password : InputPrivate.types.Text;
  const content = isOneLine ? (
    <StyledInputPrivate
      value={text}
      disabled
      type={inputType}
      data-test-id='text-field__value'
      data-secured={isPassword}
      data-has-action-buttons={hasActionButtons || undefined}
    />
  ) : (
    <StyledTextareaPrivate
      value={text}
      disabled
      data-test-id='text-field__value'
      data-has-action-buttons={hasActionButtons || undefined}
      minRows={1}
    />
  );

  const isDisabled = secureIconLoading || copyButtonLoading;

  return (
    <Container className={className} {...extractSupportProps(rest)}>
      <IconsContainer data-multiline={isMultiLine || undefined}>
        {extraIcons}
        {isPassword && (
          <SecuredIcon
            loading={secureIconLoading}
            isSecured={isSecured}
            disabled={isDisabled}
            onShowSecuredIconClick={onShowSecuredIconClick}
            hideSecuredText={hideSecuredText}
          />
        )}
        {allowCopy && (
          <CopyButton
            text={text}
            disabled={isDisabled}
            data-test-id='text-field__copy-button'
            onClickBeforeCopy={onCopyButtonClick}
          />
        )}
      </IconsContainer>
      {content}
    </Container>
  );
}

TextField.types = Types;
