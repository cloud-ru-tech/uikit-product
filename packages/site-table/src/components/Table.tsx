import cn from 'classnames';
import { ReactNode } from 'react';

import { RichText } from '@sbercloud/uikit-product-site-rich-text';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Scroll } from '@snack-uikit/scroll';

import styles from './styles.module.scss';

type Cell = {
  id?: string | number;
  content: ReactNode;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
};

export type TableProps = WithSupportProps<{
  withHeader?: boolean;
  rows: Cell[][];
}>;

export function Table({ withHeader = true, rows, ...rest }: TableProps) {
  const header = withHeader ? rows[0] : undefined;
  const body = withHeader ? rows.slice(1) : rows;

  return (
    <Scroll barHideStrategy='never'>
      <table className={styles.table} {...extractSupportProps(rest)}>
        {header && (
          <thead>
            <tr className={cn(styles.row, styles.rowHeader)}>
              {header.map(({ id, content, colSpan, rowSpan, className }, index) => (
                <td
                  key={id ?? index}
                  className={cn(styles.cell, styles.cellHeader, className)}
                  colSpan={colSpan}
                  rowSpan={rowSpan}
                >
                  <RichText richText={content} />
                </td>
              ))}
            </tr>
          </thead>
        )}

        {body && (
          <tbody>
            {body.map((row, index) => (
              <tr key={index} className={cn(styles.row, styles.rowBody)}>
                {row.map(({ id, content, rowSpan, colSpan, className }, index) => (
                  <td
                    key={id ?? index}
                    className={cn(styles.cell, styles.cellBody, className)}
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                  >
                    <RichText richText={content} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Scroll>
  );
}
