import { useState } from 'react';

const UIKIT_IS_SIDEBAR_COLLAPSED = 'UIKIT_IS_SIDEBAR_COLLAPSED';

const getIsCollapsed = () => {
  const isCollapsed = window.localStorage.getItem(UIKIT_IS_SIDEBAR_COLLAPSED);
  return isCollapsed === 'true';
};

type UseIsCollapsedStateReturnType = [boolean, (value: boolean) => void];

export const useIsCollapsedState = (): UseIsCollapsedStateReturnType => {
  const [isCollapsed, setIsCollapsed] = useState(getIsCollapsed);

  const toggleIsCollapsed = (value: boolean) => {
    setIsCollapsed(value);
    window.localStorage.setItem(UIKIT_IS_SIDEBAR_COLLAPSED, value.toString());
  };

  return [isCollapsed, toggleIsCollapsed];
};
