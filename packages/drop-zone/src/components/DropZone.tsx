import { ChangeEvent, DragEvent, MouseEvent, ReactNode, useRef, useState } from 'react';

import { Link } from '@sbercloud/uikit-react-link';
import { WithSupportProps, extractSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../helpers/texts-provider';
import { Container, Description, H4Styled, Header, HiddenInput } from './styled';

export type DropZoneProps = WithSupportProps<{
  onFileSelected(files: File[]): void;
  isMultiple?: boolean;
  accept?: string;
  content?: ReactNode;
  className?: string;
}>;

export function DropZone({
  onFileSelected,
  isMultiple = true,
  accept,
  content,
  className,
  ...rest
}: DropZoneProps): JSX.Element {
  const [isOver, setIsOver] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const handleAttachFile = (e: MouseEvent) => {
    e.preventDefault();

    hiddenFileInput.current?.click();
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const filesArray = Array.from(e.dataTransfer.files);
    onFileSelected(filesArray);
    handleDragLeave();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsOver(true);
  };

  const handleFileSelect = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;

    const filesArray = Array.from(files);
    onFileSelected(filesArray);
  };

  return (
    <Container
      {...extractSupportProps(rest)}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-over={isOver || undefined}
      className={className}
    >
      <Header>
        <H4Styled>{textProvider(languageCode, Texts.HeaderText)}</H4Styled>
        <Link text={textProvider(languageCode, Texts.LinkText)} onClick={handleAttachFile} size={Link.sizes.Large} />
      </Header>

      <Description>{content}</Description>

      <HiddenInput
        onChange={handleFileSelect}
        multiple={isMultiple}
        ref={hiddenFileInput}
        type='file'
        accept={accept}
        // to trigger onChange event when the same files were attached
        onClick={e => {
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </Container>
  );
}
