import { ChangeEvent, cloneElement, ReactElement, useRef } from 'react';

import { HiddenInput } from './styled';

export type FileUploadProps = {
  children: ReactElement;
  onFileSelected(e: ChangeEvent<HTMLInputElement>): void;
  isMultiple?: boolean;
  accept?: string;
};

export function FileUpload({ isMultiple, onFileSelected, accept, children }: FileUploadProps) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <>
      {cloneElement(children, { onClick: handleButtonClick })}
      <HiddenInput
        onChange={onFileSelected}
        multiple={isMultiple}
        ref={hiddenFileInput}
        type='file'
        accept={accept}
        // to trigger onChange event when the same files were attached
        onClick={event => {
          (event.target as HTMLInputElement).value = '';
        }}
      />
    </>
  );
}
