import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  Placements,
  TooltipMenuItemPrivate,
  TooltipMenuPrivate,
  TooltipPrivate,
  TooltipStateContainerPrivate,
} from '../src';

export default {
  title: 'Not stable/TooltipPrivate/Tooltip Menu Private',
  component: TooltipMenuPrivate,
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
    <TooltipStateContainerPrivate>
      {({ on, set }: { on: boolean; set: () => void; hide: () => void }) => (
        <TooltipPrivate
          {...args}
          clickOutside
          closeOnReferenceHidden
          hideArrow
          placement={Placements.BottomStart}
          trigger='click'
          tooltipShown={on}
          onVisibilityChange={set}
          tooltip={
            <TooltipMenuPrivate>
              {menuItems.map(menuItem => (
                <TooltipMenuItemPrivate key={menuItem}>{menuItem}</TooltipMenuItemPrivate>
              ))}
            </TooltipMenuPrivate>
          }
        >
          <span>Menu</span>
        </TooltipPrivate>
      )}
    </TooltipStateContainerPrivate>
  </TooltipWrapper>
);

export const tooltipMenuPrivate = Template.bind({});
tooltipMenuPrivate.args = {};
tooltipMenuPrivate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
