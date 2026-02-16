import { MutableRefObject } from 'react';

import { DislikeFilledSVG, DislikeOutlineSVG, LikeFilledSVG, LikeOutlineSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonTonal } from '@snack-uikit/button';

import styles from './styles.module.scss';

type LikeDislikeBlockProps = {
  like?: boolean;
  dislikeEnabled?: boolean;
  className?: string;
  triggerRef?: MutableRefObject<HTMLButtonElement | null>;
  onOpenClosePopover?: () => void;
  onSetLike: (flag: boolean) => void;
  hideTextLabel?: boolean;
};

export function LikeDislikeBlock({
  like,
  onSetLike,
  triggerRef,
  onOpenClosePopover,
  className,
  dislikeEnabled,
  hideTextLabel,
}: LikeDislikeBlockProps) {
  const handleLike = () => {
    onSetLike(true);
  };

  const handleDislike = () => {
    onSetLike(false);
  };

  return (
    <div className={className || styles.likeDislikeBlock}>
      {like === undefined ? (
        <>
          <ButtonTonal onClick={handleLike} icon={<LikeOutlineSVG />} {...(hideTextLabel ? {} : { label: 'Да' })} />
          <ButtonTonal
            onClick={handleDislike}
            icon={<DislikeOutlineSVG />}
            {...(hideTextLabel ? {} : { label: 'Нет' })}
          />
        </>
      ) : (
        <>
          {like && <ButtonTonal disabled icon={<LikeFilledSVG />} {...(hideTextLabel ? {} : { label: 'Да' })} />}
          {!like && (
            <ButtonTonal
              disabled={!dislikeEnabled}
              onClick={onOpenClosePopover}
              ref={triggerRef}
              icon={<DislikeFilledSVG />}
              {...(hideTextLabel ? {} : { label: 'Нет' })}
            />
          )}
        </>
      )}
    </div>
  );
}
