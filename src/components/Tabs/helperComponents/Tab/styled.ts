import { styled } from '@linaria/react';

export const ListItemStyled = styled.li`
  padding: 16px 0;
  cursor: pointer;
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #a0a0a0;

  &[data-blue='true'] {
    color: $activeColor;
    box-shadow: 0 2px 0 0 #5558fa;
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
