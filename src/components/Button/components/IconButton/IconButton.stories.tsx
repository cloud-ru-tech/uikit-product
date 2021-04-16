import { Story, Meta } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import {
  FavFilledSVG,
  MenuSVG,
  EnvTasksSVG,
  SearchSVG,
  EditSVG,
} from '@sbercloud/icons';

import { IconButton, IconButtonProps } from './IconButton';

export default {
  title: 'Components/Button',
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
  variant: IconButtonProps['variant'];
  icon: JSX.Element;
  dark?: boolean;
}[] = [
  {
    variant: 'blue',
    icon: <FavFilledSVG />,
  },
  {
    variant: 'white',
    icon: <MenuSVG />,
    dark: true,
  },
  {
    variant: 'header-menu',
    icon: <EnvTasksSVG />,
  },
  {
    variant: 'header',
    icon: <SearchSVG />,
  },
  {
    variant: 'sidebar',
    icon: <EditSVG />,
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
