import { ChangeEvent, DragEvent, ReactNode, useRef, useState } from 'react';

import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../helpers/texts-provider';
import { Container, Description, H4Styled, Header, HiddenInput } from './styled';

export type DropZoneProps = WithSupportProps<{
  onFileSelected(files: File[]): void;
  title?: string;
  content?: ReactNode;
  isMultiple?: boolean;
  accept?: string;
  className?: string;
}>;

export function DropZone({
  onFileSelected,
  title,
  content,
  isMultiple = true,
  accept,
  className,
  ...rest
}: DropZoneProps): JSX.Element {
  const [isOver, setIsOver] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const handleAttachFile = () => {
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
      onClick={handleAttachFile}
    >
      <Header>
        <H4Styled>{title || textProvider(languageCode, Texts.HeaderText)}</H4Styled>
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
