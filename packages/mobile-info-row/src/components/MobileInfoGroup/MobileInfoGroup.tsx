import { MobileInfoRow } from '../MobileInfoRow';
import { DataType, MobileInfoGroupProps } from './types';
import { useGetContent } from './utils';

export function MobileInfoGroup<T extends DataType>({ data, items, className, loading }: MobileInfoGroupProps<T>) {
  const getContent = useGetContent();

  return (
    <div className={className}>
      {items.map(({ label, accessorKey, render, ...rest }, index) => {
        const content = getContent<T>({ data, render, accessorKey });

        return (
          <MobileInfoRow
            key={(accessorKey as string | undefined) ?? label}
            label={label}
            content={content}
            topDivider={index === 0}
            bottomDivider
            loading={loading}
            {...rest}
          />
        );
      })}
    </div>
  );
}
