import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import React, { FC } from 'react';

import { CollapsePanel, CollapsePanelItem } from '@sbercloud/uikit-react-collapse-panel';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const VariantView = css`
  box-sizing: border-box;
  margin-right: 8px !important;
`;

const Description = styled.div`
  white-space: break-spaces;
  word-break: break-all;
`;
export type TypographyStoryConfig = Array<{ name: string; Component: FC<{ className?: string }>; styles: string }>;
export const commonTemplate =
  (config: TypographyStoryConfig) =>
  ({ value }: { value: string }) =>
    (
      <CollapsePanel>
        {config.map(({ name, Component, styles }, index) => (
          <CollapsePanelItem
            index={index}
            key={index}
            header={
              <Row>
                <Component className={VariantView}>{name}:</Component>
                <Component>{value}</Component>
              </Row>
            }
          >
            <Description>{styles}</Description>
          </CollapsePanelItem>
        ))}
      </CollapsePanel>
    );
