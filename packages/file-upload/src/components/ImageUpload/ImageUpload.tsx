import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { FileUpload } from '@sbercloud/uikit-react-file-upload';

import { getFileExtension, removeExtFromFileName } from '../../utils';
import {
  FileExt,
  FileName,
  FileNameWrap,
  FileUploadWrap,
  ImagePreview,
  ImageUploadWrap,
  Info,
  InfoWrapper,
} from './styled';

export type ImageUploadProps = {
  infoText: ReactElement | string;
  uploadButtonName: string;
  maxFileSize: number;
  onImageSelected(img: File): void;
  className?: string;
};

export function ImageUpload({ maxFileSize, className, infoText, uploadButtonName, onImageSelected }: ImageUploadProps) {
  const [error, setError] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
      setImage(file);
    }
  };

  useEffect(() => {
    if (!image) return;

    if (image.size >= maxFileSize) {
      setError(true);
    } else {
      setError(false);
    }
  }, [image?.size]);

  return (
    <ImageUploadWrap className={className}>
      <ImagePreview url={image && URL.createObjectURL(image)} />
      <InfoWrapper>
        <FileUploadWrap>
          <FileUpload accept='image/*' name={uploadButtonName} onFileSelected={handleFileSelect} />
          {image && (
            <FileNameWrap>
              <FileName>{removeExtFromFileName(image.name)}.</FileName>
              <FileExt>{getFileExtension(image.type)}</FileExt>
            </FileNameWrap>
          )}
        </FileUploadWrap>
        <Info data-error={error || undefined}>{infoText}</Info>
      </InfoWrapper>
    </ImageUploadWrap>
  );
}
