import React, { FC, useCallback } from 'react';

import { CopyButton, RefreshButton } from '@sbercloud/uikit-react-button';

import { ButtonBox, Content, ContentLine, ContentLineText, ItemTitle, Main } from './styled';

export type LogsViewProps = {
  data?: { [key: string]: string[] };
  onUpdateLogs?: () => void;
};

const DEFAULT_LOGS_DATA = { details: ['not found'] };

export const LogsView: FC<LogsViewProps> = ({ data, onUpdateLogs }) => {
  const onRefreshCallback = useCallback(() => onUpdateLogs && onUpdateLogs(), [onUpdateLogs]);

  return (
    <Main>
      <Content>
        {Object.entries(data || DEFAULT_LOGS_DATA).map(([key, itemList]) => (
          <div key={`logs-box-${key}`}>
            <ItemTitle>
              <strong>{key}</strong>
            </ItemTitle>
            {itemList.map((item, i) => (
              <ContentLine key={`logs-box-${i}`}>
                <ContentLineText>{item}</ContentLineText>
              </ContentLine>
            ))}
          </div>
        ))}
      </Content>
      <ButtonBox>
        <RefreshButton onClick={onRefreshCallback} />
        <CopyButton text={JSON.stringify(data)} />
      </ButtonBox>
    </Main>
  );
};
