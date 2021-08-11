import { memo, useMemo } from 'react';

import { LoadingWheelInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-utils';

import { IconWrap, RotateAnimation, TableTextButtonComponent } from './styled';

export type TextIconButtonProps = {
  disabled?: boolean;
  inProgress?: boolean;
  text: string;
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function TextIconButton({ onClick, inProgress, disabled, text, icon, ...rest }: WithSupportProps<TextIconButtonProps>) {
  const onClickHandler = useMemo(() => (disabled || inProgress ? undefined : onClick), [disabled, inProgress, onClick]);
  return (
    <TableTextButtonComponent
      disabled={disabled}
      onClick={onClickHandler}
      data-inprogress={inProgress}
      {...extractSupportProps(rest)}
    >
      {text}
      {inProgress ? (
        <IconWrap>
          <LoadingWheelInterfaceSVG className={RotateAnimation} />
        </IconWrap>
      ) : (
        <IconWrap>{icon}</IconWrap>
      )}
    </TableTextButtonComponent>
  );
}

export default memo(TextIconButton);
