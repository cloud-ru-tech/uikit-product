import { ReactNode } from 'react';

import { CopyButton } from '@sbercloud/uikit-react-button';
import { InputPrivate } from '@sbercloud/uikit-react-input-private';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

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
  const isOneLine = type === Types.OneLine;
  const isMultiLine = type === Types.MultiLine;

  const hasActionButtons = allowCopy || Boolean(extraIcons);

  const content = isOneLine ? (
    <StyledInputPrivate
      value={text}
      disabled
      type={InputPrivate.types.Text}
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

  return (
    <Container className={className} {...extractSupportProps(rest)}>
      <IconsContainer data-multiline={isMultiLine || undefined}>
        {extraIcons}
        {allowCopy && <CopyButton text={text} data-test-id='text-field__copy-button' />}
      </IconsContainer>
      {content}
    </Container>
  );
}

TextField.types = Types;
