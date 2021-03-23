import { FC } from 'react';

import { Card, CardHeader } from 'components/Cards';

import { ContentStyled, ContainerStyled } from './styled';

export interface ICardsPanelItemProps {
  isVertical: boolean;
  selected?: boolean;
  additionalHover?: boolean;
  defaultFavourite?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onFavouriteChange?(isFavourite: boolean): void;
  checked?: boolean;
  onCheckedClick?(check: boolean): void;
  moreActions?: {
    name: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
  className?: string;
}

export const CardsPanelItem: FC<ICardsPanelItemProps> = props => {
  const {
    defaultFavourite = false,
    onFavouriteChange,
    children,
    checked,
    onCheckedClick,
    moreActions,
    onClick,
    className,
    additionalHover,
    selected,
    isVertical,
  } = props;

  const handlerCardClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void => {
    const target = e.target as HTMLButtonElement;
    if (target?.id !== 'more-button' && onClick) {
      onClick(e);
    }
  };

  return (
    <Card
      isVertical={isVertical}
      additionalHover={additionalHover}
      selected={selected}
      onClick={handlerCardClick}
      className={className}
    >
      <ContainerStyled>
        <CardHeader
          checked={checked}
          moreActions={moreActions}
          onCheckboxClick={onCheckedClick}
          defaultFavourite={defaultFavourite}
          onFavouriteChange={onFavouriteChange}
        />
        <ContentStyled>{children}</ContentStyled>
      </ContainerStyled>
    </Card>
  );
};
