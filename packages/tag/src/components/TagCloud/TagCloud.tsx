import { Children, ReactNode } from 'react';
import { useTransition } from 'react-transition-state';

import { TooltipPrivate } from '@sbercloud/uikit-product-tooltip-private';

import { Content, Item, tooltipContainerClassName, TRANSITION_DURATION } from './styled';

export type TagCloudProps = {
  content: ReactNode;
  children: ReactNode;
};

export function TagCloud({ content, children }: TagCloudProps) {
  const [state, toggle] = useTransition({ timeout: TRANSITION_DURATION, mountOnEnter: true, unmountOnExit: true });

  return (
    <TooltipPrivate
      delayHide={200}
      hideArrow
      placement={TooltipPrivate.placements.BottomEnd}
      visible={state !== 'unmounted'}
      onVisibleChange={toggle}
      tooltip={
        <Content data-state={state}>
          {Children.map(content, item => (
            <Item>{item}</Item>
          ))}
        </Content>
      }
      offset={[0, 4]}
      classNameContainer={tooltipContainerClassName}
      data-test-id='tag-cloud'
    >
      {children}
    </TooltipPrivate>
  );
}
