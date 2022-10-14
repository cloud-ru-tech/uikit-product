import { Variants } from '../../../src/components/constants';
import * as S from './styled';

type Props = {
  variant?: Variants;
};

export const ScrollContent = ({ variant = Variants.Primary }: Props) => (
  <S.ScrollContent data-variant={variant}>
    {[...Array(20)].map((x, i) => (
      <S.OverflownContent key={i}>
        {i} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada finibus felis at mollis.
      </S.OverflownContent>
    ))}
  </S.ScrollContent>
);
