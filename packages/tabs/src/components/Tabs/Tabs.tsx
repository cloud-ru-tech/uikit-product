import { Children, Component, FC, ReactElement, ReactNode, useEffect, useReducer } from 'react';

import { TabsContext } from '../../helpers/context';
import { reducer, setValue } from '../../helpers/reducer';
import { IdentKey, TState } from '../../helpers/types';
import { GroupStyled } from './styled';

const initialState: TState = { value: '' };

export enum TabsTheme {
  default = 'default',
  gray = 'gray',
}

export interface ITabsProps {
  theme?: TabsTheme;
  className?: string;
  defaultKey?: IdentKey;
}

export const Tabs: FC<ITabsProps> = ({ children, theme, className, defaultKey }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof defaultKey !== 'undefined') {
      dispatch(setValue(defaultKey));
      return;
    }

    if (Array.isArray(children) && children.length) {
      const firstChildValue = (children[0] as ReactElement | Component)?.props?.identKey;

      dispatch(setValue(typeof firstChildValue !== 'undefined' ? firstChildValue : ''));
    }
  }, [defaultKey]);

  return (
    <TabsContext.Provider value={{ state, dispatch }}>
      <GroupStyled data-gray={theme === TabsTheme.gray || undefined} className={className}>
        {children}
      </GroupStyled>
      <>
        {Children.map(children, (child: ReactNode) => {
          if ((child as ReactElement | Component)?.props?.identKey !== state?.value) {
            return undefined;
          }

          return (child as ReactElement | Component)?.props?.children;
        })}
      </>
    </TabsContext.Provider>
  );
};
