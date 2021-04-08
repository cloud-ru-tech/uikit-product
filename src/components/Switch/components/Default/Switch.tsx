import ReactSwitch, { ReactSwitchProps } from 'react-switch';
import { cx } from '@linaria/core';

import {
  switchClassName,
  switchClassNameChecked,
  switchClassNameDisabled,
} from './styled';

export const Switch: React.FC<ReactSwitchProps> = ({ className, ...rest }) => (
  <ReactSwitch
    handleDiameter={10}
    height={14}
    width={24}
    uncheckedIcon={false}
    checkedIcon={false}
    activeBoxShadow=''
    className={cx(
      switchClassName,
      rest.checked && switchClassNameChecked,
      rest.disabled && switchClassNameDisabled,
      className,
    )}
    {...rest}
  />
);
