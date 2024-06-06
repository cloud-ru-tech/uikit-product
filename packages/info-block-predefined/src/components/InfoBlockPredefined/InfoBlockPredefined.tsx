import { InfoBlock, InfoBlockProps } from '@snack-uikit/info-block';

import { Footer, FooterProps } from '../Footer';

export type InfoBlockPredefinedProps = Omit<InfoBlockProps, 'footer' | 'align' | 'size'> & Omit<FooterProps, 'size'>;

const SIZE = 'l';

export function InfoBlockPredefined({
  tertiaryButton,
  primaryButton,
  secondaryButton,
  ...props
}: InfoBlockPredefinedProps) {
  return (
    <InfoBlock
      size={SIZE}
      {...props}
      align='horizontal'
      footer={
        <Footer
          size={SIZE}
          tertiaryButton={tertiaryButton}
          secondaryButton={secondaryButton}
          primaryButton={primaryButton}
        />
      }
    />
  );
}
