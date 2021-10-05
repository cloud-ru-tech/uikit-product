import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { CardContent, CardImage, CardImageWrap, CardText, CardTitle, ContainerStyled } from './styled';

export type CategoryCardProps = {
  title: string;
  text: string;
  image: React.ReactElement | string;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const CategoryCard = ({
  text,
  image,
  title,
  onClick,
  className,
  ...rest
}: WithSupportProps<CategoryCardProps>) => (
  <ContainerStyled className={className} onClick={onClick} {...extractSupportProps(rest)}>
    <CardImageWrap>{typeof image === 'string' ? <CardImage src={image} /> : image}</CardImageWrap>
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardText>{text}</CardText>
    </CardContent>
  </ContainerStyled>
);
