import { LoadingSVG } from '@sbercloud/icons';
import { useMemo, memo } from 'react';
import { TableTextButtonComponent, IconWrap, RotateAnimation } from './styled';

export type TextIconButtonProps = {
  disabled?: boolean;
  inProgress?: boolean;
  text: string;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function TextIconButton({
  onClick,
  inProgress,
  disabled,
  text,
  icon,
}: TextIconButtonProps) {
  const onClickHandler = useMemo(
    () => (disabled || inProgress ? undefined : onClick),
    [disabled, inProgress, onClick],
  );
  return (
    <TableTextButtonComponent
      disabled={disabled}
      onClick={onClickHandler}
      data-inprogress={inProgress}
    >
      {text}
      {inProgress ? (
        <IconWrap>
          <LoadingSVG className={RotateAnimation} />
        </IconWrap>
      ) : (
        <IconWrap>{icon}</IconWrap>
      )}
    </TableTextButtonComponent>
  );
}

export default memo(TextIconButton);
