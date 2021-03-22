import { FC, useContext, useMemo } from 'react';

import { TabsContext, ITabsContext } from 'components/Tabs/helpers/context';
import { setValue } from 'components/Tabs/helpers/reducer';

import { ListItemStyled } from './styled';

export interface ITabProps {
  label: string;
  identKey: string | number;
  onClick?(identKey: ITabProps['identKey']): void;
}

export const Tab: FC<ITabProps> = ({ identKey, label, onClick }) => {
  const context = useContext<ITabsContext | null>(TabsContext);

  const handleClick = (): void => {
    context?.dispatch(setValue(identKey));

    if (onClick) {
      onClick(identKey);
    }
  };

  const { state } = context || {};

  const isActive = useMemo(() => identKey === context?.state?.value, [
    state?.value,
  ]);

  return (
    <ListItemStyled onClick={handleClick} data-blue={isActive}>
      {label}
    </ListItemStyled>
  );
};
