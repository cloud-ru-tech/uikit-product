import { ReactNode, useState } from 'react';

import { ButtonIconTransparent, CopyButton } from '@sbercloud/uikit-react-button';
import { EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { InputPrivate } from '@sbercloud/uikit-react-input-private';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from './../helpers/texts-provider';
import { Types } from './constants';
import { Container, IconsContainer, StyledInputPrivate, StyledTextareaPrivate } from './styled';

export type TextFieldProps = WithSupportProps<{
  className?: string;
  type?: Types;
  text: string;
  extraIcons?: ReactNode;
  allowCopy?: boolean;
}>;

export function TextField({
  className,
  type = Types.OneLine,
  text,
  extraIcons,
  allowCopy = true,
  ...rest
}: TextFieldProps) {
  const isPassword = type === Types.Password;
  const isOneLine = type === Types.OneLine || isPassword;
  const isMultiLine = type === Types.MultiLine;
  const [isSecured, setIsSecured] = useState(isPassword);
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const hasActionButtons = allowCopy || Boolean(extraIcons);

  const inputType = isSecured ? InputPrivate.types.Password : InputPrivate.types.Text;
  const content = isOneLine ? (
    <StyledInputPrivate
      value={text}
      disabled
      type={inputType}
      data-test-id='text-field__value'
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

  const securedIcon = (
    <ButtonIconTransparent
      data-test-id='text-field__show-hide-button'
      variant={ButtonIconTransparent.variants.Default}
      onClick={() => setIsSecured(!isSecured)}
      icon={isSecured ? <EyeOpenedInterfaceSVG /> : <EyeClosedInterfaceSVG />}
      tooltip={{
        content: textProvider(languageCode, isSecured ? Texts.show : Texts.hide),
        placement: ButtonIconTransparent.placements.Top,
      }}
    />
  );

  return (
    <Container className={className} {...extractSupportProps(rest)}>
      <IconsContainer data-multiline={isMultiLine || undefined}>
        {extraIcons}
        {isPassword && securedIcon}
        {allowCopy && <CopyButton text={text} data-test-id='text-field__copy-button' />}
      </IconsContainer>
      {content}
    </Container>
  );
}

TextField.types = Types;
