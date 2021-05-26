import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import copyText from 'copy-to-clipboard';

import { CopySVG, HelpSVG } from '@sbercloud/icons';
import { H4 } from '@sbercloud/uikit-typography';

import { BasicTooltip, IBasicTooltipProps } from '../src';

export default {
  title: 'Components/Tooltip',
  component: BasicTooltip,
} as Meta;

const TooltipWrapper = styled.div`
  margin: 30px;
`;

const Group = styled.div`
  display: flex;
`;

const tooltipText = 'Здесь будут показаны примененные фильтры.\nЗадать фильтры можно в меню столбца.';

const Template: Story<IBasicTooltipProps> = ({ ...args }) => (
  <Group>
    <TooltipWrapper>
      <BasicTooltip tooltip={tooltipText} {...args}>
        <H4>Basic</H4>
      </BasicTooltip>
    </TooltipWrapper>
    <TooltipWrapper>
      <BasicTooltip tooltip={tooltipText} icon={<HelpSVG />} {...args}>
        <H4>Basic + Icon</H4>
      </BasicTooltip>
    </TooltipWrapper>
    <TooltipWrapper>
      <BasicTooltip
        tooltip={tooltipText}
        icon={<CopySVG />}
        iconAction={(): void => {
          copyText(tooltipText);
        }}
        {...args}
      >
        <H4>Basic + Action</H4>
      </BasicTooltip>
    </TooltipWrapper>
  </Group>
);

export const basicTooltip = Template.bind({});
basicTooltip.args = {};
basicTooltip.parameters = {};
