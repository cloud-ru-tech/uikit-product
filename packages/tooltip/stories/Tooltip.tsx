import { styled } from '@linaria/react';
import { CopySVG, HelpSVG } from '@sbercloud/icons';
import { H4 } from '@sbercloud/uikit-typography';
import { Meta, Story } from '@storybook/react/types-6-0';
import copyText from 'copy-to-clipboard';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tooltip, TooltipProps } from '../src';

export default {
  title: 'Not stable/Tooltip',
  component: Tooltip,
} as Meta;

const TooltipWrapper = styled.div`
  margin: 30px;
`;

const Group = styled.div`
  display: flex;
`;

const tooltipText = 'Здесь будут показаны примененные фильтры.\nЗадать фильтры можно в меню столбца.';

const Template: Story<TooltipProps> = ({ ...args }) => (
  <Group>
    <TooltipWrapper>
      <Tooltip tooltip={tooltipText} {...args}>
        <H4>Basic</H4>
      </Tooltip>
    </TooltipWrapper>
    <TooltipWrapper>
      <Tooltip tooltip={tooltipText} icon={<HelpSVG />} {...args}>
        <H4>Basic + Icon</H4>
      </Tooltip>
    </TooltipWrapper>
    <TooltipWrapper>
      <Tooltip
        tooltip={tooltipText}
        icon={<CopySVG />}
        iconAction={(): void => {
          copyText(tooltipText);
        }}
        {...args}
      >
        <H4>Basic + Action</H4>
      </Tooltip>
    </TooltipWrapper>
  </Group>
);

export const tooltip = Template.bind({});
tooltip.args = {};
tooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Eo7qqu8rH4Eg2RGYUrmjra/SberCloud-%E2%86%92-Design_System-iter-2-violet?node-id=1720%3A41685',
  },
};
