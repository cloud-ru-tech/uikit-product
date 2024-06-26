import { ReactNode } from 'react';

import { SwitchRow } from '@sbercloud/uikit-product-switch-row';
import { ToggleGroup, ToggleGroupProps, useToggleGroup } from '@sbercloud/uikit-product-toggles-predefined';

import styles from './styles.module.scss';

type ToggleSwitchRowProps = {
  id: string;
  title: string;
  titleTip?: ReactNode;
  description?: string;
};

export type DefaultDeleteModalBodyProps = {
  content: ReactNode;
  settings?: Pick<ToggleGroupProps, 'selectionMode' | 'value' | 'defaultValue' | 'onChange'> & {
    items: ToggleSwitchRowProps[];
  };
};

function ToggleSwitchRow({ id, title, titleTip, description }: ToggleSwitchRowProps) {
  const { isChecked, handleClick } = useToggleGroup({ value: id });

  return (
    <SwitchRow title={title} description={description} tip={titleTip} checked={isChecked} onChange={handleClick} />
  );
}

export function DefaultDeleteModalBody({ content, settings }: DefaultDeleteModalBodyProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{content}</div>

      {settings && (
        <div className={styles.settings}>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <ToggleGroup {...settings} selectionMode={settings.selectionMode || 'multiple'}>
              {settings.items.map(item => (
                <ToggleSwitchRow key={item.id} {...item} />
              ))}
            </ToggleGroup>
          }
        </div>
      )}
    </div>
  );
}
