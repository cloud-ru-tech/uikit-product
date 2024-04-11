import { useLanguage } from '@sbercloud/uikit-product-utils';

import { InfoRow } from '../InfoRow';
import { DataType, InfoGroupProps } from './types';
import { getContent } from './utils';

export function InfoGroup<T extends DataType>({ data, items, className, loading }: InfoGroupProps<T>) {
  const { languageCode } = useLanguage();

  return (
    <div className={className}>
      {items.map(({ label, accessorKey, render, ...rest }, index) => {
        const content = getContent<T>({ data, render, accessorKey, languageCode });

        return (
          <InfoRow
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
