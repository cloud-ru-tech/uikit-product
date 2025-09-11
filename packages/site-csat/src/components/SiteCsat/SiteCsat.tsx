import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { CheckFilledSVG } from '@snack-uikit/icons';
import { Spinner } from '@snack-uikit/loaders';
import { Typography } from '@snack-uikit/typography';

import { ContentDislikeCsat, LikeDislikeBlock } from '../../helperComponents';
import { onSubmitVariables } from '../../types';
import styles from './styles.module.scss';

export type SiteCsatProps = WithLayoutType<{
  isLoading?: boolean;
  like?: boolean;
  onSetLike: (flag: boolean) => void;
  label: string;
  dislikeCommentForm?: {
    open: boolean;
    dislikeEnabled?: boolean;
    loadingButton?: boolean;
    onClickForm(): void;
    onSubmit({ textComment, selectedChips }: onSubmitVariables): void;
    onCheckChips?(titleChip: string): void;
  };
}>;

export function SiteCsat({ isLoading, like, onSetLike, layoutType, label, dislikeCommentForm }: SiteCsatProps) {
  return (
    <div className={styles.siteCsatBlock} data-layout-type={layoutType}>
      <div className={styles.csatFormBlock}>
        {like === undefined || isLoading ? (
          <Typography.SansTitleM>{label}</Typography.SansTitleM>
        ) : (
          <div className={styles.reportSendBlock}>
            <CheckFilledSVG className={styles.checkIcon} />
            <Typography.SansTitleM>Спасибо за отзыв</Typography.SansTitleM>
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <LikeDislikeBlock dislikeEnabled={dislikeCommentForm?.dislikeEnabled} like={like} onSetLike={onSetLike} />
        )}
        {like === false && !isLoading && dislikeCommentForm && dislikeCommentForm.open && (
          <Typography.SansBodyM className={styles.textSupport}>Поделитесь, что именно не так?</Typography.SansBodyM>
        )}
      </div>
      {like === false && !isLoading && dislikeCommentForm && dislikeCommentForm.open && (
        <ContentDislikeCsat
          classNameChipContainer={styles.classNameChipContainer}
          onCheckChips={dislikeCommentForm.onCheckChips}
          onClickForm={dislikeCommentForm.onClickForm}
          loadingButton={dislikeCommentForm.loadingButton}
          onSubmit={dislikeCommentForm.onSubmit}
        />
      )}
    </div>
  );
}
