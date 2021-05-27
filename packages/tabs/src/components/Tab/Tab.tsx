import { FC, useContext, useMemo } from 'react';

import { ITabsContext, TabsContext } from '../../helpers/context';
import { setValue } from '../../helpers/reducer';
import { ListItemStyled } from './styled';

export interface ITabProps {
  label: React.ReactNode;
  identKey: number;
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

  const stateValue = context?.state?.value;

  const isActive = useMemo(() => identKey === stateValue, [stateValue]);

  return (
    <ListItemStyled onClick={handleClick} data-blue={isActive || undefined}>
      {label}
    </ListItemStyled>
  );
};
