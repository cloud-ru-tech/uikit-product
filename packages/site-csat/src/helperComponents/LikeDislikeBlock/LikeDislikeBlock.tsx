import cn from 'classnames';
import { MutableRefObject } from 'react';

import { DislikeFilledSVG, DislikeOutlineSVG, LikeFilledSVG, LikeOutlineSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFunction, ButtonTonal } from '@snack-uikit/button';

import styles from './styles.module.scss';

type LikeDislikeBlockProps = {
  like?: boolean;
  dislikeEnabled?: boolean;
  className?: string;
  triggerRef?: MutableRefObject<HTMLButtonElement | null>;
  onOpenClosePopover?: () => void;
  onSetLike: (flag: boolean) => void;
  showNewAppearance?: boolean;
  hideTextLabel?: boolean;
};

export function LikeDislikeBlock({
  like,
  onSetLike,
  triggerRef,
  onOpenClosePopover,
  className,
  dislikeEnabled,
  showNewAppearance,
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
          {showNewAppearance ? (
            <ButtonTonal onClick={handleLike} icon={<LikeOutlineSVG />} {...(hideTextLabel ? {} : { label: 'Да' })} />
          ) : (
            <ButtonFunction onClick={handleLike} icon={<LikeOutlineSVG />} />
          )}
          {showNewAppearance ? (
            <ButtonTonal
              onClick={handleDislike}
              icon={<DislikeOutlineSVG />}
              {...(hideTextLabel ? {} : { label: 'Нет' })}
            />
          ) : (
            <ButtonFunction onClick={handleDislike} icon={<DislikeOutlineSVG />} />
          )}
        </>
      ) : (
        <>
          {like &&
            (showNewAppearance ? (
              <ButtonTonal disabled icon={<LikeFilledSVG />} {...(hideTextLabel ? {} : { label: 'Да' })} />
            ) : (
              <LikeFilledSVG className={cn(styles.icon, styles.iconDisabled)} />
            ))}
          {!like &&
            (showNewAppearance ? (
              <ButtonTonal
                disabled={!dislikeEnabled}
                onClick={onOpenClosePopover}
                ref={triggerRef}
                icon={<DislikeFilledSVG />}
                {...(hideTextLabel ? {} : { label: 'Нет' })}
              />
            ) : (
              <ButtonFunction
                onClick={onOpenClosePopover}
                disabled={!dislikeEnabled}
                ref={triggerRef}
                icon={<DislikeFilledSVG />}
              />
            ))}
        </>
      )}
    </div>
  );
}
