import { ReactElement } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { QuestionInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';

import * as S from './styled';

type LabelWithTooltipProps = {
  label: string;
  tooltip: {
    content: string;
    link?: {
      text: string;
      href: string;
    };
  };
  className?: string;
  icon?: ReactElement;
};

export function LabelWithTooltip({ label, tooltip, className, icon }: LabelWithTooltipProps) {
  return (
    <S.LabelWithTooltipContainer className={className}>
      {label}
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
        <ButtonIcon icon={icon || <QuestionInterfaceSVG />} variant={ButtonIcon.variants.Weak} />
      </Tooltip>
    </S.LabelWithTooltipContainer>
  );
}
