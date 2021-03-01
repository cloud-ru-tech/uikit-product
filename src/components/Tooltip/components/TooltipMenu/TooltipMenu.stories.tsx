import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { styled } from '@linaria/react';
import {
  Tooltip,
  TooltipStateContainer,
  TooltipMenu,
  TooltipMenuItem,
} from '../..';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [withDesign],
} as Meta;

const TooltipWrapper = styled.div`
  margin: 30px;
`;

const Template: Story = ({ children, ...args }) => (
  <TooltipWrapper>
    <TooltipStateContainer>
      {/*TODO: fix any + maybe context/hooks*/}
      {({
        on,
        set,
        hide,
      }: {
        on: boolean;
        set: () => void;
        hide: () => void;
      }) => (
        <Tooltip
          clickOutside
          closeOnReferenceHidden
          hideArrow
          placement='bottom-start'
          trigger='click'
          tooltipShown={on}
          onVisibilityChange={set}
          tooltip={
            <TooltipMenu>
              <TooltipMenuItem>Сведения об объекте</TooltipMenuItem>
              <TooltipMenuItem>Предварительный просмотр</TooltipMenuItem>
              <TooltipMenuItem>Целевое действие</TooltipMenuItem>
              <TooltipMenuItem>Изменить права доступа</TooltipMenuItem>
              <TooltipMenuItem>Изменить тип данных</TooltipMenuItem>
              <TooltipMenuItem>Добавить в избранное</TooltipMenuItem>
              <TooltipMenuItem>Переименовать</TooltipMenuItem>
              <TooltipMenuItem>Переместить</TooltipMenuItem>
              <TooltipMenuItem>Скачать</TooltipMenuItem>
              <TooltipMenuItem>Удалить</TooltipMenuItem>
            </TooltipMenu>
          }
        >
          <span>Menu</span>
        </Tooltip>
      )}
    </TooltipStateContainer>
  </TooltipWrapper>
);

export const menu = Template.bind({});

menu.args = {};

menu.parameters = {};
