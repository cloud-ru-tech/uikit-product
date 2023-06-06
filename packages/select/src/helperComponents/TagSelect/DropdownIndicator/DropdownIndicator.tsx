import { components as ReactSelectComponents } from 'react-select';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';

export function DropdownIndicator(
  props: React.ComponentProps<typeof ReactSelectComponents.DropdownIndicator>,
): JSX.Element {
  return (
    <ReactSelectComponents.DropdownIndicator {...props}>
      <DropdownDownInterfaceSVG />
    </ReactSelectComponents.DropdownIndicator>
  );
}
