import { ChangeEvent, DragEvent, MouseEvent, ReactNode, useRef, useState } from 'react';

import { Link } from '@sbercloud/uikit-react-link';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { Container, H4Styled, Header, HiddenInput, Text2Styled, linkClassName } from './styled';

export type DropZoneProps = WithSupportProps<{
  onFileSelected(files: File[]): void;
  isMultiple?: boolean;
  accept?: string;
  content?: ReactNode;
}>;

export const DropZone = ({
  onFileSelected,
  isMultiple = true,
  accept,
  content,
  ...rest
}: DropZoneProps): JSX.Element => {
  const [isOver, setIsOver] = useState(false);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

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
      data-over={isOver}
    >
      <Header>
        <H4Styled>Перетащите файл сюда или&nbsp;</H4Styled>
        <Link text='загрузите его' onClick={handleAttachFile} className={linkClassName} />
      </Header>

      <Text2Styled>{content}</Text2Styled>

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
};
