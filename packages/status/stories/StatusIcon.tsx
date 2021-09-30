import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { UserInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-theme';

import { StatusIcon, StatusProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Status/Status Icon',
  component: StatusIcon,
} as Meta;

const Container = styled.div<{ theme: Themes }>`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  border-radius: 10%;
  background-color: ${({ theme }) => (['purple', 'green'].includes(theme) ? '#ffffff' : '#333333')};
`;

const Template: Story<StatusProps> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
    <StatusIcon {...args} icon={<UserInterfaceSVG />} />
  </Container>
);

export const statusIcon = Template.bind({});

statusIcon.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=3477%3A46230',
  extraControlsInclude: ['type'],
});

statusIcon.args = getDefaultArgs({
  type: StatusIcon.types.Success,
});

statusIcon.argTypes = {
  type: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusIcon.types),
  },
};
