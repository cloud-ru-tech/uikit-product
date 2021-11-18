import { cx } from '@linaria/core';
import { MouseEvent } from 'react';

import { downloadFile } from '@sbercloud/ft-download-file';
import { formatBytes } from '@sbercloud/ft-formatters';
import { FileInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { MAX_FILENAME_LENGTH, getFileType } from '../helpers';
import { FileProps } from '../types';
import * as S from './styled';

export type DocumentProps = {
  file: FileProps;
  onClick?(file: FileProps, e?: MouseEvent): void;
  disabled?: boolean;
  className?: string;
};

export const Document = ({ file, disabled, onClick, className, ...rest }: WithSupportProps<DocumentProps>) => {
  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(file, e);
      return;
    }

    if (file.path) {
      downloadFile({
        fileName: file.name,
        path: file.path,
      });
    }
  };

  const fileName = file.displayName || file.name;
  const fileSize = file.size && formatBytes(file.size);
  const fileType = getFileType(file);

  const needsTooltip = fileName.length > MAX_FILENAME_LENGTH;

  const documentContent = (
    <S.Document data-disabled={disabled} onClick={handleClick} {...extractSupportProps(rest)}>
      <FileInterfaceSVG size={32} className={S.iconClassName} />

      <S.Content>
        <S.Name>{fileName}</S.Name>

        <S.Info>
          {fileType && <span>{fileType}</span>}

          {fileSize && <span>{fileSize}</span>}
        </S.Info>
      </S.Content>
    </S.Document>
  );

  if (needsTooltip) {
    return (
      <Tooltip content={fileName} classNameTrigger={cx(S.wrapClassName, className)}>
        {documentContent}
      </Tooltip>
    );
  }

  return <div className={cx(S.wrapClassName, className)}>{documentContent}</div>;
};
