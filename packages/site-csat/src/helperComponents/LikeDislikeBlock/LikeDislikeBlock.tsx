import cn from 'classnames';
import { MutableRefObject } from 'react';

import { DislikeFilledSVG, DislikeOutlineSVG, LikeFilledSVG, LikeOutlineSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';

import styles from './styles.module.scss';

type LikeDislikeBlockProps = {
  like?: boolean;
  dislikeEnabled?: boolean;
  className?: string;
  triggerRef?: MutableRefObject<HTMLButtonElement | null>;
  onOpenClosePopover?: () => void;
  onSetLike: (flag: boolean) => void;
};

export function LikeDislikeBlock({
  like,
  onSetLike,
  triggerRef,
  onOpenClosePopover,
  className,
  dislikeEnabled,
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
          <ButtonFunction onClick={handleLike} icon={<LikeOutlineSVG />} />
          <ButtonFunction onClick={handleDislike} icon={<DislikeOutlineSVG />} />
        </>
      ) : (
        <>
          {like && <LikeFilledSVG className={cn(styles.icon, styles.iconDisabled)} />}
          {!like && (
            <ButtonFunction
              onClick={onOpenClosePopover}
              disabled={!dislikeEnabled}
              ref={triggerRef}
              icon={<DislikeFilledSVG />}
            />
          )}
        </>
      )}
    </div>
  );
}
