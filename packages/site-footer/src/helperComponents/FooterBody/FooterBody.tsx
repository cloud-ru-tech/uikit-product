import cn from 'classnames';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { type FooterColumn, type FooterHandlers } from '../../types';
import { FooterSection } from '../FooterSection';
import styles from './styles.module.scss';

export type FooterBodyProps = WithLayoutType<
  FooterHandlers & {
    className?: string;
    columns: FooterColumn[];
  }
>;

export function FooterBody({ className, layoutType, columns, onElementClick, onNavigate }: FooterBodyProps) {
  return (
    <div className={cn(styles.root, className)} data-layout-type={layoutType} data-qa='footer-body'>
      {columns.map((column, columnIndex) => (
        <div className={styles.column} key={String(columnIndex)} data-qa={`footer-column-${columnIndex + 1}`}>
          {column.sections.map(section => (
            <FooterSection
              key={section.id ?? section.title}
              {...section}
              onElementClick={onElementClick}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
