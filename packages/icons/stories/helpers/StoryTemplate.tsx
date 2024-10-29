import { StoryFn } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';

import { Card } from '@snack-uikit/card';
import { FieldText } from '@snack-uikit/fields';
import { Modal } from '@snack-uikit/modal';
import { Search } from '@snack-uikit/search';
import { Switch } from '@snack-uikit/toggles';
import { QuestionTooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { generateDataTestId } from '../../utils/generateDataTestId';
import { svgExport } from './downloader';
import styles from './styles.module.scss';

type IconDictionary = Record<string, React.FunctionComponent<{ size?: number; fill?: string; id?: string }>>;

export function getTemplate(MonochromeIcons: IconDictionary, ThemedIcons?: IconDictionary): StoryFn {
  const fullCount = Object.keys(MonochromeIcons).length;

  return ({ size, fill }) => {
    const [showThemed, setShowThemed] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<{
      iconName: string;
      Icon: React.FunctionComponent<{ size?: number; fill?: string }>;
      dataAttribute: string;
    } | null>(null);

    const Icons = showThemed && ThemedIcons ? ThemedIcons : MonochromeIcons;

    const onCloseHandler = useCallback(() => setSelectedIcon(null), []);

    const downloadAsPngHandler = () => {
      const { iconName } = selectedIcon || {};

      if (iconName) {
        svgExport({ id: iconName, fileName: iconName });
      }
    };

    const filteredIcons = useMemo(
      () => Object.entries(Icons).filter(([key]) => key.toLowerCase().includes(search)),
      [search, showThemed],
    );

    return (
      <div className={styles.viewBox}>
        <div className={styles.scrollContent}>
          <div className={styles.toolbar}>
            <div className={styles.filter}>
              <Search
                outline
                value={search}
                onChange={value => {
                  setSearch(value.toLowerCase());
                }}
                placeholder='Поиск'
              />

              {Boolean(ThemedIcons) && (
                <label className={styles.label}>
                  <Switch size='m' checked={showThemed} onChange={setShowThemed} />{' '}
                  <Typography.SansLabelM>show themed</Typography.SansLabelM>
                  <QuestionTooltip
                    tip={
                      <>
                        Этот набор иконок доступен в двух вариантах:
                        <ul>
                          <li>
                            <b>обычный монохромный</b> - цвет заливки задается снаружи
                          </li>
                          <li>
                            <b>themed</b> - цвет не задается, используются переменные текущей темы
                          </li>
                        </ul>
                      </>
                    }
                  />
                </label>
              )}
            </div>
            <Typography.SansLabelS>
              Count: {filteredIcons.length !== fullCount ? `${filteredIcons.length} of ${fullCount}` : fullCount}
            </Typography.SansLabelS>
          </div>

          <div className={styles.group}>
            {filteredIcons.map(([key, Icon]) => (
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
              open={true}
              onClose={onCloseHandler}
              title={selectedIcon.iconName}
              content={
                <div className={styles.content}>
                  <selectedIcon.Icon size={size} fill={fill} />

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
