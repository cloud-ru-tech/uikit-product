import { css } from '@linaria/core';
import { styled } from '@linaria/react';

import { COLORS_SELECT } from 'theme/color/vars';

import arrowUp from '../../../assets/arrow_up.assets.svg';
import checkboxSelected from '../../../assets/checked_selected.assets.svg';
import checkboxUnselected from '../../../assets/checkbox_unselected.assets.svg';
import checkboxInterminate from '../../../assets/checkbox_interminate.assets.svg';

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
`;

export const selectClassname = css`
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
      margin: 0 8px;
      cursor: pointer;

      background-repeat: no-repeat;
      background-position: center;
      background-image: url(${arrowUp});

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
      background-image: url(${checkboxUnselected});

      &-checked {
        background-image: url(${checkboxSelected});
      }
      &-indeterminate {
        background-image: url(${checkboxInterminate});
      }
    }

    .mlspace .mlspace-treenode-half-indeterminate span.mlspace-checkbox {
      background-image: url(${checkboxInterminate});

      &-checked {
        background-image: url(${checkboxSelected});
      }
    }

    .mlspace {
      & .mlspace-treenode-expanded:hover {
        & ~ .mlspace-treenode:not(.mlspace-treenode-expanded) {
          background: var(${COLORS_SELECT.DROPDOWN_HOVER_BACKGROUND});
        }

        & ~ .mlspace-treenode-expanded ~ .mlspace-treenode {
          background: var(${COLORS_SELECT.DROPDOWN_BACKGROUND});
        }
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
