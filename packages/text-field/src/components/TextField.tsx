import { ReactNode } from 'react';

import { CopyButton } from '@sbercloud/uikit-react-button';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Container, IconsContainer, StyledText } from './styled';

export type TextFieldProps = WithSupportProps<{
  className?: string;
  multiline?: boolean;
  text: string;
  extraIcons?: ReactNode;
}>;

export function TextField({ className, multiline = false, text, extraIcons, ...rest }: TextFieldProps) {
  return (
    <Container className={className} {...extractSupportProps(rest)}>
      <IconsContainer data-multiline={multiline || undefined}>
        {extraIcons}
        <CopyButton text={text} />
      </IconsContainer>
      <StyledText data-multiline={multiline || undefined}>{text}</StyledText>
    </Container>
  );
}
