import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { EXPORT_VARS, Themes } from '@sbercloud/uikit-product-theme';

import { StatusTag, StatusTagProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Status/Status Tag',
  component: StatusTag,
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

const Template: Story<StatusTagProps> = ({ ...args }, { globals: { theme } }) => (
  <Container theme={theme}>
    <StatusTag {...args} />
  </Container>
);

export const statusTag = Template.bind({});

statusTag.parameters = getDefaultParameters({
  figmaUrl:
    'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=3477%3A46230',
  extraControlsInclude: ['type', 'variant', 'text'],
});

statusTag.args = getDefaultArgs({
  type: StatusTag.types.Success,
  variant: StatusTag.variants.Transparent,
  text: 'Status',
});

statusTag.argTypes = {
  type: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusTag.types),
  },
  variant: {
    control: {
      type: 'radio',
    },
    options: Object.values(StatusTag.variants),
  },
  text: {
    control: {
      required: true,
      type: 'text',
    },
  },
};
