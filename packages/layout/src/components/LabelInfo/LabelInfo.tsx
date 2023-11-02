import { ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Size } from './constants';
import * as S from './styled';

export type LabelInfoProps = WithSupportProps<{
  label: string;
  tooltip?: Omit<TooltipProps, 'children' | 'type'>;
  className?: string;
  icon?: ReactElement;
  size?: Size;
}>;

export function LabelInfo({ label, tooltip, className, icon, size = Size.Small, ...rest }: LabelInfoProps) {
  return (
    <S.LabelWithTooltipContainer data-size={size} className={className} {...extractSupportProps(rest)}>
      {label}&nbsp;
      <S.LabelWithTooltipIcon>
        {tooltip && (
          <Tooltip type={Tooltip.types.Instant} {...tooltip}>
            <ButtonIcon icon={icon || <QuestionSmallOutlineInterfaceSVG />} variant={ButtonIcon.variants.Weak} />
          </Tooltip>
        )}
      </S.LabelWithTooltipIcon>
    </S.LabelWithTooltipContainer>
  );
}

LabelInfo.sizes = Size;
