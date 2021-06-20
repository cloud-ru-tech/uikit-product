import { styled } from '@linaria/react';
import { CloseSVG, EditSVG, FavFilledSVG, ListSVG, MainMenuSVG, SearchSVG } from '@sbercloud/icons';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IconButton, IconButtonVariant } from '../src';

export default {
  title: 'Not stable/Button/Icon Button',
  component: IconButton,
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 20px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  &[data-dark] {
    background-color: #343f48;
  }
`;

const ITEMS: {
  variant: IconButtonVariant;
  icon: JSX.Element;
  dark?: boolean;
}[] = [
  {
    variant: IconButton.variants.Blue,
    icon: <FavFilledSVG />,
  },
  {
    variant: IconButton.variants.White,
    icon: <MainMenuSVG />,
    dark: true,
  },
  {
    variant: IconButton.variants.HeaderMenu,
    icon: <ListSVG />,
  },
  {
    variant: IconButton.variants.Header,
    icon: <SearchSVG />,
  },
  {
    variant: IconButton.variants.Sidebar,
    icon: <EditSVG />,
  },
  {
    variant: IconButton.variants.Popup,
    icon: <CloseSVG />,
  },
];

const Template: Story = () => (
  <Wrapper>
    {ITEMS.map(({ variant, icon, dark }, index) => (
      <ItemWrapper data-dark={dark ?? undefined} key={index}>
        <IconButton variant={variant}>{icon}</IconButton>
      </ItemWrapper>
    ))}
  </Wrapper>
);

export const iconButton = Template.bind({});
iconButton.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
