import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { CopySVG, HelpSVG } from '@aicloud/ui-icons';
import { withDesign } from 'storybook-addon-designs';
import { styled } from '@linaria/react';

import { copyText } from 'utils/copyText';
import { H4 } from 'typography/Headers';

import { BasicTooltip, IBasicTooltipProps } from '.';

export default {
  title: 'Components/Tooltip/Basic Tooltip',
  component: BasicTooltip,
  decorators: [withDesign],
} as Meta;

const TooltipWrapper = styled.div`
  margin: 30px;
`;

const Group = styled.div`
  display: flex;
`;

const Basic: Story<IBasicTooltipProps> = () => {
  const tooltipText =
    'Здесь будут показаны примененные фильтры.\nЗадать фильтры можно в меню столбца.';
  return (
    <Group>
      <TooltipWrapper>
        <BasicTooltip tooltip={tooltipText}>
          <H4>Basic</H4>
        </BasicTooltip>
      </TooltipWrapper>
      <TooltipWrapper>
        <BasicTooltip tooltip={tooltipText} icon={<HelpSVG />}>
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
        >
          <H4>Basic + Action</H4>
        </BasicTooltip>
      </TooltipWrapper>
    </Group>
  );
};

export const basicTooltip = Basic.bind({});

basicTooltip.args = {};

basicTooltip.parameters = {};
