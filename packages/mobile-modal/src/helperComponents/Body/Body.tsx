import cn from 'classnames';
import { ReactNode } from 'react';

import { MobileDrawerCustom } from '@cloud-ru/uikit-product-mobile-drawer';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { CONTENT_ALIGN, TEST_IDS } from '../../constants';
import { ContentAlign } from '../../types';
import styles from './styles.module.scss';

export type ModalBodyProps = WithSupportProps<{
  /** Содержимое модального окна */
  content: ReactNode;
  /** Выравнивание контента */
  align?: ContentAlign;
  className?: string;
}>;

export function ModalBody({ content, align = CONTENT_ALIGN.Default, className, ...rest }: ModalBodyProps) {
  return (
    <MobileDrawerCustom.Body
      content={content}
      className={cn(styles.modalBody, className)}
      {...extractSupportProps(rest)}
      data-align={align}
      data-test-id={TEST_IDS.content}
    />
  );
}
