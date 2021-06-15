import { InProgressSVG } from '@sbercloud/icons';
import { memo, useMemo } from 'react';

import { IconWrap, RotateAnimation, TableTextButtonComponent } from './styled';

export type TextIconButtonProps = {
  disabled?: boolean;
  inProgress?: boolean;
  text: string;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function TextIconButton({ onClick, inProgress, disabled, text, icon }: TextIconButtonProps) {
  const onClickHandler = useMemo(() => (disabled || inProgress ? undefined : onClick), [disabled, inProgress, onClick]);
  return (
    <TableTextButtonComponent disabled={disabled} onClick={onClickHandler} data-inprogress={inProgress}>
      {text}
      {inProgress ? (
        <IconWrap>
          <InProgressSVG className={RotateAnimation} />
        </IconWrap>
      ) : (
        <IconWrap>{icon}</IconWrap>
      )}
    </TableTextButtonComponent>
  );
}

export default memo(TextIconButton);
