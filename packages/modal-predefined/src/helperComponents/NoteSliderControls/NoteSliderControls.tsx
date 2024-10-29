import { ButtonOutline } from '@snack-uikit/button';
import { ChevronLeftSVG, ChevronRightSVG } from '@snack-uikit/icons';

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
