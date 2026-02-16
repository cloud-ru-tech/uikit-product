import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import { ANIMATION_DELAY_INTERVAL, ANIMATION_INTERVAL, APPEARANCE } from './constants';
import { AlertButton } from './helperComponents/AlertButton';
import { AnimatedItem } from './helperComponents/AnimatedItem';
import styles from './styled.module.scss';
import { ChatStatusAnnouncementProps } from './types';
import { getContent } from './utils';

export function ChatStatusAnnouncement({
  content,
  items,
  contentClassName,
  onActionClick,
  actionLabel,
  icon,
  layoutType,
  className,
  appearance = APPEARANCE.blue,
}: ChatStatusAnnouncementProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationEnded, setAnimationEnded] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  const hoverRef = useRef<NodeJS.Timeout>();
  const totalTextItems = getContent(content || items);
  const isMobile = layoutType === LAYOUT_TYPE.Mobile;

  useEffect(() => () => clearTimeout(hoverRef.current));

  // запуск основной анимации
  useEffect(() => {
    if (isAnimationEnded || !items || totalTextItems.length <= 1) return;

    let interval: NodeJS.Timeout;

    if (currentIndex === items.length - 1) {
      interval = setInterval(() => {
        setAnimationEnded(true);
      }, ANIMATION_DELAY_INTERVAL);
      return;
    }

    interval = setInterval(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, ANIMATION_DELAY_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimationEnded, items, totalTextItems.length]);

  // запуск анимации по ховеру
  useEffect(() => {
    if (!isAnimationEnded || totalTextItems.length === 1 || items?.length === totalTextItems.length) return;

    const runForwardAnimation = () => {
      if (hoverRef.current) clearTimeout(hoverRef.current);

      if (currentIndex === totalTextItems.length - 1) return;

      hoverRef.current = setTimeout(() => setCurrentIndex(prev => prev + 1), ANIMATION_INTERVAL);
    };

    const runBackwardAnimation = () => {
      if (hoverRef.current) clearTimeout(hoverRef.current);

      if (currentIndex <= totalTextItems.length - 2) return;

      hoverRef.current = setTimeout(() => setCurrentIndex(prev => prev - 1), ANIMATION_INTERVAL);
    };

    if (mouseEntered) {
      runForwardAnimation();
      return;
    }
    runBackwardAnimation();
  }, [currentIndex, isAnimationEnded, items?.length, mouseEntered, totalTextItems.length]);

  const onMouseEnter = () => setMouseEntered(true);

  const onMouseLeave = () => setMouseEntered(false);

  return (
    <div
      className={cn(styles.fieldAdvice, className)}
      data-mobile={isMobile || undefined}
      data-appearance={appearance}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.descriptionContainer}>
        {icon}

        <div className={styles.animationContainer}>
          {totalTextItems.map((item, index) => (
            <AnimatedItem
              key={index}
              content={item.content}
              itemIndex={index}
              currentIndex={currentIndex}
              contentClassName={contentClassName}
            />
          ))}
        </div>
      </div>

      <AlertButton appearance={appearance} onClick={onActionClick} text={actionLabel} layoutType={layoutType} />
    </div>
  );
}
