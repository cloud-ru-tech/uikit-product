import { styled } from '@linaria/react';

export const ButtonBox = styled.div`
  cursor: pointer;
  margin: 0 8px 0 0;
  color: #d2d2d2;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

export const TextBox = styled.div<{ isViewMode: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 12px;
  align-items: center;
  background: #f5f5f5;
  border-radius: 2px;
  height: 36px;
  width: 100%;
  color: #6c6c6c;

  text-overflow: ${(props): string => (props.isViewMode ? 'ellipsis' : 'clip')};
  overflow: hidden;
  white-space: nowrap;

  cursor: pointer;
  fill: #d2d2d2;
`;

export const Label = styled.span<{ minWidth: string }>`
  min-width: ${(props): string => props.minWidth};
  margin-right: 12px;
  color: #a0a0a0;
`;
