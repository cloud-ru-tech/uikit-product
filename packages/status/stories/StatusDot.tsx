import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { StatusDot, StatusDotProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Status/Status Dot',
  component: StatusDot,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#404040')};
`;

const Template: Story<StatusDotProps> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
    <StatusDot {...args} />
  </Container>
);

export const statusDot = Template.bind({});

statusDot.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=3477%3A46230',
  extraControlsInclude: ['type', 'size'],
});

statusDot.args = getDefaultArgs({
  size: StatusDot.sizes.Small,
  type: StatusDot.types.Success,
});

statusDot.argTypes = {
  type: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusDot.types),
  },
  size: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusDot.sizes),
  },
};
