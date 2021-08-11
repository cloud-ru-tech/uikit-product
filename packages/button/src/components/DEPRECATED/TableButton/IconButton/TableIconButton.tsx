import { memo, useMemo } from 'react';

import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { IconButtonWrapper, RotateAnimation } from './styled';

export type IconButtonProps = {
  disabled?: boolean;
  inProgress?: boolean;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function IconButton({ onClick, inProgress, disabled, icon, ...rest }: WithSupportProps<IconButtonProps>) {
  const onClickHandler = useMemo(() => (disabled || inProgress ? undefined : onClick), [disabled, inProgress, onClick]);

  return (
    <IconButtonWrapper
      disabled={disabled}
      onClick={onClickHandler}
      data-inprogress={inProgress}
      {...extractSupportProps(rest)}
    >
      {inProgress ? <LoadingWheelInterfaceSVG className={RotateAnimation} /> : icon}
    </IconButtonWrapper>
  );
}

export default memo(IconButton);
