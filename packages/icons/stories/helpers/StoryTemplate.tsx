import { styled } from '@linaria/react';
import { Story } from '@storybook/react/types-6-0';
import React, { useCallback, useState } from 'react';

import { CopyInput, Input } from '@sbercloud/uikit-react-input';
import { Modal } from '@sbercloud/uikit-react-modal';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { H2, Text2 } from '@sbercloud/uikit-typography';

import { CloseInterfaceSVG, SearchInterfaceSVG } from '../../src';

const { COLORS_BUTTON } = DEPRECATED_EXPORT_VARS;

const Group = styled.div`
  margin-top: 24px;
  padding-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-column-gap: 20px;
  grid-row-gap: 12px;
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
  cursor: pointer;
  :hover {
    color: ${() => `var(${COLORS_BUTTON.TRANSPARENT_HOVER_COLOR})`};
    background-color: ${() => `var(${COLORS_BUTTON.TRANSPARENT_HOVER_BG})`};
  }
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

const CopyInputWrapper = styled.div`
  width: 100%;
`;

const TextWrapper = styled.div`
  margin-top: 12px;
`;

function generateDataTestId(componentName: string) {
  if (componentName === 'SvgFileSVG') return 'icon-svg-file';
  return 'icon' + componentName.replaceAll(/svg/gi, '').replace(/[A-Z]/g, x => '-' + x.toLowerCase());
}

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
                onClick={() =>
                  setSelectedIcon({
                    iconName: key,
                    Icon: Icon,
                    dataAttribute: generateDataTestId(key),
                  })
                }
              >
                <Icon size={size} fill={fill} />
                <TextWrapper>
                  <Text2>{key}</Text2>
                </TextWrapper>
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
                  labelMinWidth={'100px'}
                />
                <CopyInputWrapper>
                  <CopyInput value={selectedIcon.dataAttribute} label={'data-test-id:'} labelMinWidth={'100px'} />
                </CopyInputWrapper>
              </IconOverview>
            }
          />
        )}
      </>
    );
  };
}
