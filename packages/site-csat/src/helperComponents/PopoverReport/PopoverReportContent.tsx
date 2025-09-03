import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import { ContentDislikeCsat } from '../ContentDislikeCsat';
import styles from './styles.module.scss';

type PopoverReportProps = {
  onSubmit: (textComment: string) => void;
  loadingButton?: boolean;
  onOpenClosePopover: () => void;
  onClickForm?: () => void;
};

export function PopoverReportContent({ onSubmit, onOpenClosePopover, loadingButton, onClickForm }: PopoverReportProps) {
  return (
    <div className={styles.popoverContent}>
      <div className={styles.popoverTitleBlock}>
        <div className={styles.popoverTitleDescription}>
          <Typography.SansTitleM className={styles.popoverTitle}>Спасибо за отзыв!</Typography.SansTitleM>
          <Typography.SansBodyS className={styles.popoverDescription}>
            Поделитесь, что именно не так?
          </Typography.SansBodyS>
        </div>
        <CloseInterfaceSVG className={styles.iconClose} onClick={onOpenClosePopover} />
      </div>
      <ContentDislikeCsat onClickForm={onClickForm} loadingButton={loadingButton} onSubmit={onSubmit} />
    </div>
  );
}
