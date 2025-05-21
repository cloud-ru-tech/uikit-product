import { Attachment, AttachmentSquare, AttachmentSquareProps } from '@snack-uikit/attachment';
import { Scroll } from '@snack-uikit/scroll';

import styles from './styles.module.scss';

export type AttachmentsProps = {
  files: AttachmentSquareProps[];
  isMobile?: boolean;
};

export function Attachments({ files, isMobile }: AttachmentsProps) {
  if (!files.length) {
    return null;
  }

  const AttachmentComponent = isMobile ? Attachment : AttachmentSquare;

  return (
    <Scroll>
      <div className={styles.attachments}>
        {files.map((file, index) => (
          <AttachmentComponent
            key={file.file?.name || index}
            size='s'
            {...file}
            className={isMobile ? styles.attachment : undefined}
          />
        ))}
      </div>
    </Scroll>
  );
}
