import { Filter, IFilterProps } from '@sbercloud/uikit-react-filter';
import { FilterInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, useLanguage } from '@sbercloud/uikit-utils';

import { Texts, textProvider } from '../../helpers/texts-provider';
import { ToolbarButton } from '../ToolbarButton';

export const ToolbarFilter = ({ filterOptions, value, onChange }: WithSupportProps<IFilterProps>) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  return (
    <div data-test-id='toolbar__filter'>
      <Filter filterOptions={filterOptions} value={value} onChange={onChange}>
        {({ badgeNumber }): JSX.Element => (
          <ToolbarButton
            badgeProps={{ number: badgeNumber }}
            data-test-id='toolbar__filter-btn'
            tooltip={{ content: textProvider(languageCode, Texts.filter) }}
          >
            <FilterInterfaceSVG />
          </ToolbarButton>
        )}
      </Filter>
    </div>
  );
};
