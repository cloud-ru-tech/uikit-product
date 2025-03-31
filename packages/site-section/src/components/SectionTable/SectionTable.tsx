import cn from 'classnames';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { Table, TableProps } from '@sbercloud/uikit-product-site-table';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { SectionBasic } from '../SectionBasic';
import styles from './styles.module.scss';

export type SectionTableProps = WithSupportProps<
  WithLayoutType<
    {
      /** id секции */
      id?: string;
      /** CSS-класс */
      className?: string;
      /** Заголовок */
      title?: string;
      /** Подзаголовок */
      subtitle?: string;
      /** Описание */
      description?: string;
    } & TableProps
  >
>;

export function SectionTable({ id, layoutType, className, title, subtitle, description, ...rest }: SectionTableProps) {
  return (
    <SectionBasic
      id={id}
      title={title}
      backgroundColor='neutral-background1-level'
      layoutType={layoutType}
      className={cn(className, styles.sectionTable)}
      {...extractSupportProps(rest)}
    >
      {subtitle && <RichText richText={subtitle} className={styles.subtitle} data-test-id='section-table__subtitle' />}

      <Table {...rest} data-test-id='section-table__table' />

      {description && (
        <RichText className={styles.description} richText={description} data-test-id='section-table__description' />
      )}
    </SectionBasic>
  );
}
