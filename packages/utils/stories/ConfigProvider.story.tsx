import { Meta, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  Brand,
  ConfigProvider,
  ConfigProviderProps,
  LanguageCodeType,
  Themes,
  useBrand,
  useLanguage,
  useTheme,
} from '../src';
import styles from './config-styles.module.scss';

const meta: Meta = {
  title: 'Utils/Config Provider',
  component: ConfigProvider,
};
export default meta;

function Template({ ...args }: ConfigProviderProps) {
  const { brand, changeBrand } = useBrand();
  const { changeTheme, theme } = useTheme();
  const { languageCode, changeLanguage } = useLanguage();

  return (
    <ConfigProvider {...args}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Brand Setting</h1>

        <Divider className={styles.divider} />

        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>
            Активный бренд: <span className={styles.themeWrapper}>{brand}</span>
          </h3>
        </div>

        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Смена брэнда через changeBrand</h3>
          <span className={styles.caption}>(нажми на кнопку)</span>
        </div>

        <div className={styles.configBody}>
          <ButtonFilled onClick={() => changeBrand(Brand.Cloud)} label='Cloud' />
          <ButtonFilled onClick={() => changeBrand(Brand.CloudDark)} label='Cloud Dark' />
          <ButtonFilled onClick={() => changeBrand(Brand.MLSpace)} label='MLSpace' />
          <ButtonFilled onClick={() => changeBrand(Brand.MLSpaceDark)} label='MLSpace Dark' />
          <ButtonFilled onClick={() => changeBrand(Brand.Admin)} label='Admin' />
          <ButtonFilled onClick={() => changeBrand(Brand.AdminDark)} label='Admin Dark' />
          <ButtonFilled onClick={() => changeBrand(Brand.Site)} label='Site' />
          <ButtonFilled onClick={() => changeBrand(Brand.SiteDark)} label='Site Dark' />
          <ButtonFilled onClick={() => changeBrand(Brand.GigaId)} label='GigaId' />
          <ButtonFilled onClick={() => changeBrand(Brand.GigaIdDark)} label='GigaId Dark' />
        </div>
      </div>

      <div className={styles.wrapper}>
        <h1 className={styles.header}>Theme Setting (deprecated)</h1>

        <Divider className={styles.divider} />

        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>
            Активная тема: <span className={styles.themeWrapper}>{theme}</span>
          </h3>
        </div>

        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Смена темы через changeTheme</h3>
          <span className={styles.caption}>(нажми на кнопку)</span>
        </div>

        <div className={styles.configBody}>
          <ButtonFilled onClick={() => changeTheme(Themes.Purple)} label='Purple Theme' />
          <ButtonFilled onClick={() => changeTheme(Themes.PurpleDark)} label='Purple Dark Theme' />
          <ButtonFilled onClick={() => changeTheme(Themes.Green)} label='Green Theme' />
          <ButtonFilled onClick={() => changeTheme(Themes.GreenDark)} label='Green Dark Theme' />
        </div>
      </div>

      <div className={styles.wrapper}>
        <h1 className={styles.header}>Language Settings</h1>

        <Divider className={styles.divider} />

        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>
            Активный код языка: <span className={styles.themeWrapper}>{languageCode}</span>
          </h3>
        </div>

        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Смена языка через changeLanguage</h3>
          <span className={styles.caption}>(нажми на кнопку)</span>
        </div>

        <div className={styles.configBody}>
          <ButtonFilled onClick={() => changeLanguage(LanguageCodeType.ruRU)} label='ruRU' />
          <ButtonFilled onClick={() => changeLanguage(LanguageCodeType.enUS)} label='enUS' />
        </div>
      </div>
    </ConfigProvider>
  );
}

export const configProvider: StoryObj<ConfigProviderProps> = {
  render: Template,
  args: {},
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.STABLE],
  },
};
