import { CloudInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { HeaderProjectSelectorIcon } from '../HeaderProjectSelectorIcon';
import { HeaderProjectSelectorLabel } from '../HeaderProjectSelectorLabel';

export type HeaderProjectSelectorProjectLabelProps = {
  label: string;
};

export function HeaderProjectSelectorProjectLabel({ label, ...rest }: HeaderProjectSelectorProjectLabelProps) {
  return (
    <>
      <HeaderProjectSelectorIcon>
        <CloudInterfaceSVG />
      </HeaderProjectSelectorIcon>
      <HeaderProjectSelectorLabel {...rest}>{label}</HeaderProjectSelectorLabel>
    </>
  );
}
