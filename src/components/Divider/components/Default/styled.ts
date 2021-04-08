import { styled } from '@linaria/react';

interface IStyleProps {
  color: string;
}

export const StyledDivider = styled.hr<IStyleProps>`
  border: none;
  color: ${props => props.color};
  background: ${props => props.color};
  height: 1px;
  width: 100%;
  margin: 0;
`;
