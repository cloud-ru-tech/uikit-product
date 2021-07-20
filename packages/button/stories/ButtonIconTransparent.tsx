import { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { styled } from '@linaria/react';
import { CirclePlayFilledInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS, EXPORT_GLOBAL_CSS_VARS } from '@sbercloud/uikit-theme';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';

import { ButtonIconTransparent } from '../src/components/ButtonIconTransparent';
import { Variant } from '../src/components/ButtonIconTransparent/constants';

export default {
  title: 'Components/Button/Button Icon Transparent',
  component: ButtonIconTransparent,
} as Meta;

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  background-color: var(${EXPORT_VARS.GREY[0]});
`;

const Column = styled.div`
  display: grid;
  justify-content: center;
  grid-gap: 16px;
  padding: 16px;

  &[data-variant='${Variant.Accent}'] {
    color: var(${EXPORT_VARS.GREY[0]});
    background-color: var(${EXPORT_GLOBAL_CSS_VARS.ACCENT_BACKGROUND});
  }
`;

const Template: Story<Pick<ComponentProps<typeof ButtonIconTransparent>, 'rounded' | 'disabled'>> = ({ ...args }) => (
  <Wrapper>
    {Object.entries(ButtonIconTransparent.variants).map(([key, value]) => (
      <Column key={key} data-variant={value}>
        <span>{key}</span>

        <ButtonIconTransparent variant={value} title='Play' {...args}>
          <CirclePlayFilledInterfaceSVG />
        </ButtonIconTransparent>
      </Column>
    ))}
  </Wrapper>
);

export const buttonIconTransparent = Template.bind({});

buttonIconTransparent.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1492%3A41816',
  },
  controls: { include: ['rounded', 'disabled'] },
};
buttonIconTransparent.args = {
  rounded: false,
  disabled: false,
};
