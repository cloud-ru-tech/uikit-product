import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MainMenu, useSearch } from '../src';
import { SERVICE_GROUPS, SETTING_ITEMS } from './constants';
import { Banners, ProductSelect, ProjectSelectMobile } from './PlugElement';

const meta: Meta = {
  title: 'Console/Header/Main Menu',
};
export default meta;

type StoryProps = {
  isMobile?: boolean;

  showRightTop?: boolean;
  showLeftTop?: boolean;

  showServiceGroups?: boolean;
  showToolbar?: boolean;

  showFavorite?: boolean;
  showSearch?: boolean;

  open?: boolean;
};

function Template({
  isMobile,
  showLeftTop,
  showSearch,
  showRightTop,
  showServiceGroups,
  showFavorite,
  open,
}: StoryProps) {
  const search = useSearch();

  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  const onFavoriteChange = (id: string) => (value: boolean) => {
    if (value) {
      setFavoriteItems([id, ...favoriteItems]);
    } else {
      setFavoriteItems(favoriteItems.filter(item => item !== id));
    }
  };

  return (
    <MainMenu
      open={open}
      isMobile={isMobile}
      rightTop={showRightTop && <Banners />}
      leftTop={
        showLeftTop && (
          <>
            <ProductSelect />
            {isMobile && <ProjectSelectMobile />}
          </>
        )
      }
      favorite={showFavorite ? { value: favoriteItems, onChange: onFavoriteChange } : undefined}
      search={showSearch ? search : undefined}
      settingItems={SETTING_ITEMS}
      serviceGroups={showServiceGroups ? SERVICE_GROUPS : []}
    />
  );
}

export const mainMenu: StoryObj<StoryProps> = {
  render: Template,
  args: {
    isMobile: false,
    showLeftTop: true,
    showRightTop: true,
    showServiceGroups: true,
    showSearch: true,
    showFavorite: true,
    open: undefined,
  },
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.BETA],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/Product-UI-Kit?node-id=629-23097&m=dev',
    },
  },
};
