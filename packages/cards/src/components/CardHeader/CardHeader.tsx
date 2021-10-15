import { FC, useCallback, useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { Checkbox } from '@sbercloud/uikit-react-checkbox';
import { DropdownMenu } from '@sbercloud/uikit-react-dropdown';
import { FavouriteInterfaceSVG, MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { ButtonGroupStyled, FavouriteWrapStyled, HeaderStyled, favouriteButtonClassName } from './styled';

export type CardHeaderProps = {
  checked?: boolean;
  className?: string;
  defaultFavourite?: boolean;
  onCheckboxClick?: (check: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
  onFavouriteChange?: (isFavourite: boolean) => void;
  moreActions?: {
    name: string;
    id?: string;
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  }[];
};

export const CardHeader: FC<CardHeaderProps> = props => {
  const {
    checked,
    className,
    moreActions,
    onCheckboxClick,
    onFavouriteChange,
    children,
    defaultFavourite = false,
  } = props;

  const [isFavourite, setIsFavourite] = useState(defaultFavourite);

  const handleFavouriteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation();
    const newFavouriteValue = !isFavourite;
    setIsFavourite(newFavouriteValue);

    if (onFavouriteChange) {
      onFavouriteChange(newFavouriteValue);
    }
  };

  const handleCheckedClick = (check: boolean, e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();

    if (onCheckboxClick) {
      onCheckboxClick(check, e);
    }
  };

  const handleDropdownWrapperClick = useCallback(e => e.stopPropagation(), []);

  return (
    <HeaderStyled className={className}>
      {onCheckboxClick && typeof checked === 'boolean' && (
        <Checkbox data-test-id='card-header__checkbox' checked={checked || false} handleChange={handleCheckedClick} />
      )}
      {children}
      <ButtonGroupStyled>
        {onFavouriteChange && (
          <FavouriteWrapStyled onClick={handleFavouriteClick} data-test-id='card-header__favorite-button'>
            <FavouriteInterfaceSVG className={favouriteButtonClassName} data-filled={isFavourite} />
          </FavouriteWrapStyled>
        )}
        {moreActions && (
          <div role='presentation' onClick={handleDropdownWrapperClick}>
            <DropdownMenu data-test-id='card-header__dropdown-menu' actions={moreActions}>
              <ButtonIcon
                icon={<MoreInterfaceSVG />}
                tooltip={{
                  content: 'Меню',
                  placement: ButtonIcon.placements.Right,
                }}
              />
            </DropdownMenu>
          </div>
        )}
      </ButtonGroupStyled>
    </HeaderStyled>
  );
};
