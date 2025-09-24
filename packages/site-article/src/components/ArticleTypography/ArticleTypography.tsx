import cn from 'classnames';
import { createElement, ReactNode } from 'react';

import { WithLayoutType } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type ArticleTypographyProps = WithLayoutType<{
  className?: string;
  tag: 'span' | 'div' | 'p';
  type: 'body' | 'bodyBold' | 'bodyLink';
  children: ReactNode;
}>;

export function ArticleTypography(props: ArticleTypographyProps) {
  const { tag, className, layoutType, type, children } = props;

  return createElement(
    tag,
    {
      className: cn(styles.typography, className),
      'data-layout-type': layoutType,
      'data-type': type,
    },
    children,
  );
}
