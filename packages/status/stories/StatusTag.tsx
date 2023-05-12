import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';

import { EXPORT_VARS, GLOBAL_CSS_COLOR } from '@sbercloud/uikit-product-theme';

import { StatusTag, StatusTagProps } from '../src';
import { getDefaultArgs, getDefaultParameters } from './helpers';

export default {
  title: 'Components/Status/Status Tag',
  component: StatusTag,
} as Meta;

const Container = styled.div`
  dispay: flex;
`;

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
  border: 1px solid var(${EXPORT_VARS.GREY[100]});
  overflow: auto;
`;

const TableColumn = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;

  background-color: var(${EXPORT_VARS.GREY[25]});

  &:not(:last-child) {
    border-right: 1px solid var(${EXPORT_VARS.GREY[100]});
  }
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 1px solid var(${EXPORT_VARS.GREY[100]});
  }
`;

const WrapperFContolled = styled.div`
  display: flex;
  padding: 30px;
  column-gap: 30px;
  background-color: var(${GLOBAL_CSS_COLOR.BACKGROUND_SECONDARY});
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Template: StoryFn<StatusTagProps> = ({ ...args }) => (
  <Container>
    <WrapperFContolled>
      <Title>Contolled</Title>
      <StatusTag {...args} />
    </WrapperFContolled>

    <TableWrapper>
      {Object.entries(StatusTag.variants).map(([key, value]) => (
        <TableColumn key={key}>
          <TableCell>{key}</TableCell>
          <TableCell>
            <StatusTag {...args} variant={value} />
          </TableCell>
        </TableColumn>
      ))}
    </TableWrapper>
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
