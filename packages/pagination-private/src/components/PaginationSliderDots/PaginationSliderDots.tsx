import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { getRange } from '../../utils';
import { PaginationSliderDotsButton } from '../PaginationSliderDotsButton';
import { ItemList } from './styled';

const FIRST_PAGE = 1;

export type PaginationSliderDotsProps = WithSupportProps<{
  total: number;
  page: number;
  className?: string;
  onChange: (page: number) => void;
}>;

export function PaginationSliderDots({ total, page, className, onChange, ...rest }: PaginationSliderDotsProps) {
  return (
    <nav className={className} {...extractSupportProps(rest)}>
      <ItemList>
        {getRange(FIRST_PAGE, total).map(value => (
          <li key={value}>
            <PaginationSliderDotsButton page={value} selected={value === page} onClick={onChange} />
          </li>
        ))}
      </ItemList>
    </nav>
  );
}
