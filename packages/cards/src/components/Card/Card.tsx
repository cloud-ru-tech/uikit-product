import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { AdditionalHoverImageStyled, AdditionalHoverStyled, CardContentWrapStyled, ContainerStyled } from './styled';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  isVertical: boolean;
  selected?: boolean;
  hoverClassName?: string;
  additionalHover?: boolean;
  additionalHoverImage?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Card = ({
  children,
  onClick,
  selected,
  className,
  isVertical,
  hoverClassName,
  additionalHover,
  additionalHoverImage,
  ...rest
}: WithSupportProps<CardProps>) => (
  <ContainerStyled
    className={className}
    type='button'
    onClick={onClick}
    selected={selected}
    additionalHover={additionalHover}
    {...extractSupportProps(rest)}
  >
    {additionalHover ? (
      <AdditionalHoverStyled data-additional-hover isVertical={isVertical} className={hoverClassName}>
        <AdditionalHoverImageStyled additionalHoverImage={additionalHoverImage} />
      </AdditionalHoverStyled>
    ) : null}
    <CardContentWrapStyled>{children}</CardContentWrapStyled>
  </ContainerStyled>
);
