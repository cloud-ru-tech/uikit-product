import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { Story } from '@storybook/react/types-6-0';
import React, { useCallback, useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';
import { Modal } from '@sbercloud/uikit-product-modal';
import { TextField } from '@sbercloud/uikit-product-text-field';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-product-theme';
import { Toolbar } from '@sbercloud/uikit-product-toolbar';
import { H3_STYLES, TEXT_2_STYLES } from '@sbercloud/uikit-product-typography';

import { svgExport } from './downloader';
import { generateDataTestId } from './generateDataTestId';

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: fit-content;
  align-items: center;
`;

const Label = styled.span`
  min-width: 96px;
  margin-right: 12px;
`;

const TextWrapper = styled.div`
  margin-top: 12px;
`;

const Title = styled.h3`
  ${H3_STYLES};
`;

const Text = styled.span`
  ${TEXT_2_STYLES};
`;

const SearchWrapView = css`
  margin: 20px 0;
`;

export function getTemplate(
  Icons: Record<string, React.FunctionComponent<{ size?: number | string; fill?: string; id?: string }>>,
): Story {
  return ({ size, fill }) => {
    const [search, setSearch] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<{
      iconName: string;
      Icon: React.FunctionComponent<{ size?: number | string; fill?: string }>;
      dataAttribute: string;
    } | null>(null);

    const onCloseHandler = useCallback(() => setSelectedIcon(null), []);

    const downloadAsPngHandler = () => {
      const { iconName } = selectedIcon || {};

      if (iconName) {
        svgExport({ id: iconName, fileName: iconName });
      }
    };

    return (
      <>
        <Title>Кликните на иконку для отображения дополнительной информации</Title>
        <Toolbar.Container className={SearchWrapView}>
          <Toolbar.Input
            value={search}
            onChange={value => {
              setSearch(value.toLowerCase());
            }}
            placeholder='Поиск'
          />
        </Toolbar.Container>
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
                <Icon size={size} fill={fill} id={key} />
                <TextWrapper>
                  <Text>{key}</Text>
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
                {selectedIcon.Icon({ size, fill })}
                <CopyInputWrapper>
                  <Label>import:</Label>
                  <TextField text={`import { ${selectedIcon.iconName} } from '@sbercloud/uikit-product-icons';`} />
                </CopyInputWrapper>
                <CopyInputWrapper>
                  <Label>data-test-id:</Label>
                  <TextField text={selectedIcon.dataAttribute} />
                </CopyInputWrapper>
                <CopyInputWrapper>
                  <Label>png:</Label>
                  <Button text={'download as png'} onClick={downloadAsPngHandler} />
                </CopyInputWrapper>
              </IconOverview>
            }
          />
        )}
      </>
    );
  };
}
