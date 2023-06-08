import { LinariaClassName } from '@linaria/core';

import { PredefinedDecorIconPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import * as S from './styled';

enum Color {
  Pink = 'Pink',
  Orange = 'Orange',
  Red = 'Red',
  Violet = 'Violet',
  Blue = 'Blue',
  Brown = 'Brown',
  Green = 'Green',
  Yellow = 'Yellow',
  SilverGrey = 'SilverGrey',
  CharcoalGrey = 'CharcoalGrey',
  Grass = 'Grass',
  Seamount = 'Seamount',
}

const ICON_COLOR_CLASS_NAME: Record<Color, LinariaClassName> = {
  [Color.Pink]: S.Pink,
  [Color.Orange]: S.Orange,
  [Color.Red]: S.Red,
  [Color.Violet]: S.Violet,
  [Color.Blue]: S.Blue,
  [Color.Brown]: S.Brown,
  [Color.Green]: S.Green,
  [Color.Yellow]: S.Yellow,
  [Color.SilverGrey]: S.SilverGrey,
  [Color.CharcoalGrey]: S.CharcoalGrey,
  [Color.Grass]: S.Grass,
  [Color.Seamount]: S.Seamount,
};

export type CardTopicProps = WithSupportProps<{
  icon: JSX.Element;
  title: string;
  color: Color;
  className?: string;
  onClick(): void;
}>;

export function CardTopic({ title, icon, color, className, onClick, ...rest }: CardTopicProps) {
  return (
    <S.Wrapper className={className} onClick={onClick} {...extractSupportProps(rest)}>
      <S.LeftSide>
        <S.Icon
          type={PredefinedDecorIconPrivate.types.Custom}
          size={PredefinedDecorIconPrivate.sizes.Small}
          icon={icon}
          className={ICON_COLOR_CLASS_NAME[color]}
        />
      </S.LeftSide>

      <S.RightSide>
        <S.Title data-test-id='card-topic__title' text={title} maxLines={2} textClassName={S.cursorPointerClassName} />
      </S.RightSide>
    </S.Wrapper>
  );
}

CardTopic.colors = Color;
