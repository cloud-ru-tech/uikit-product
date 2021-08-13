import { Filter, IFilterProps } from '@sbercloud/uikit-react-filter';
import { FilterInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps } from '@sbercloud/uikit-utils';

import { ToolbarButton } from '../ToolbarButton';

export const ToolbarFilter = ({ filterOptions, value, onChange }: WithSupportProps<IFilterProps>) => (
  <div data-test-id='toolbar__filter'>
    <Filter filterOptions={filterOptions} value={value} onChange={onChange}>
      {({ badgeText }): JSX.Element => (
        <ToolbarButton badgeText={badgeText} data-test-id='toolbar__filter-btn'>
          <FilterInterfaceSVG />
        </ToolbarButton>
      )}
    </Filter>
  </div>
);
