import { styled } from '@linaria/react';

export const HiddenRadio = styled.input`
  opacity: 0;
  display: none;
`;

export const TextContainer = styled.input`
  padding-left: 8px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 14px;
  height: 14px;
`;

export const CheckboxContainer = styled.label`
  display: inline-flex;
  padding: 8px;

  &[data-grey-bg]: {
    background-color: #f5f5f5;
  }
`;

export const Label = styled.div`
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1;
  color: #1b1b1b;
`;
export const Description = styled.div`
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  color: #6c6c6c;
`;

// CHECK
// p {
//   animation-duration: 3s;
//   animation-name: slidein;
// }

// @keyframes checked {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
