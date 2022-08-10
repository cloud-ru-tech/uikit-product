import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { CardVariant } from './constants';
import { CardContentWrapStyled, ContainerStyled } from './styled';

export type CardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Card = ({
  children,
  onClick,
  selected,
  className,
  variant = CardVariant.Default,
  ...rest
}: WithSupportProps<CardProps>) => (
  <ContainerStyled
    className={className}
    onClick={onClick}
    selected={selected}
    data-variant={variant}
    {...extractSupportProps(rest)}
  >
    <CardContentWrapStyled>{children}</CardContentWrapStyled>
  </ContainerStyled>
);
