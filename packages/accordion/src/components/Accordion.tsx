import { ReactNode, useState } from 'react';

import { ButtonIcon, ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import {
  ChevronDownInterfaceSVG,
  ChevronUpInterfaceSVG,
  DeleteInterfaceSVG,
  QuestionInterfaceSVG,
} from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Variant } from './constants';
import * as S from './styled';

export type AccordionProps = {
  header: string;
  subheader: string;
  content: string | ReactNode;
  onClose?(): void;
  className?: string;
  tooltip?: string;
  variant?: Variant;
  disabled?: boolean;
  hasExpandedAnimation?: boolean;
};

export function Accordion({
  header,
  subheader,
  content,
  variant = Variant.Primary,
  className,
  disabled = false,
  onClose,
  tooltip,
  hasExpandedAnimation = true,
  ...rest
}: WithSupportProps<AccordionProps>) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => setIsCollapsed(prevState => !prevState);

  return (
    <S.AccordionWrapper
      className={className}
      data-variant={variant}
      data-disabled={disabled || undefined}
      {...extractSupportProps(rest)}
    >
      <S.AccordionCard>
        <div>
          <S.AccordionHeader data-variant={variant} data-disabled={disabled || undefined}>
            {header}{' '}
            {tooltip && (
              <Tooltip type={Tooltip.types.Instant} content={tooltip}>
                <ButtonIcon disabled={disabled} icon={<QuestionInterfaceSVG />} variant={ButtonIcon.variants.Weak} />
              </Tooltip>
            )}
          </S.AccordionHeader>
          <S.AccordionSubheader data-disabled={disabled || undefined}>{subheader}</S.AccordionSubheader>
        </div>
        <S.AccordionButtons>
          <ButtonIconTransparent disabled={disabled} onClick={onClose} icon={<DeleteInterfaceSVG />} />
          <ButtonIconTransparent
            disabled={disabled}
            onClick={toggleCollapsed}
            icon={isCollapsed ? <ChevronDownInterfaceSVG /> : <ChevronUpInterfaceSVG />}
          />
        </S.AccordionButtons>
      </S.AccordionCard>

      <S.AccordionContentWrapStyled
        data-expanded={!isCollapsed || undefined}
        data-collapsed={isCollapsed || undefined}
        data-expanded-animation={(hasExpandedAnimation && !isCollapsed) || undefined}
        aria-expanded={isCollapsed}
      >
        <S.AccordionContentStyled>{content}</S.AccordionContentStyled>
      </S.AccordionContentWrapStyled>
    </S.AccordionWrapper>
  );
}

Accordion.variants = Variant;
