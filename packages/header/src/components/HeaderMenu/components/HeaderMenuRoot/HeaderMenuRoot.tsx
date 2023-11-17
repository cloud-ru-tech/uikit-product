import { Children, ReactNode } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { ViewTileInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { DropdownMenuContext } from '../../../../contexts';
import * as S from './styled';

export type HeaderMenuRootProps = WithSupportProps<{
  title?: string;
  children: ReactNode;
}>;

export function HeaderMenuRoot({ title, children, ...rest }: HeaderMenuRootProps) {
  return (
    <S.Wrapper {...extractSupportProps(rest)}>
      <DropdownMenu
        placement={DropdownMenu.placements.BottomStart}
        actions={({ hide }) => (
          <DropdownMenuContext.Provider value={{ hide }}>
            {title && (
              <S.Item>
                <S.Title>{title}</S.Title>
              </S.Item>
            )}
            {Children.map(children, child => (
              <S.Item>{child}</S.Item>
            ))}
          </DropdownMenuContext.Provider>
        )}
      >
        <ButtonIcon variant={ButtonIcon.variants.Weak} icon={<ViewTileInterfaceSVG />} />
      </DropdownMenu>
    </S.Wrapper>
  );
}
