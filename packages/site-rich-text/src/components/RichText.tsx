import cn from 'classnames';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import styles from './styles.module.scss';

export type RichTextProps = WithSupportProps<{
  richText?: string;
  className?: string;
}>;

export function RichText({ richText = '', className, ...rest }: RichTextProps) {
  return (
    <div
      className={cn(styles.richText, className)}
      dangerouslySetInnerHTML={{ __html: richText }}
      {...extractSupportProps(rest)}
    />
  );
}
