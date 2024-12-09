import cn from 'classnames';
import { ReactNode, RefObject } from 'react';

import { Scroll } from '@snack-uikit/scroll';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import styles from './styles.module.scss';

export type DrawerBodyProps = WithSupportProps<{
  /** Контент */
  content: ReactNode;
  /** CSS-класс */
  className?: string;
  /** Ссылка на скроллящийся элемент */
  scrollRef?: RefObject<HTMLElement>;
}>;

/** Вспомогательный компонент для добавления "тела" в DrawerCustom */
export function DrawerBody({ content, className, scrollRef, ...rest }: DrawerBodyProps) {
  return (
    <Scroll
      ref={scrollRef}
      size='m'
      barHideStrategy='never'
      paddingAbsolute
      className={cn(styles.drawerBody, className)}
      {...extractSupportProps(rest)}
    >
      {content}
    </Scroll>
  );
}
