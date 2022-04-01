import { ReactText, useContext, useEffect, useRef } from 'react';

import { WithSupportProps, keyboardSelectHandler } from '@sbercloud/uikit-utils';

import { TabContext } from '../../helpers/context';
import { SelectedTabRef, TabId } from '../../helpers/types';
import { CounterProps } from '../Counter';
import * as S from './styled';

export type NavigationItemProps = WithSupportProps<{
  value: TabId;
  label: ReactText;
  disabled?: boolean;
  counter?: CounterProps['value'];
}>;

export function NavigationItem({ value, label, counter, disabled }: NavigationItemProps) {
  const { selectedTab, setSelectedTab, counterType, setSelectedTabRef } = useContext(TabContext);
  const customRef: SelectedTabRef = useRef(null);
  const isSelected = value === selectedTab;

  const changeTabHandler = () => {
    if (disabled) return;
    setSelectedTab(value);
  };

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
      key={`tabs__navigation-list-item:${value}`}
      role='tab'
      tabIndex={0}
      data-test-id={`tabs__navigation-list-item:${value}`}
      onClick={changeTabHandler}
      onKeyPress={keyboardSelectHandler(changeTabHandler)}
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
