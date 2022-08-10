import { Children, ReactNode } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { DropdownMenu } from '@sbercloud/uikit-product-dropdown';
import { ViewTileInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { DropdownMenuContext } from '../../../../contexts';
import { Item, Title, Wrapper } from './styled';

export type HeaderMenuRootProps = WithSupportProps<{
  title: string;
  children: ReactNode;
}>;

export function HeaderMenuRoot({ title, children, ...rest }: HeaderMenuRootProps) {
  return (
    <Wrapper {...extractSupportProps(rest)}>
      <DropdownMenu
        actions={({ hide }) => (
          <DropdownMenuContext.Provider value={{ hide }}>
            <Item>
              <Title>{title}</Title>
            </Item>
            {Children.map(children, child => (
              <Item>{child}</Item>
            ))}
          </DropdownMenuContext.Provider>
        )}
      >
        <ButtonIcon variant={ButtonIcon.variants.Color} icon={<ViewTileInterfaceSVG />} />
      </DropdownMenu>
    </Wrapper>
  );
}
