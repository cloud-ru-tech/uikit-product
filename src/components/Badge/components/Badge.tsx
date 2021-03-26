import { FC } from 'react';

import { BadgeStyled, BadgeItemStyled } from './styled';

export interface IBadgeProps {
  text?: string;
  color?: string;
  className?: string;
}

export const Badge: FC<IBadgeProps> = ({
  text,
  color,
  children,
  className,
}) => {
  if (!text) {
    return <>children</>;
  }

  return (
    <BadgeStyled className={className}>
      {children}
      <BadgeItemStyled color={color}>{text}</BadgeItemStyled>
    </BadgeStyled>
  );
};
