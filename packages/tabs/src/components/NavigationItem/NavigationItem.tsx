import { ReactText, useContext, useEffect, useRef } from 'react';

import { CounterProps } from '@sbercloud/uikit-product-counter';
import { keyboardSelectHandler, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { TabContext } from '../../helpers/context';
import { SelectedTabRef, TabId } from '../../helpers/types';
import * as S from './styled';

export type NavigationItemProps = WithSupportProps<{
  value: TabId;
  label: ReactText;
  disabled?: boolean;
  counter?: CounterProps['value'];
}>;

export function NavigationItem({ value, label, counter, disabled }: NavigationItemProps) {
  const { selectedTab, setSelectedTab, counterType, setSelectedTabRef, tabsWrapperRef, size } = useContext(TabContext);
  const customRef: SelectedTabRef = useRef(null);
  const isSelected = value === selectedTab;

  const changeTabHandler = () => {
    if (disabled) return;
    setSelectedTab(value);
  };

  useEffect(() => {
    if (selectedTab !== value) return;
    if (selectedTab === value) {
      if (customRef.current && tabsWrapperRef?.current) {
        //Tabs
        const clientWidth = tabsWrapperRef.current.clientWidth;

        // Tab
        const offset = customRef.current.offsetLeft;
        const width = customRef.current.clientWidth;

        tabsWrapperRef.current.scrollTo({ left: offset - clientWidth / 2 + width / 2, behavior: 'smooth' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  useEffect(() => {
    if (isSelected) {
      setSelectedTabRef(customRef);
    }
  }, [isSelected, setSelectedTabRef]);

  return (
    <S.Tab
      ref={customRef}
      data-selected={isSelected}
      data-disabled={disabled ? 'true' : undefined}
      data-size={size}
      key={`tabs__navigation-list-item:${value}`}
      role='tab'
      tabIndex={0}
      data-test-id={`tabs__navigation-list-item:${value}`}
      onClick={changeTabHandler}
      onKeyDown={keyboardSelectHandler(changeTabHandler)}
    >
      <S.Label data-test-id={`tabs__navigation-list-item:${value}__label`}>{label}</S.Label>
      {Number.isInteger(counter) && (
        <S.StyledCounter
          value={counter as number}
          type={counterType}
          data-test-id={`tabs__navigation-list-item:${value}__counter`}
        />
      )}
    </S.Tab>
  );
}
