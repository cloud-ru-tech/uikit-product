import {
  FC,
  useEffect,
  useReducer,
  Children,
  Component,
  ReactElement,
  ReactNode,
} from 'react';

import { TState } from 'components/Tabs/helpers/types';
import { TabsContext } from 'components/Tabs/helpers/context';
import { reducer, setValue } from 'components/Tabs/helpers/reducer';
import { ITabProps } from 'components/Tabs/helperComponents/Tab';

import { GroupStyled } from './styled';

const initialState: TState = { value: '' };

export enum TabsTheme {
  default = 'default',
  gray = 'gray',
}

export interface ITabsProps {
  label?: string;
  theme?: TabsTheme;
  className?: string;
  defaultKey?: ITabProps['identKey'];
}

export const Tabs: FC<ITabsProps> = ({
  children,
  theme,
  className,
  defaultKey,
}) => {
  // FIXME: useReducer types
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (defaultKey) {
      dispatch(setValue(defaultKey));
      return;
    }

    if (Array.isArray(children) && children.length) {
      dispatch(
        setValue(
          (children[0] as ReactElement | Component)?.props?.identKey || '',
        ),
      );
    }
  }, []);

  return (
    <TabsContext.Provider value={{ state, dispatch }}>
      <GroupStyled data-gray={theme === TabsTheme.gray} className={className}>
        {children}
      </GroupStyled>
      <>
        {Children.map(children, (child: ReactNode) => {
          if (
            (child as ReactElement | Component)?.props?.identKey !==
            state?.value
          ) {
            return undefined;
          }

          return (child as ReactElement | Component)?.props?.children;
        })}
      </>
    </TabsContext.Provider>
  );
};
