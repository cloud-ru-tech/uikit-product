import { components as ReactSelectComponents } from 'react-select';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';

export const DropdownIndicator = (
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element => (
  <ReactSelectComponents.DropdownIndicator {...props}>
    <DropdownDownInterfaceSVG />
  </ReactSelectComponents.DropdownIndicator>
);
