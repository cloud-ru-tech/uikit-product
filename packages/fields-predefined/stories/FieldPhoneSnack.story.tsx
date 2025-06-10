import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useState } from 'react';

import { LayoutType } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  ABKHAZIA_COUNTRY_CODE,
  AUSTRALIA_COUNTRY_CODE,
  BELARUS_COUNTRY_CODE,
  FieldPhone,
  FieldPhoneOptionsProps,
  FieldPhoneProps,
  RUSSIA_COUNTRY_CODE,
  useCountries,
} from '../src/components';
import { Country, CountrySettings } from '../src/components/FieldPhone/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Phone',
  component: FieldPhone,
};
export default meta;

type StoryProps = Omit<FieldPhoneProps, 'layoutType'> & {
  layoutType?: LayoutType;
  onlyOneMask?: boolean;
  mobileView: boolean;
  excludedCountries: Country[];
  includedCountries: Country[];
  filterCountriesMode: 'exclude' | 'include' | 'none';
};

const Template = ({
  size,
  value,
  onlyOneMask,
  layoutType,
  mobileView,
  excludedCountries,
  includedCountries,
  ...args
}: StoryProps) => {
  const [, setCountry] = useState<FieldPhoneOptionsProps>();

  const masks = useCountries();
  const overriddenOptions = onlyOneMask ? [masks[0]] : masks;

  const exampleWithIncludeOrExclude = args.filterCountriesMode !== 'none';

  return (
    <div className={cn(styles.wrapper, styles.fieldPhoneWrapper)} data-size={size || 's'} data-background='light'>
      <FieldPhone
        {...args}
        layoutType={layoutType ?? (mobileView ? 'mobile' : 'desktop')}
        options={
          {
            overriddenOptions: exampleWithIncludeOrExclude ? undefined : overriddenOptions,
            excludedCountries,
            includedCountries,
          } as unknown as CountrySettings
        }
        value={value}
        size={size}
        onChangeCountry={setCountry}
      />
    </div>
  );
};

export const fieldPhone: StoryObj<StoryProps> = {
  render: function Render({ ...props }) {
    const [args, setArgs] = useArgs<StoryProps>();

    const onChange = (value: string) => {
      setArgs({ value });
    };

    return <Template {...props} onChange={onChange} value={args.value} />;
  },
  args: {
    id: 'newSelect',
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    searchPlaceholder: 'Placeholder',
    required: false,
    hint: 'Hint text',
    size: 's',
    readonly: false,
    validationState: 'default',
    value: '+79003332211',
    disabled: false,
    showCopyButton: true,
    showClearButton: true,
    onlyOneMask: false,
    scrollList: true,
    mobileView: false,
    excludedCountries: [ABKHAZIA_COUNTRY_CODE, AUSTRALIA_COUNTRY_CODE],
    includedCountries: [RUSSIA_COUNTRY_CODE, BELARUS_COUNTRY_CODE],
    filterCountriesMode: 'none',
  },
  argTypes: {
    labelTooltip: {
      type: 'string',
    },
    onlyOneMask: {
      name: '[Stories] use only first mask',
      type: 'boolean',
    },
    value: {
      type: 'string',
    },
    mobileView: {
      name: '[Story] apply mobile mode',
      type: 'boolean',
    },

    filterCountriesMode: {
      name: '[Stories] Filter countries mode',
      control: { type: 'radio' },
      options: ['none', 'include', 'exclude'],
    },

    excludedCountries: {
      name: '[Stories]: Exclude Abkhazia and Australia',
      if: {
        arg: 'filterCountriesMode',
        eq: 'exclude',
      },
    },

    includedCountries: {
      name: '[Stories]: Include Russia and Belarus',
      if: {
        arg: 'filterCountriesMode',
        eq: 'include',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
    },
  },
};
