import { OverviewInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { HeaderProjectSelectorIcon } from '../HeaderProjectSelectorIcon';
import { HeaderProjectSelectorLabel } from '../HeaderProjectSelectorLabel';

export type HeaderProjectSelectorWorkspaceLabelProps = {
  label: string;
};

export function HeaderProjectSelectorWorkspaceLabel({ label, ...rest }: HeaderProjectSelectorWorkspaceLabelProps) {
  return (
    <>
      <HeaderProjectSelectorIcon>
        <OverviewInterfaceSVG />
      </HeaderProjectSelectorIcon>
      <HeaderProjectSelectorLabel {...rest}>{label}</HeaderProjectSelectorLabel>
    </>
  );
}
