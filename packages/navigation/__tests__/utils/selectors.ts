import { Selector } from 'testcafe';

import { dataTestIdSelector } from '../../../../testcafe/utils';
import { sidebarTestId } from './testData';

export function getSidebar() {
  return Selector(dataTestIdSelector(sidebarTestId));
}

export function getItems() {
  return Selector('[data-test-id^="sidebar__item-"]');
}

export function getItemById(id: string) {
  return Selector(dataTestIdSelector(`sidebar__item-${id}`));
}

export function getItemPostfixLabelSelectorString() {
  return dataTestIdSelector('sidebar__item__postfix__label');
}

export function getItemPostfixCounterSelectorString() {
  return dataTestIdSelector('sidebar__item__postfix__counter');
}

export function getItemPostfixLockedIconSelectorString() {
  return dataTestIdSelector('sidebar__item__postfix__locked-icon');
}

export function getItemPostfixAccordionButtonSelectorString() {
  return dataTestIdSelector('sidebar__item__postfix__accordion-button');
}

export function getItemTextSelectorString() {
  return dataTestIdSelector('sidebar__item__label');
}

export function getItemText() {
  return Selector(getItemTextSelectorString());
}

export function getItemIconSelectorString() {
  return dataTestIdSelector('sidebar__item__icon');
}

export function getBackButton() {
  return Selector(dataTestIdSelector('sidebar__header__back-button'));
}

export function getOpenSearchButton() {
  return Selector(dataTestIdSelector('sidebar__header__open-search-button'));
}

export function getCloseSearchButton() {
  return Selector(dataTestIdSelector('sidebar__header__close-search-button'));
}

export function getSearch() {
  return Selector(dataTestIdSelector('sidebar__header__search')).find('input');
}

export function getCollapseButton() {
  return Selector(dataTestIdSelector('sidebar__footer__collapse-button'));
}

export function getUncollapseButton() {
  return Selector(dataTestIdSelector('sidebar__footer__uncollapse-button'));
}

export function getHoverMenu() {
  return Selector(dataTestIdSelector('sidebar__hover-menu'));
}

export function getHoverMenuItemById(id: string) {
  return Selector(dataTestIdSelector(`sidebar__hover-menu-item-${id}`));
}

export function getHoverMenuItemTextSelectorString() {
  return dataTestIdSelector('sidebar__hover-menu-item__text');
}
