import { CloudInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { IconWrapper } from '../IconWrapper';
import { LabelWrapper } from '../LabelWrapper';

export type ProjectLabelProps = {
  label: string;
};

export function ProjectLabel({ label, ...rest }: ProjectLabelProps) {
  return (
    <>
      <IconWrapper>
        <CloudInterfaceSVG />
      </IconWrapper>
      <LabelWrapper {...rest}>{label}</LabelWrapper>
    </>
  );
}
