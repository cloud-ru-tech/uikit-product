import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { themeVars } from '@sbercloud/figma-tokens-cloud-platform';
import { UserInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { StatusBadge, StatusBadgeProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Status/Status Badge',
  component: StatusBadge,
} as Meta;

const Container = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(${themeVars.sys.neutral.decorDefault});
  border-radius: 10%;
  background-color: var(${themeVars.sys.neutral.background2Level});
`;

const Template: StoryFn<StatusBadgeProps> = ({ ...args }) => (
  <Container>
    <StatusBadge {...args} icon={<UserInterfaceSVG />} />
  </Container>
);

export const statusBadge = Template.bind({});

statusBadge.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46230',
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
