import { OverviewInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { IconWrapper } from '../IconWrapper';
import { LabelWrapper } from '../LabelWrapper';

export type WorkspaceLabelProps = {
  label: string;
};

export function WorkspaceLabel({ label, ...rest }: WorkspaceLabelProps) {
  return (
    <>
      <IconWrapper>
        <OverviewInterfaceSVG />
      </IconWrapper>
      <LabelWrapper {...rest}>{label}</LabelWrapper>
    </>
  );
}
