import { ChangeEvent, useRef } from 'react';

import { ButtonRound } from '@sbercloud/uikit-react-button';

import { HiddenInput } from './styled';

export type FileUploadProps = {
  name: string;
  onFileSelected(e: ChangeEvent<HTMLInputElement>): void;
  isMultiple?: boolean;
  isDisabled?: boolean;
  accept?: string;
};

export function FileUpload({ name, isDisabled, isMultiple, onFileSelected, accept }: FileUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <>
      <ButtonRound
        text={name}
        disabled={isDisabled}
        onClick={handleButtonClick}
        variant={ButtonRound.variants.OutlineAccent}
      />
      <HiddenInput onChange={onFileSelected} multiple={isMultiple} ref={hiddenFileInput} type='file' accept={accept} />
    </>
  );
}
