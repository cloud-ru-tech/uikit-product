import { Button } from '@sbercloud/uikit-product-button';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { CardContent, CardImage, CardImageWrap, CardText, CardTitle, ContainerStyled } from './styled';

export type BannerCardProps = {
  title: string;
  text: string;
  buttonText: string;
  className?: string;
  image: React.ReactElement | string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BannerCard = ({
  text,
  image,
  title,
  buttonText,
  className,
  onClick,
  onButtonClick,
  ...rest
}: WithSupportProps<BannerCardProps>) => (
  <ContainerStyled className={className} onClick={onClick} {...extractSupportProps(rest)}>
    <CardContent>
      <div>
        <CardTitle>{title}</CardTitle>
        <CardText>{text}</CardText>
      </div>
      <Button variant={Button.variants.Transparent} text={buttonText} onClick={onButtonClick} />
    </CardContent>
    <CardImageWrap>{typeof image === 'string' ? <CardImage src={image} /> : image}</CardImageWrap>
  </ContainerStyled>
);
