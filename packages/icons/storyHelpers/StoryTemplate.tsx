import { styled } from '@linaria/react';
import { CopyInput, Input } from '@sbercloud/uikit-react-input';
import { Modal } from '@sbercloud/uikit-react-modal';
import { H2, Text2 } from '@sbercloud/uikit-typography';
import { Story } from '@storybook/react/types-6-0';
import React, { useCallback, useState } from 'react';

import { CloseInterfaceSVG, SearchInterfaceSVG } from '../src';

const Group = styled.div`
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const Item = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  display: flex;
  height: fit-content;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const IconOverview = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  & > * + * {
    margin-top: 24px;
  }
  justify-content: space-between;
  align-items: center;
`;

export function getTemplate(
  Icons: Record<string, React.FunctionComponent<{ size?: number | string; fill?: string }>>,
): Story {
  return ({ size, fill }) => {
    const [search, setSearch] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<{
      iconName: string;
      Icon: React.FunctionComponent<{ size?: number | string }>;
      dataAttribute: string;
    } | null>(null);
    const onCloseHandler = useCallback(() => setSelectedIcon(null), []);
    return (
      <>
        <H2>Кликните на иконку для отображения дополнительной информации</H2>
        <Input
          value={search}
          onChange={event => {
            setSearch(event.target.value.toLowerCase());
          }}
          postfix={
            search ? (
              <CloseInterfaceSVG
                onClick={(): void => {
                  setSearch('');
                }}
              />
            ) : (
              <SearchInterfaceSVG />
            )
          }
          placeholder='Поиск'
        />
        <Group>
          {Object.entries(Icons)
            .filter(([key]) => key.toLowerCase().includes(search))
            .map(([key, Icon]) => (
              <Item
                key={key}
                onClick={() => {
                  const dataTestId = Icon.toString().match(/var testId = .*';/g) || [''];

                  setSelectedIcon({
                    iconName: key,
                    Icon: Icon,
                    dataAttribute: dataTestId[0].replace('var testId = ', '').replaceAll("'", '').replace(';', ''),
                  });
                }}
              >
                <Icon size={size} fill={fill} />
                <div>
                  <Text2>{key}</Text2>
                </div>
              </Item>
            ))}
        </Group>
        {selectedIcon !== null && (
          <Modal
            isOpen={true}
            appElement={document.body}
            title={selectedIcon.iconName}
            onRequestClose={onCloseHandler}
            contentStyles={{
              width: 'fit-content',
              height: 'fit-content',
              margin: 'auto',
              boxSizing: 'border-box',
              padding: '24px',
            }}
            description={
              <IconOverview>
                {selectedIcon.Icon({ size: 44 })}
                <CopyInput
                  value={`import { ${selectedIcon.iconName} } from '@sbercloud/uikit-react-icons';`}
                  label={'Import:'}
                />
                <CopyInput value={selectedIcon.dataAttribute} label={'data-test-id:'} labelMinWidth={'100px'} />
              </IconOverview>
            }
          />
        )}
      </>
    );
  };
}
