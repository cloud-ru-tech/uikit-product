import { ChevronLeftSVG, ChevronRightSVG } from '@sbercloud/uikit-product-icons';
import { ButtonOutline } from '@snack-uikit/button';

import styles from './styles.module.scss';

type NoteSliderControlsProps = {
  page: number;
  totalPages: number;
  onNextSlideClick(): void;
  onPrevSlideClick(): void;
};

export function NoteSliderControls({ page, totalPages, onNextSlideClick, onPrevSlideClick }: NoteSliderControlsProps) {
  return (
    <div className={styles.sliderControls}>
      <ButtonOutline
        icon={<ChevronLeftSVG />}
        onClick={onPrevSlideClick}
        size='m'
        appearance='neutral'
        disabled={page === 1}
      />
      <ButtonOutline
        icon={<ChevronRightSVG />}
        onClick={onNextSlideClick}
        size='m'
        appearance='neutral'
        disabled={page === totalPages}
      />
    </div>
  );
}
