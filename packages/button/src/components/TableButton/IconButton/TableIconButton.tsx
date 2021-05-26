import { memo, useMemo } from 'react';

import { LoadingSVG } from '@sbercloud/icons';

import { IconButtonWrapper, RotateAnimation } from './styled';

export type IconButtonProps = {
  disabled?: boolean;
  inProgress?: boolean;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function IconButton({ onClick, inProgress, disabled, icon }: IconButtonProps) {
  const onClickHandler = useMemo(() => (disabled || inProgress ? undefined : onClick), [disabled, inProgress, onClick]);

  return (
    <IconButtonWrapper disabled={disabled} onClick={onClickHandler} data-inprogress={inProgress}>
      {inProgress ? <LoadingSVG className={RotateAnimation} /> : icon}
    </IconButtonWrapper>
  );
}

export default memo(IconButton);
