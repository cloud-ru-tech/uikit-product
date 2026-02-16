import cn from 'classnames';
import { ReactNode } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import styles from './styled.module.scss';

export type AnimatedItemProps = {
  content: ReactNode;
  itemIndex: number;
  currentIndex: number;
  contentClassName?: string;
};

export function AnimatedItem({ content, itemIndex, currentIndex, contentClassName }: AnimatedItemProps) {
  const currentTextNextOrPreviousStyle = itemIndex > currentIndex ? styles.textBlockNext : styles.textBlockPrevious;

  const currentTextStyle = itemIndex === currentIndex ? styles.textBlockCurrent : currentTextNextOrPreviousStyle;

  if (typeof content === 'string') {
    return (
      <Typography.SansBodyS className={cn(styles.textBlock, currentTextStyle, contentClassName)}>
        <TruncateString text={content} />
      </Typography.SansBodyS>
    );
  }

  return <div className={cn(styles.textBlock, currentTextStyle, contentClassName)}>{content}</div>;
}
