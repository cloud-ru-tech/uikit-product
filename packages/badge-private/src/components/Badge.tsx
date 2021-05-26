import { FC } from 'react';

import { BadgeItemStyled, BadgeStyled } from './styled';

export type BadgeProps = {
  text?: string;
  color?: string;
  className?: string;
};

export const Badge: FC<BadgeProps> = ({ text, color, children, className }) => {
  if (!text) {
    return <>{children}</>;
  }

  return (
    <BadgeStyled className={className}>
      {children}
      <BadgeItemStyled color={color}>{text}</BadgeItemStyled>
    </BadgeStyled>
  );
};
