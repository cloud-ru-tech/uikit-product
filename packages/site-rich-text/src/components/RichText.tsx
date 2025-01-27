import cn from 'classnames';

import styles from './styles.module.scss';

export type RichTextProps = {
  richText?: string;
  className?: string;
};

export function RichText({ richText = '', className }: RichTextProps) {
  return <div className={cn(styles.richText, className)} dangerouslySetInnerHTML={{ __html: richText }} />;
}
