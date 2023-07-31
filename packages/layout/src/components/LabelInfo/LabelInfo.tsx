import { ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { QuestionSmallOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Size } from './constants';
import * as S from './styled';

export type LabelInfoProps = WithSupportProps<{
  label: string;
  tooltip?: {
    content: string;
    link?: {
      text: string;
      href: string;
    };
  };
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
          <Tooltip
            type={Tooltip.types.Instant}
            content={tooltip.content}
            link={
              tooltip.link
                ? {
                    href: tooltip.link.href,
                    text: tooltip.link.text,
                    target: '_blank',
                  }
                : undefined
            }
          >
            <ButtonIcon icon={icon || <QuestionSmallOutlineInterfaceSVG />} variant={ButtonIcon.variants.Weak} />
          </Tooltip>
        )}
      </S.LabelWithTooltipIcon>
    </S.LabelWithTooltipContainer>
  );
}

LabelInfo.sizes = Size;
