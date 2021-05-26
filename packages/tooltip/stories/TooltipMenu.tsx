import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Tooltip, TooltipMenu, TooltipMenuItem, TooltipStateContainer } from '../src';

export default {
  title: 'Components/Tooltip/Tooltip Menu',
  component: Tooltip,
} as Meta;

const TooltipWrapper = styled.div`
  margin: 30px;
`;

const menuItems = [
  'Сведения об объекте',
  'Предварительный просмотр',
  'Целевое действие',
  'Изменить права доступа',
  'Изменить тип данных',
  'Добавить в избранное',
  'Переименовать',
  'Переместить',
  'Скачать',
  'Удалить',
];

const Template: Story = ({ ...args }) => (
  <TooltipWrapper>
    <TooltipStateContainer>
      {/* TODO: maybe context/hooks */}
      {({ on, set }: { on: boolean; set: () => void; hide: () => void }) => (
        <Tooltip
          {...args}
          clickOutside
          closeOnReferenceHidden
          hideArrow
          placement='bottom-start'
          trigger='click'
          tooltipShown={on}
          onVisibilityChange={set}
          tooltip={
            <TooltipMenu>
              {menuItems.map(menuItem => (
                <TooltipMenuItem key={menuItem}>{menuItem}</TooltipMenuItem>
              ))}
            </TooltipMenu>
          }
        >
          <span>Menu</span>
        </Tooltip>
      )}
    </TooltipStateContainer>
  </TooltipWrapper>
);

export const tooltipMenu = Template.bind({});
tooltipMenu.args = {};
tooltipMenu.parameters = {};
