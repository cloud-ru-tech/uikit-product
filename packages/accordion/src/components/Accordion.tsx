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

export type AccordionProps = WithSupportProps<{
  header: string;
  content: ReactNode;
  subheader?: string;
  onDelete?: VoidFunction;
  className?: string;
  tooltip?: string;
  variant?: Variant;
  disabled?: boolean;
  hasAnimation?: boolean;
}>;

export function Accordion({
  header,
  subheader,
  content,
  variant = Variant.Primary,
  className,
  disabled = false,
  onDelete,
  tooltip,
  hasAnimation = true,
  ...rest
}: AccordionProps) {
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
            {header}
            {tooltip && (
              <Tooltip type={Tooltip.types.Instant} content={tooltip}>
                <ButtonIcon disabled={disabled} icon={<QuestionInterfaceSVG />} variant={ButtonIcon.variants.Weak} />
              </Tooltip>
            )}
          </S.AccordionHeader>
          {subheader && <S.AccordionSubheader data-disabled={disabled || undefined}>{subheader}</S.AccordionSubheader>}
        </div>
        <S.AccordionButtons>
          {onDelete && <ButtonIconTransparent disabled={disabled} onClick={onDelete} icon={<DeleteInterfaceSVG />} />}
          <ButtonIconTransparent
            disabled={disabled}
            onClick={toggleCollapsed}
            icon={isCollapsed ? <ChevronDownInterfaceSVG /> : <ChevronUpInterfaceSVG />}
          />
        </S.AccordionButtons>
      </S.AccordionCard>

      <S.AccordionContentWrapStyled data-with-animation={hasAnimation || undefined} aria-expanded={!isCollapsed}>
        <S.AccordionContentStyled>{content}</S.AccordionContentStyled>
      </S.AccordionContentWrapStyled>
    </S.AccordionWrapper>
  );
}

Accordion.variants = Variant;
