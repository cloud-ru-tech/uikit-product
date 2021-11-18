import db from 'mime-db';

import { FileProps } from '../types';

export const getFileType = (file: FileProps): string | undefined => {
  let fileType = file.MIMEType && db[file.MIMEType]?.extensions?.[0];

  fileType ??= file.name.split('.').pop();

  if (!fileType || fileType === file.name) {
    return undefined;
  }

  return fileType.toUpperCase();
};
