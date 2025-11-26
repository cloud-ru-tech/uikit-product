import cn from 'classnames';

import { InfoRow } from '../InfoRow';
import styles from './styles.module.scss';
import { DataType, InfoGroupProps } from './types';
import { useGetContent } from './utils';

export function InfoGroup<T extends DataType>({
  data,
  items,
  className,
  loading,
  columns = 'single',
  width = 'fixed',
}: InfoGroupProps<T>) {
  const getContent = useGetContent();

  return (
    <div className={cn(styles.wrapper, className)} data-columns={columns} data-width={width}>
      {items.map(({ label, accessorKey, render, labelClassName, className, rowClassName, ...rest }, index) => {
        const content = getContent<T>({ data, render, accessorKey });
        const rowWidth = columns === 'double' || width === 'full' ? 'full' : 'fixed';
        const showTopDivider = columns === 'double' ? index < 2 : index === 0;

        return (
          <div className={styles.infoRowWrapper} data-width={width} key={(accessorKey as string) || label}>
            <InfoRow
              label={label}
              content={content}
              topDivider={showTopDivider}
              bottomDivider
              loading={loading}
              width={rowWidth}
              labelClassName={cn(
                {
                  [styles.infoRowLabelDoubleFixed]: width === 'fixed' && columns === 'double',
                  [styles.infoRowLabelDoubleFull]: width === 'full' && columns === 'double',
                },
                labelClassName,
              )}
              className={cn(
                {
                  [styles.contentDouble]: columns === 'double',
                },
                className,
              )}
              rowClassName={cn(
                {
                  [styles.contentDouble]: columns === 'double',
                },
                rowClassName,
              )}
              {...rest}
            />
          </div>
        );
      })}
    </div>
  );
}
