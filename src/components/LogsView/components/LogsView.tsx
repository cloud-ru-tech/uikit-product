import React, { useCallback, FC } from 'react';

import { CopyButton, RefreshButton } from 'components';
import {
  Main,
  Content,
  ContentLine,
  ContentLineText,
  ItemTitle,
  ButtonBox,
} from './styled';

export interface ILogsViewProps {
  data?: { [key: string]: string[] };
  onUpdateLogs?: () => void;
}

const DEFAULT_LOGS_DATA = { details: ['not found'] };

export const LogsView: FC<ILogsViewProps> = ({ data, onUpdateLogs }) => {
  const onRefreshCallback = useCallback(() => onUpdateLogs && onUpdateLogs(), [
    onUpdateLogs,
  ]);

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
        <RefreshButton
          onRefresh={onRefreshCallback}
          variant={RefreshButton.variants.tableMenu}
        />
        <CopyButton
          text={JSON.stringify(data)}
          variant={CopyButton.variants.tableMenu}
        />
      </ButtonBox>
    </Main>
  );
};
