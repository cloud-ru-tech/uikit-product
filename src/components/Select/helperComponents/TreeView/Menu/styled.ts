import { styled } from '@linaria/react';
import { COLORS_INPUT, COLORS_SELECT } from 'theme/color/vars';

export const StyledContainer = styled.div`
  border-radius: 4px;
  background: var(${COLORS_SELECT.BACKGROUND});
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  :global() {
    .rc-tree-treenode {
      display: flex;
    }
    .rc-tree-checkbox {
      display: inline-block;
      min-height: 20px;
      min-width: 20px;
      margin-right: 8px;
      background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.15 17H7.85C6.56401 16.9984 5.33117 16.4868 4.42193 15.5774C3.5127 14.6679 3.00132 13.435 3 12.149V7.849C3.00185 6.56319 3.5136 5.3306 4.42299 4.42158C5.33239 3.51256 6.56519 3.00132 7.851 3L12.151 3C13.4368 3.00185 14.6694 3.5136 15.5784 4.42299C16.4874 5.33239 16.9987 6.56519 17 7.851V12.151C16.9981 13.4366 16.4865 14.6691 15.5774 15.5781C14.6682 16.4871 13.4356 16.9984 12.15 17ZM7.851 5.913C7.33717 5.91353 6.84454 6.11788 6.48121 6.48121C6.11788 6.84454 5.91353 7.33717 5.913 7.851V12.151C5.91353 12.6648 6.11788 13.1575 6.48121 13.5208C6.84454 13.8841 7.33717 14.0885 7.851 14.089H12.151C12.6647 14.0885 13.1573 13.8841 13.5204 13.5207C13.8836 13.1574 14.0877 12.6647 14.088 12.151V7.851C14.0877 7.33709 13.8835 6.84431 13.5201 6.48092C13.1567 6.11753 12.6639 5.91326 12.15 5.913H7.851Z' fill='%23D2D2D2'/%3E%3C/svg%3E")
        no-repeat;

      &-checked {
        background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.149 3H7.849C6.56336 3.00185 5.33092 3.51346 4.42193 4.42264C3.51294 5.33182 3.00159 6.56436 3 7.85L3 12.15C3.00159 13.436 3.51322 14.6688 4.42264 15.5781C5.33206 16.4873 6.56501 16.9987 7.851 17H12.151C13.4366 16.9981 14.6691 16.4865 15.5781 15.5774C16.4871 14.6682 16.9984 13.4356 17 12.15V7.85C16.9984 6.56401 16.4868 5.33117 15.5774 4.42193C14.6679 3.5127 13.435 3.00132 12.149 3V3ZM14.037 8.534L9.562 13.009C9.45278 13.1183 9.32309 13.2051 9.18033 13.2642C9.03756 13.3234 8.88454 13.3539 8.73 13.3539C8.57546 13.3539 8.42244 13.3234 8.27968 13.2642C8.13691 13.2051 8.00722 13.1183 7.898 13.009L5.963 11.074C5.75983 10.8657 5.64691 10.5858 5.64872 10.2948C5.65052 10.0039 5.7669 9.72537 5.97264 9.51964C6.17837 9.3139 6.45689 9.19752 6.74784 9.19572C7.03879 9.19391 7.31873 9.30683 7.527 9.51L8.627 10.61C8.64094 10.6241 8.65753 10.6352 8.67581 10.6428C8.69409 10.6504 8.7137 10.6544 8.7335 10.6544C8.7533 10.6544 8.77291 10.6504 8.79119 10.6428C8.80947 10.6352 8.82606 10.6241 8.84 10.61L12.473 6.97C12.5752 6.86521 12.6972 6.78175 12.832 6.72447C12.9667 6.6672 13.1114 6.63723 13.2578 6.63633C13.4042 6.63542 13.5493 6.66358 13.6848 6.71919C13.8202 6.77479 13.9432 6.85673 14.0468 6.96024C14.1503 7.06376 14.2322 7.1868 14.2878 7.32223C14.3434 7.45765 14.3716 7.60277 14.3707 7.74916C14.3698 7.89555 14.3398 8.04031 14.2825 8.17503C14.2252 8.30976 14.1418 8.43177 14.037 8.534Z' fill='%235558FA'/%3E%3C/svg%3E%0A")
          no-repeat;
      }
      &-indeterminate {
        background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.849 3H12.149C13.435 3.00132 14.6679 3.5127 15.5774 4.42193C16.4868 5.33117 16.9984 6.56401 17 7.85V12.15C16.9984 13.4356 16.4871 14.6682 15.5781 15.5774C14.6691 16.4865 13.4366 16.9981 12.151 17H7.851C6.56501 16.9987 5.33206 16.4873 4.42264 15.5781C3.51322 14.6688 3.00159 13.436 3 12.15V7.85C3.00159 6.56436 3.51294 5.33182 4.42193 4.42264C5.33092 3.51346 6.56336 3.00185 7.849 3Z' fill='%235558FA'/%3E%3Crect x='5.5' y='8.79999' width='9' height='2.5' rx='1.25' fill='%23F5F5F5'/%3E%3C/svg%3E%0A")
          no-repeat;
      }
    }
    .rc-tree-switcher {
      display: inline-block;
      width: 16px;
      height: 16px;
      cursor: pointer;

      background-repeat: no-repeat;
      background-position: center;
      &_open {
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='%343F48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.833252 4.66667L4.99992 0.5L9.16658 4.66667H0.833252Z' fill='inherit'/%3E%3C/svg%3E%0A");
      }
      &_close {
        background-image: url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='%343F48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.833496 0.333496L5.00016 4.50016L9.16683 0.333496H0.833496Z' fill='inherit'/%3E%3C/svg%3E%0A");
      }
    }
    :global .rc-tree-node-content-wrapper {
      display: flex;
    }
  }
`;

export const StyledInputContainer = styled.div`
  padding: 0px 8px;
  position: relative;
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledSearchInput = styled.input`
  font-family: SB Sans Interface;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  height: 28px;
  border: none;
  width: 100%;
  outline: none;
  color: var(${COLORS_INPUT.INPUT_TEXT_COLOR});
  &::placeholder {
    color: var(${COLORS_INPUT.INPUT_PLACEHOLDER_COLOR});
  }
`;

export const StyledTreeContainer = styled.div`
  padding: 8px;
`;
