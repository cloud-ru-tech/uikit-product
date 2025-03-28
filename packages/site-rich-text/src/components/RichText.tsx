import cn from 'classnames';
import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type RichTextProps = WithSupportProps<{
  richText?: string | ReactNode;
  className?: string;
}>;

export function RichText({ richText = '', className, ...rest }: RichTextProps) {
  const isStringContent = typeof richText === 'string';

  return (
    <div
      className={cn(styles.richText, className)}
      {...(isStringContent ? { dangerouslySetInnerHTML: { __html: richText } } : { children: richText })}
      {...extractSupportProps(rest)}
    />
  );
}
