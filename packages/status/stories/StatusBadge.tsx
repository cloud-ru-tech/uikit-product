import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { UserInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { StatusBadge, StatusBadgeProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Status/Status Badge',
  component: StatusBadge,
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

const Template: Story<StatusBadgeProps> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
    <StatusBadge {...args} icon={<UserInterfaceSVG />} />
  </Container>
);

export const statusBadge = Template.bind({});

statusBadge.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=3477%3A46230',
  extraControlsInclude: ['type'],
});

statusBadge.args = getDefaultArgs({
  type: StatusBadge.types.Success,
});

statusBadge.argTypes = {
  type: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusBadge.types),
  },
};
