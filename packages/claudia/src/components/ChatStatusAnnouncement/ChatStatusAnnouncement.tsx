import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { PlaceholderSVG } from '@cloud-ru/uikit-product-icons';
import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { ANIMATION_INTERVAL } from './constants';
import { AlertButton } from './helperComponents/AlertButton';
import styles from './styled.module.scss';
import { ChatStatusAnnouncementProps } from './types';
import { getContent, isReactNode } from './utils';

export function ChatStatusAnnouncement({
  content,
  contentClassName,
  onActionClick,
  actionLabel,
  icon,
  layoutType,
  className,
}: ChatStatusAnnouncementProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationEnded, setAnimationEnded] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  const hoverRef = useRef<NodeJS.Timeout>();
  const totalTextItems = getContent(content);
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;

  useEffect(() => () => clearTimeout(hoverRef.current));

  // запуск основной анимации
  useEffect(() => {
    if (isReactNode(content) || isAnimationEnded || content.length <= 1) return;

    let interval: NodeJS.Timeout;

    if (currentIndex === content.length - 1) {
      interval = setInterval(() => {
        setAnimationEnded(true);
      }, ANIMATION_INTERVAL);
      return;
    }

    interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % content.length);
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex, content, isAnimationEnded]);

  // запуск анимации по ховеру
  useEffect(() => {
    if (!isAnimationEnded || totalTextItems.length === 1) return;

    const runForwardAnimation = () => {
      if (hoverRef.current) clearTimeout(hoverRef.current);

      if (currentIndex === totalTextItems.length - 1) return;

      hoverRef.current = setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    };

    const runBackwardAnimation = () => {
      if (hoverRef.current) clearTimeout(hoverRef.current);

      if (currentIndex <= totalTextItems.length - 2) return;

      hoverRef.current = setTimeout(() => setCurrentIndex(prev => prev - 1), 300);
    };

    if (mouseEntered) {
      runForwardAnimation();
      return;
    }
    runBackwardAnimation();
  }, [currentIndex, isAnimationEnded, mouseEntered, totalTextItems.length]);

  const onMouseEnter = () => setMouseEntered(true);

  const onMouseLeave = () => setMouseEntered(false);

  return (
    <div
      className={cn(styles.fieldAdvice, className)}
      data-mobile={isMobile || undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.descriptionContainer}>
        {icon ?? <PlaceholderSVG size={16} />}
        <div className={styles.animationContainer}>
          {totalTextItems.map((item, index) => {
            const currentTextNextOrPreviousStyle =
              index === (currentIndex - 1 + totalTextItems.length) % totalTextItems.length
                ? styles.textBlockPrevious
                : styles.textBlockNext;

            const currentTextStyle = index === currentIndex ? styles.textBlockCurrent : currentTextNextOrPreviousStyle;

            return (
              <Typography.SansBodyS key={index} className={cn(styles.textBlock, currentTextStyle, contentClassName)}>
                <TruncateString text={String(item.content)} />
              </Typography.SansBodyS>
            );
          })}
        </div>
      </div>
      <AlertButton onClick={onActionClick} text={actionLabel} layoutType={layoutType} />
    </div>
  );
}
