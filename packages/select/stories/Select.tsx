import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from 'react';

import { HelpSVG } from '@sbercloud/icons';
import { Avatar } from '@sbercloud/uikit-react-avatar';
import { RadioIcon } from '@sbercloud/uikit-react-radio';

import {
  ControlPrefixProps,
  ISelectProps,
  MultiValueContainerPrefixProps,
  OptionPrefixProps,
  OptionTypeBase,
  Select,
} from '../src';
import { groupedServices, services } from '../src/helpers/mockData';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const StyledLogoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  margin: 0 0 0 8px;
  flex-shrink: 0;
`;

const StyledRadioWrap = styled.div<{ position: string }>`
  margin: ${({ position }) => (position === 'left' ? '0 12px 0px 0px' : '0 0 0 12px')};
  flex-shrink: 0;
`;

const Footer = styled.div`
  background: #d2d2d2;
  height: 20px;
  width: 100%;
  padding: 20px;
`;

const Template: Story<ISelectProps<OptionTypeBase>> = ({
  type,
  isMulti,
  showLogo,
  isGrouped,
  showOption,
  showFooter,
  optionPosition,
  isSearchableCustom,
  ...restProps
}) => {
  const [value, setValue] = useState<OptionTypeBase>();

  const getOption = () => {
    if (isMulti) {
      return ({ data, hasValue, getValue }: OptionPrefixProps) => {
        const isChecked = hasValue && (getValue() || []).indexOf(data) !== -1;

        if (optionPosition === 'prefix') {
          return (
            <>
              <StyledRadioWrap position={optionPosition === 'prefix' ? 'left' : 'right'}>
                <RadioIcon checked={isChecked} />
              </StyledRadioWrap>
              <Avatar icon={data.logo} />
            </>
          );
        }

        return (
          <>
            <Avatar icon={data.logo} />
            <StyledRadioWrap position={optionPosition === 'prefix' ? 'left' : 'right'}>
              <RadioIcon checked={isChecked} />
            </StyledRadioWrap>
          </>
        );
      };
    }

    if (showLogo) {
      return ({ data, data: { logo }, hasValue, getValue }: OptionPrefixProps): JSX.Element => {
        const isChecked = hasValue && (getValue() || []).indexOf(data) !== -1;

        if (optionPosition && optionPosition.includes('prefix')) {
          return (
            <>
              <StyledRadioWrap position={optionPosition && optionPosition.includes('prefix') ? 'left' : 'right'}>
                <RadioIcon checked={isChecked} />
              </StyledRadioWrap>
              {logo}
            </>
          );
        }

        return (
          <>
            {logo}
            <StyledRadioWrap position={optionPosition && optionPosition.includes('prefix') ? 'left' : 'right'}>
              <RadioIcon checked={isChecked} />
            </StyledRadioWrap>
          </>
        );
      };
    }

    return () => <HelpSVG size={20} />;
  };

  const getOptionProp = () => {
    if (!optionPosition) {
      return {};
    }

    const isPrefix = optionPosition.includes('prefix');
    const isPostfix = optionPosition.includes('postfix');

    if (isPrefix && isPostfix) {
      return {
        prefixOption: getOption(),
        postfixOption: getOption(),
      };
    }

    if (isPrefix) {
      return {
        prefixOption: getOption(),
      };
    }

    if (isPostfix) {
      return {
        postfixOption: getOption(),
      };
    }

    return {};
  };

  const optionProp = getOptionProp();

  return (
    <Select
      {...restProps}
      isSearchable={isSearchableCustom}
      searchableProps={['value', 'labelText']}
      menuRelative
      onChange={(value: OptionTypeBase): void => {
        setValue(value);
      }}
      captureMenuScroll={false}
      {...(showOption || showLogo ? { ...optionProp } : {})}
      options={isGrouped ? groupedServices : services}
      defaultValue={isGrouped ? groupedServices[0].options[0] : value}
      isMulti={isMulti}
      prefixMultiValueContainer={({ data: { logo } }: MultiValueContainerPrefixProps) => (
        <div style={{ padding: '0 0 0 8px', lineHeight: '28px' }}>
          <Avatar icon={logo} />
        </div>
      )}
      prefixControl={(props: ControlPrefixProps): JSX.Element[] => {
        const val = props.getValue();

        return (val || []).map(
          ({ value, logo }: OptionTypeBase): JSX.Element => {
            if (isMulti) {
              return <></>;
            }

            return <StyledLogoWrap key={value}>{logo}</StyledLogoWrap>;
          },
        );
      }}
      footer={showFooter ? <Footer>Footer</Footer> : null}
      type={showLogo || showOption ? 'with-logo' : type}
    />
  );
};

export const select = Template.bind({});
select.args = {};
select.parameters = {};
select.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: ['medium', 'large', 'round-gray', 'round-light'],
    },
  },
  isGrouped: {
    control: {
      type: 'boolean',
    },
  },
  isMulti: {
    control: {
      type: 'boolean',
    },
  },
  showFooter: {
    control: {
      type: 'boolean',
    },
  },
  showOption: {
    control: {
      type: 'boolean',
    },
  },
  optionPosition: {
    control: {
      type: 'check',
      options: ['prefix', 'postfix'],
    },
  },
  showLogo: {
    control: {
      type: 'boolean',
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
  },
};
