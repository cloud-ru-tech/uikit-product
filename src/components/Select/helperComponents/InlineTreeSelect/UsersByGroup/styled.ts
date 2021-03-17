import { styled } from '@linaria/react';
import { COLORS_SELECT } from 'theme/color/vars';

export const StyledContainer = styled.div`
  position: relative;
  min-height: 64px;

  &:before {
    content: 'Нет данных';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  :global() {
    .mlspace {
      margin: 0;
    }
    .mlspace-focused:not(.mlspace-active-focused) {
      border-color: var(${COLORS_SELECT.BACKGROUND});
    }
    .mlspace .mlspace-treenode {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      margin: 0;
      padding: 0;
      height: 36px;
      white-space: nowrap;
      list-style: none;
      outline: 0;
      background-color: var(${COLORS_SELECT.BACKGROUND});

      &:hover {
        background-color: var(${COLORS_SELECT.DROPDOWN_HOVER_BACKGROUND});
      }
    }

    .mlspace-treenode-expanded:hover
      ~ .mlspace-treenode:not(.mlspace-treenode-expanded) {
      background: var(${COLORS_SELECT.BACKGROUND_HOVER});
    }
    .mlspace-treenode-expanded:hover
      ~ .mlspace-treenode-expanded
      ~ .mlspace-treenode {
      background: transparent;
    }

    .mlspace.mlspace-filtered .mlspace-treenode:not(.filter-node) {
      display: none;
      visibility: hidden;
    }

    .mlspace .mlspace-treenode-checkbox-checked {
      background: var(${COLORS_SELECT.DROPDOWN_FOCUS_BACKGROUND});
    }

    .mlspace .mlspace-treenode .draggable {
      color: var(${COLORS_SELECT.TEXT_COLOR});
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      /* Required to make elements draggable in old WebKit */
      -khtml-user-drag: element;
      -webkit-user-drag: element;
    }
    .mlspace .mlspace-treenode.drop-container > .draggable::after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      box-shadow: inset 0 0 0 2px red;
      content: '';
    }
    .mlspace .mlspace-treenode.drop-container ~ .mlspace-treenode {
      border-left: 2px solid chocolate;
    }
    .mlspace .mlspace-treenode.drop-target {
      background-color: var(${COLORS_SELECT.BACKGROUND});
    }
    .mlspace .mlspace-treenode.drop-target ~ .mlspace-treenode {
      border-left: none;
    }

    .mlspace .mlspace-treenode ul {
      margin: 0;
      padding: 0 0 0 18px;
    }
    .mlspace .mlspace-treenode .mlspace-node-content-wrapper {
      flex-grow: 1;
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      height: 100%;
      margin: 0;
      padding: 0;
      text-decoration: none;
      vertical-align: top;
      cursor: pointer;
    }

    .mlspace .mlspace-treenode span.mlspace-switcher {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 8px;
      cursor: pointer;

      background-repeat: no-repeat;
      background-position: center;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.83398 8.33203L10.0007 12.4987L14.1673 8.33203H5.83398Z' fill='%23343F48'/%3E%3C/svg%3E%0A");

      &_close {
        transform: rotate(180deg);
      }
    }

    .mlspace .mlspace-treenode span.mlspace-checkbox {
      display: inline-block;
      height: 20px;
      width: 20px;
      margin-right: 8px;
      cursor: pointer;

      background-repeat: no-repeat;
      background-position: center;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.15 17H7.85C6.56401 16.9984 5.33117 16.4868 4.42193 15.5774C3.5127 14.6679 3.00132 13.435 3 12.149V7.849C3.00185 6.56319 3.5136 5.3306 4.42299 4.42158C5.33239 3.51256 6.56519 3.00132 7.851 3L12.151 3C13.4368 3.00185 14.6694 3.5136 15.5784 4.42299C16.4874 5.33239 16.9987 6.56519 17 7.851V12.151C16.9981 13.4366 16.4865 14.6691 15.5774 15.5781C14.6682 16.4871 13.4356 16.9984 12.15 17ZM7.851 5.913C7.33717 5.91353 6.84454 6.11788 6.48121 6.48121C6.11788 6.84454 5.91353 7.33717 5.913 7.851V12.151C5.91353 12.6648 6.11788 13.1575 6.48121 13.5208C6.84454 13.8841 7.33717 14.0885 7.851 14.089H12.151C12.6647 14.0885 13.1573 13.8841 13.5204 13.5207C13.8836 13.1574 14.0877 12.6647 14.088 12.151V7.851C14.0877 7.33709 13.8835 6.84431 13.5201 6.48092C13.1567 6.11753 12.6639 5.91326 12.15 5.913H7.851Z' fill='%23D2D2D2'/%3E%3C/svg%3E");

      &-checked {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.149 3H7.849C6.56336 3.00185 5.33092 3.51346 4.42193 4.42264C3.51294 5.33182 3.00159 6.56436 3 7.85L3 12.15C3.00159 13.436 3.51322 14.6688 4.42264 15.5781C5.33206 16.4873 6.56501 16.9987 7.851 17H12.151C13.4366 16.9981 14.6691 16.4865 15.5781 15.5774C16.4871 14.6682 16.9984 13.4356 17 12.15V7.85C16.9984 6.56401 16.4868 5.33117 15.5774 4.42193C14.6679 3.5127 13.435 3.00132 12.149 3V3ZM14.037 8.534L9.562 13.009C9.45278 13.1183 9.32309 13.2051 9.18033 13.2642C9.03756 13.3234 8.88454 13.3539 8.73 13.3539C8.57546 13.3539 8.42244 13.3234 8.27968 13.2642C8.13691 13.2051 8.00722 13.1183 7.898 13.009L5.963 11.074C5.75983 10.8657 5.64691 10.5858 5.64872 10.2948C5.65052 10.0039 5.7669 9.72537 5.97264 9.51964C6.17837 9.3139 6.45689 9.19752 6.74784 9.19572C7.03879 9.19391 7.31873 9.30683 7.527 9.51L8.627 10.61C8.64094 10.6241 8.65753 10.6352 8.67581 10.6428C8.69409 10.6504 8.7137 10.6544 8.7335 10.6544C8.7533 10.6544 8.77291 10.6504 8.79119 10.6428C8.80947 10.6352 8.82606 10.6241 8.84 10.61L12.473 6.97C12.5752 6.86521 12.6972 6.78175 12.832 6.72447C12.9667 6.6672 13.1114 6.63723 13.2578 6.63633C13.4042 6.63542 13.5493 6.66358 13.6848 6.71919C13.8202 6.77479 13.9432 6.85673 14.0468 6.96024C14.1503 7.06376 14.2322 7.1868 14.2878 7.32223C14.3434 7.45765 14.3716 7.60277 14.3707 7.74916C14.3698 7.89555 14.3398 8.04031 14.2825 8.17503C14.2252 8.30976 14.1418 8.43177 14.037 8.534Z' fill='%235558FA'/%3E%3C/svg%3E%0A");
      }
      &-indeterminate {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.849 3H12.149C13.435 3.00132 14.6679 3.5127 15.5774 4.42193C16.4868 5.33117 16.9984 6.56401 17 7.85V12.15C16.9984 13.4356 16.4871 14.6682 15.5781 15.5774C14.6691 16.4865 13.4366 16.9981 12.151 17H7.851C6.56501 16.9987 5.33206 16.4873 4.42264 15.5781C3.51322 14.6688 3.00159 13.436 3 12.15V7.85C3.00159 6.56436 3.51294 5.33182 4.42193 4.42264C5.33092 3.51346 6.56336 3.00185 7.849 3Z' fill='%235558FA'/%3E%3Crect x='5.5' y='8.79999' width='9' height='2.5' rx='1.25' fill='%23F5F5F5'/%3E%3C/svg%3E%0A");
      }
    }

    .mlspace .mlspace-treenode-half-indeterminate span.mlspace-checkbox {
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.849 3H12.149C13.435 3.00132 14.6679 3.5127 15.5774 4.42193C16.4868 5.33117 16.9984 6.56401 17 7.85V12.15C16.9984 13.4356 16.4871 14.6682 15.5781 15.5774C14.6691 16.4865 13.4366 16.9981 12.151 17H7.851C6.56501 16.9987 5.33206 16.4873 4.42264 15.5781C3.51322 14.6688 3.00159 13.436 3 12.15V7.85C3.00159 6.56436 3.51294 5.33182 4.42193 4.42264C5.33092 3.51346 6.56336 3.00185 7.849 3Z' fill='%235558FA'/%3E%3Crect x='5.5' y='8.79999' width='9' height='2.5' rx='1.25' fill='%23F5F5F5'/%3E%3C/svg%3E%0A");

      &-checked {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.149 3H7.849C6.56336 3.00185 5.33092 3.51346 4.42193 4.42264C3.51294 5.33182 3.00159 6.56436 3 7.85L3 12.15C3.00159 13.436 3.51322 14.6688 4.42264 15.5781C5.33206 16.4873 6.56501 16.9987 7.851 17H12.151C13.4366 16.9981 14.6691 16.4865 15.5781 15.5774C16.4871 14.6682 16.9984 13.4356 17 12.15V7.85C16.9984 6.56401 16.4868 5.33117 15.5774 4.42193C14.6679 3.5127 13.435 3.00132 12.149 3V3ZM14.037 8.534L9.562 13.009C9.45278 13.1183 9.32309 13.2051 9.18033 13.2642C9.03756 13.3234 8.88454 13.3539 8.73 13.3539C8.57546 13.3539 8.42244 13.3234 8.27968 13.2642C8.13691 13.2051 8.00722 13.1183 7.898 13.009L5.963 11.074C5.75983 10.8657 5.64691 10.5858 5.64872 10.2948C5.65052 10.0039 5.7669 9.72537 5.97264 9.51964C6.17837 9.3139 6.45689 9.19752 6.74784 9.19572C7.03879 9.19391 7.31873 9.30683 7.527 9.51L8.627 10.61C8.64094 10.6241 8.65753 10.6352 8.67581 10.6428C8.69409 10.6504 8.7137 10.6544 8.7335 10.6544C8.7533 10.6544 8.77291 10.6504 8.79119 10.6428C8.80947 10.6352 8.82606 10.6241 8.84 10.61L12.473 6.97C12.5752 6.86521 12.6972 6.78175 12.832 6.72447C12.9667 6.6672 13.1114 6.63723 13.2578 6.63633C13.4042 6.63542 13.5493 6.66358 13.6848 6.71919C13.8202 6.77479 13.9432 6.85673 14.0468 6.96024C14.1503 7.06376 14.2322 7.1868 14.2878 7.32223C14.3434 7.45765 14.3716 7.60277 14.3707 7.74916C14.3698 7.89555 14.3398 8.04031 14.2825 8.17503C14.2252 8.30976 14.1418 8.43177 14.037 8.534Z' fill='%235558FA'/%3E%3C/svg%3E%0A");
      }
    }

    .mlspace .mlspace-treenode-disabled span.mlspace-checkbox {
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.15 17H7.85C6.56401 16.9984 5.33117 16.4868 4.42193 15.5774C3.5127 14.6679 3.00132 13.435 3 12.149V7.849C3.00185 6.56319 3.5136 5.3306 4.42299 4.42158C5.33239 3.51256 6.56519 3.00132 7.851 3L12.151 3C13.4368 3.00185 14.6694 3.5136 15.5784 4.42299C16.4874 5.33239 16.9987 6.56519 17 7.851V12.151C16.9981 13.4366 16.4865 14.6691 15.5774 15.5781C14.6682 16.4871 13.4356 16.9984 12.15 17ZM7.851 5.913C7.33717 5.91353 6.84454 6.11788 6.48121 6.48121C6.11788 6.84454 5.91353 7.33717 5.913 7.851V12.151C5.91353 12.6648 6.11788 13.1575 6.48121 13.5208C6.84454 13.8841 7.33717 14.0885 7.851 14.089H12.151C12.6647 14.0885 13.1573 13.8841 13.5204 13.5207C13.8836 13.1574 14.0877 12.6647 14.088 12.151V7.851C14.0877 7.33709 13.8835 6.84431 13.5201 6.48092C13.1567 6.11753 12.6639 5.91326 12.15 5.913H7.851Z' fill='%23EDEDED'/%3E%3C/svg%3E");

      &-checked {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.149 3H7.849C6.56336 3.00185 5.33092 3.51346 4.42193 4.42264C3.51294 5.33182 3.00159 6.56436 3 7.85L3 12.15C3.00159 13.436 3.51322 14.6688 4.42264 15.5781C5.33206 16.4873 6.56501 16.9987 7.851 17H12.151C13.4366 16.9981 14.6691 16.4865 15.5781 15.5774C16.4871 14.6682 16.9984 13.4356 17 12.15V7.85C16.9984 6.56401 16.4868 5.33117 15.5774 4.42193C14.6679 3.5127 13.435 3.00132 12.149 3V3ZM14.037 8.534L9.562 13.009C9.45278 13.1183 9.32309 13.2051 9.18033 13.2642C9.03756 13.3234 8.88454 13.3539 8.73 13.3539C8.57546 13.3539 8.42244 13.3234 8.27968 13.2642C8.13691 13.2051 8.00722 13.1183 7.898 13.009L5.963 11.074C5.75983 10.8657 5.64691 10.5858 5.64872 10.2948C5.65052 10.0039 5.7669 9.72537 5.97264 9.51964C6.17837 9.3139 6.45689 9.19752 6.74784 9.19572C7.03879 9.19391 7.31873 9.30683 7.527 9.51L8.627 10.61C8.64094 10.6241 8.65753 10.6352 8.67581 10.6428C8.69409 10.6504 8.7137 10.6544 8.7335 10.6544C8.7533 10.6544 8.77291 10.6504 8.79119 10.6428C8.80947 10.6352 8.82606 10.6241 8.84 10.61L12.473 6.97C12.5752 6.86521 12.6972 6.78175 12.832 6.72447C12.9667 6.6672 13.1114 6.63723 13.2578 6.63633C13.4042 6.63542 13.5493 6.66358 13.6848 6.71919C13.8202 6.77479 13.9432 6.85673 14.0468 6.96024C14.1503 7.06376 14.2322 7.1868 14.2878 7.32223C14.3434 7.45765 14.3716 7.60277 14.3707 7.74916C14.3698 7.89555 14.3398 8.04031 14.2825 8.17503C14.2252 8.30976 14.1418 8.43177 14.037 8.534Z' fill='%23AAABFC'/%3E%3C/svg%3E%0A");
      }
      &-checked {
        background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.149 3H7.849C6.56336 3.00185 5.33092 3.51346 4.42193 4.42264C3.51294 5.33182 3.00159 6.56436 3 7.85L3 12.15C3.00159 13.436 3.51322 14.6688 4.42264 15.5781C5.33206 16.4873 6.56501 16.9987 7.851 17H12.151C13.4366 16.9981 14.6691 16.4865 15.5781 15.5774C16.4871 14.6682 16.9984 13.4356 17 12.15V7.85C16.9984 6.56401 16.4868 5.33117 15.5774 4.42193C14.6679 3.5127 13.435 3.00132 12.149 3V3ZM14.037 8.534L9.562 13.009C9.45278 13.1183 9.32309 13.2051 9.18033 13.2642C9.03756 13.3234 8.88454 13.3539 8.73 13.3539C8.57546 13.3539 8.42244 13.3234 8.27968 13.2642C8.13691 13.2051 8.00722 13.1183 7.898 13.009L5.963 11.074C5.75983 10.8657 5.64691 10.5858 5.64872 10.2948C5.65052 10.0039 5.7669 9.72537 5.97264 9.51964C6.17837 9.3139 6.45689 9.19752 6.74784 9.19572C7.03879 9.19391 7.31873 9.30683 7.527 9.51L8.627 10.61C8.64094 10.6241 8.65753 10.6352 8.67581 10.6428C8.69409 10.6504 8.7137 10.6544 8.7335 10.6544C8.7533 10.6544 8.77291 10.6504 8.79119 10.6428C8.80947 10.6352 8.82606 10.6241 8.84 10.61L12.473 6.97C12.5752 6.86521 12.6972 6.78175 12.832 6.72447C12.9667 6.6672 13.1114 6.63723 13.2578 6.63633C13.4042 6.63542 13.5493 6.66358 13.6848 6.71919C13.8202 6.77479 13.9432 6.85673 14.0468 6.96024C14.1503 7.06376 14.2322 7.1868 14.2878 7.32223C14.3434 7.45765 14.3716 7.60277 14.3707 7.74916C14.3698 7.89555 14.3398 8.04031 14.2825 8.17503C14.2252 8.30976 14.1418 8.43177 14.037 8.534Z' fill='%23AAABFC'/%3E%3C/svg%3E%0A");
      }
    }

    .mlspace .mlspace-treenode span.mlspace-switcher.mlspace-icon__customize,
    .mlspace .mlspace-treenode span.mlspace-checkbox.mlspace-icon__customize,
    .mlspace .mlspace-treenode span.mlspace-iconEle.mlspace-icon__customize {
      background-image: none;
      margin-right: 8px;
    }
    .mlspace .mlspace-treenode span.mlspace-icon_loading {
      margin-right: 2px;
      vertical-align: top;
      background: url('data:image/gif;base64,R0lGODlhEAAQAKIGAMLY8YSx5HOm4Mjc88/g9Ofw+v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAAEAAQAAADMGi6RbUwGjKIXCAA016PgRBElAVlG/RdLOO0X9nK61W39qvqiwz5Ls/rRqrggsdkAgAh+QQFCgAGACwCAAAABwAFAAADD2hqELAmiFBIYY4MAutdCQAh+QQFCgAGACwGAAAABwAFAAADD1hU1kaDOKMYCGAGEeYFCQAh+QQFCgAGACwKAAIABQAHAAADEFhUZjSkKdZqBQG0IELDQAIAIfkEBQoABgAsCgAGAAUABwAAAxBoVlRKgyjmlAIBqCDCzUoCACH5BAUKAAYALAYACgAHAAUAAAMPaGpFtYYMAgJgLogA610JACH5BAUKAAYALAIACgAHAAUAAAMPCAHWFiI4o1ghZZJB5i0JACH5BAUKAAYALAAABgAFAAcAAAMQCAFmIaEp1motpDQySMNFAgA7')
        no-repeat scroll 0 0 transparent;
    }
    .mlspace .mlspace-treenode span.mlspace-switcher.mlspace-switcher-noop {
      cursor: auto;
    }
    .mlspace
      .mlspace-treenode
      span.mlspace-checkbox.mlspace-checkbox-indeterminate.mlspace-checkbox-disabled {
      position: relative;
      background: var(${COLORS_SELECT.DISABLED_BACKGROUND});
      border-radius: 3px;
    }
    .mlspace
      .mlspace-treenode
      span.mlspace-checkbox.mlspace-checkbox-indeterminate.mlspace-checkbox-disabled::after {
      position: absolute;
      top: 5px;
      left: 3px;
      width: 5px;
      height: 0;
      border: 2px solid var(${COLORS_SELECT.DISABLED_BORDER_COLOR});
      border-top: 0;
      border-left: 0;
      -webkit-transform: scale(1);
      transform: scale(1);
      content: ' ';
    }
    .mlspace:not(.mlspace-show-line) .mlspace-treenode .mlspace-switcher-noop {
      background: none;
    }
    .mlspace-child-tree {
      display: none;
    }
    .mlspace-child-tree-open {
      display: block;
    }
    .mlspace-treenode-disabled > span:not(.mlspace-switcher),
    .mlspace-treenode-disabled > a,
    .mlspace-treenode-disabled > a span {
      color: var(${COLORS_SELECT.DISABLED_TEXT_COLOR});
      cursor: not-allowed;
    }
    .mlspace-treenode-active {
      background: rgba(0, 0, 0, 0.1);
    }
    .mlspace-node-selected {
      background-color: var(${COLORS_SELECT.DROPDOWN_FOCUS_BACKGROUND});
      box-shadow: 0 0 0 1px #ffb951;
      opacity: 0.8;
    }
    .mlspace-icon__customize {
      margin-right: 2px;
      vertical-align: top;
    }
    .mlspace-title {
      color: var(${COLORS_SELECT.TEXT_COLOR});
      display: inline-block;
    }
    .mlspace-indent {
      display: inline-block;
      vertical-align: bottom;
      height: 0;
    }
  }
`;
