import { FC, useContext, useMemo } from 'react';

import { ITabsContext, TabsContext } from '../../helpers/context';
import { setValue } from '../../helpers/reducer';
import { IdentKey } from '../../helpers/types';
import { ListItemStyled } from './styled';

export interface ITabProps {
  label: React.ReactNode;
  identKey: IdentKey;
  isDisabled?: boolean;
  onClick?(identKey: IdentKey): void;
}

export const Tab: FC<ITabProps> = ({ identKey, label, onClick, isDisabled }) => {
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
    <ListItemStyled
      onClick={isDisabled ? undefined : handleClick}
      data-blue={isActive || undefined}
      data-disabled={isDisabled || undefined}
      data-test-id={`tab__${identKey}`}
    >
      {label}
    </ListItemStyled>
  );
};
