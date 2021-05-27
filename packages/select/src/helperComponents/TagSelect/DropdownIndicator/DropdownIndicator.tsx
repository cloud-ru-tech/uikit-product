import { components as ReactSelectComponents } from 'react-select';

import { ArrowDownSVG } from '@sbercloud/icons';

export const DropdownIndicator = (
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element => (
  <ReactSelectComponents.DropdownIndicator {...props}>
    <ArrowDownSVG />
  </ReactSelectComponents.DropdownIndicator>
);
