import { Children, ReactNode } from 'react';

import { TooltipPrivate } from '@sbercloud/uikit-react-tooltip-private';

import { Item, tooltipContainerClassName } from './styled';

export type TagCloudProps = {
  content: ReactNode;
  children: ReactNode;
};

export function TagCloud({ content, children }: TagCloudProps) {
  return (
    <TooltipPrivate
      delayHide={200}
      hideArrow
      placement={TooltipPrivate.placements.BottomEnd}
      tooltip={Children.map(content, item => (
        <Item>{item}</Item>
      ))}
      offset={[0, 4]}
      classNameContainer={tooltipContainerClassName}
      data-test-id='tag-cloud'
    >
      {children}
    </TooltipPrivate>
  );
}
