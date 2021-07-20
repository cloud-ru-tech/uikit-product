import { ComponentProps } from 'react';
import { styled } from '@linaria/react';
import { CloseInterfaceSVG, DeleteInterfaceSVG, MoreInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_GLOBAL_CSS_VARS, EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Meta, Story } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';

import { ButtonIcon } from '../src/components/ButtonIcon';
import { Variant } from '../src/components/ButtonIcon/constants';

export default {
  title: 'Components/Button',
  component: ButtonIcon,
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

  &[data-variant='${Variant.OnAccent}'] {
    color: var(${EXPORT_VARS.GREY[0]});
    background-color: var(${EXPORT_GLOBAL_CSS_VARS.ACCENT_BACKGROUND});
  }
`;

const Template: Story<Pick<ComponentProps<typeof ButtonIcon>, 'disabled'>> = ({ ...args }) => (
  <Wrapper>
    {Object.entries(ButtonIcon.variants).map(([key, value]) => (
      <Column key={key} data-variant={value}>
        <span>{key}</span>

        <ButtonIcon variant={value} title='Close' {...args}>
          <CloseInterfaceSVG />
        </ButtonIcon>

        <ButtonIcon variant={value} title='More' {...args}>
          <MoreInterfaceSVG />
        </ButtonIcon>

        <ButtonIcon variant={value} title='Delete' {...args}>
          <DeleteInterfaceSVG />
        </ButtonIcon>
      </Column>
    ))}
  </Wrapper>
);
export const buttonIcon = Template.bind({});

buttonIcon.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=1492%3A42272',
  },
  controls: { include: ['disabled'] },
};
buttonIcon.args = {
  disabled: false,
};
