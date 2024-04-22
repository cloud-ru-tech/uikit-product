import { StoryFn } from '@storybook/react';
import React, { useCallback, useState } from 'react';

import { Card } from '@snack-uikit/card';
import { FieldText } from '@snack-uikit/fields';
import { Modal } from '@snack-uikit/modal';
import { Search } from '@snack-uikit/search';

import { generateDataTestId } from '../../utils/generateDataTestId';
import { svgExport } from './downloader';
import styles from './styles.module.scss';

export function getTemplate(
  Icons: Record<string, React.FunctionComponent<{ size?: number | string; fill?: string; id?: string }>>,
): StoryFn {
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
      <div className={styles.viewBox}>
        <div className={styles.scrollContent}>
          <span className={styles.title}>Кликните на иконку для отображения дополнительной информации</span>

          <Search
            value={search}
            onChange={value => {
              setSearch(value.toLowerCase());
            }}
            placeholder='Поиск'
            className={styles.search}
          />

          <div className={styles.group}>
            {Object.entries(Icons)
              .filter(([key]) => key.toLowerCase().includes(search))
              .map(([key, Icon]) => (
                <Card
                  key={key}
                  onClick={() =>
                    setSelectedIcon({
                      iconName: key,
                      Icon: Icon,
                      dataAttribute: generateDataTestId(key),
                    })
                  }
                >
                  <div className={styles.content}>
                    <Icon size={size} fill={fill} id={key} />
                    <span className={styles.text}>{key}</span>
                  </div>
                </Card>
              ))}
          </div>

          {selectedIcon !== null && (
            <Modal
              open={selectedIcon !== null}
              onClose={onCloseHandler}
              title={selectedIcon.iconName}
              content={
                <div className={styles.content}>
                  {selectedIcon.Icon({ size, fill })}

                  <FieldText
                    label='Import'
                    value={`import { ${selectedIcon.iconName} } from '@sbercloud/uikit-product-icons';`}
                    readonly
                  />

                  <FieldText label={'data-test-id'} value={selectedIcon.dataAttribute} readonly />
                </div>
              }
              approveButton={{
                label: 'download as png',
                onClick: downloadAsPngHandler,
              }}
            />
          )}
        </div>
      </div>
    );
  };
}
