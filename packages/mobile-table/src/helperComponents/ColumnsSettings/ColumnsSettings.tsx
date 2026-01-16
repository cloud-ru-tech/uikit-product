import { MobileDroplist } from '@sbercloud/uikit-product-mobile-dropdown';
import { ButtonFunction } from '@snack-uikit/button';
import { FunctionSettingsSVG } from '@snack-uikit/icons';
import { GroupSelectItemProps } from '@snack-uikit/list';

import styles from './styles.module.scss';

export type ColumnsSettingsProps = {
  enabledColumns: string[];
  setEnabledColumns(enabledColumns: string[]): void;
  columnsSettings: [GroupSelectItemProps];
};

export function ColumnsSettings({ columnsSettings, enabledColumns, setEnabledColumns }: ColumnsSettingsProps) {
  return (
    <MobileDroplist
      className={styles.columnsSettings}
      items={columnsSettings}
      selection={{
        value: enabledColumns,
        onChange: setEnabledColumns,
        mode: 'multiple',
      }}
      data-test-id='table__column-settings-droplist'
    >
      <ButtonFunction size='m' data-test-id='table__column-settings' icon={<FunctionSettingsSVG />} />
    </MobileDroplist>
  );
}
