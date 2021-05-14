import { Meta, Story } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { PauseCircleSVG } from '@sbercloud/icons';

import { H4 } from 'typography/Headers';

import {
  TableButton as CTableButton,
  TableButtonProps,
} from 'components/Button/components/TableButton/TableButton';
import { Variants } from 'components/Button/components/TableButton/types';

export default {
  title: 'Components/Button',
  component: CTableButton,
} as Meta;

const Group = styled.div`
  display: flex;
`;

const Item = styled.div<{ background?: string }>`
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: ${({ background }) => background || 'transparent'};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    padding-top: 8px;
  }
`;

const Title = styled.div`
  margin-bottom: 12px;
`;

const Template: Story<TableButtonProps> = ({ ...args }) => (
  <Group>
    <Item key={'TextIconButton'}>
      <Title>
        <H4>{'TextIconButton'}</H4>
      </Title>
      <ButtonGroup>
        <span>
          <CTableButton
            {...args}
            variant={Variants.TextIcon}
            icon={<PauseCircleSVG />}
          />
        </span>
        <span>
          <CTableButton
            {...args}
            variant={Variants.TextIcon}
            inProgress
            icon={<PauseCircleSVG />}
          />
        </span>
      </ButtonGroup>
    </Item>
    <Item key={'IconButton'}>
      <Title>
        <H4>{'IconButton'}</H4>
      </Title>
      <ButtonGroup>
        <span>
          <CTableButton
            {...args}
            variant={Variants.Icon}
            icon={<PauseCircleSVG />}
          />
        </span>
        <span>
          <CTableButton
            {...args}
            variant={Variants.Icon}
            inProgress
            icon={<PauseCircleSVG />}
          />
        </span>
      </ButtonGroup>
    </Item>
  </Group>
);

export const TableButton = Template.bind({});

TableButton.args = {
  text: 'Button',
};
