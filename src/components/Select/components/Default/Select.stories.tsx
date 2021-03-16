import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { HelpSVG } from '@aicloud/ui-icons';

import { RadioIcon } from 'components/Radio';
import { Button } from 'components/Button';
import { Avatar } from 'components/Avatar';
import {
  services,
  storage,
  connectors,
  people,
} from 'components/Select/helpers/mockData';
import { H4 } from 'typography/Headers';
import { SelectType } from 'components/Select/helpers/types';

import {
  Select,
  OptionPrefixProps,
  ControlPrefixProps,
  MultiValueContainerPrefixProps,
  OptionTypeBase,
} from './Select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const StyledItem = styled.div`
  margin: 7px;
`;

const ToggleButton = styled(Button)`
  margin-top: 15px;
`;

const StyledLogoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  margin: 0 12px 0 8px;
  flex-shrink: 0;
`;

const StyledRadioWrap = styled.div`
  margin: 0 12px 0 0;
  flex-shrink: 0;
`;

const StyledTitle = styled(H4)`
  text-transform: capitalize;
`;

const Template: Story = ({ selectType }) => {
  const [value, setValue] = useState<OptionTypeBase>();
  const [optionPosition, setOptionPosition] = useState('prefix');

  if (selectType === 'multi') {
    return (
      <StyledItem>
        <StyledTitle>{selectType}</StyledTitle>
        <Select
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          defaultValue={people[0]}
          options={people}
          isMulti
          prefixMultiValueContainer={({
            data: { src, label },
          }: MultiValueContainerPrefixProps) => (
            <div style={{ padding: '0 0 0 8px', lineHeight: '28px' }}>
              <Avatar src={src}>{label}</Avatar>
            </div>
          )}
          prefixOption={({ data, hasValue, getValue }: OptionPrefixProps) => {
            const isChecked =
              hasValue && (getValue() || []).indexOf(data) !== -1;

            return (
              <>
                <StyledRadioWrap>
                  <RadioIcon checked={isChecked} />
                </StyledRadioWrap>
                <Avatar src={data.src}>{data.label}</Avatar>
              </>
            );
          }}
        />
      </StyledItem>
    );
  }

  if (selectType === 'with logo') {
    <StyledItem>
      <H4>With logo</H4>
      <Select
        isSearchable
        searchableProps={['value', 'labelText']}
        menuRelative
        captureMenuScroll={false}
        defaultValue={value}
        options={services}
        type='with-logo'
        onChange={(value: OptionTypeBase): void => {
          setValue(value);
        }}
        prefixControl={({ getValue }: ControlPrefixProps) => {
          const values = getValue() || [];

          return values.map(({ value, logo }: OptionTypeBase) => (
            <StyledLogoWrap key={value}>{logo}</StyledLogoWrap>
          ));
        }}
        prefixOption={({
          data,
          data: { logo },
          hasValue,
          getValue,
        }: OptionPrefixProps) => {
          const isChecked = hasValue && (getValue() || []).indexOf(data) !== -1;

          return (
            <>
              <StyledLogoWrap>
                <RadioIcon checked={isChecked} />
              </StyledLogoWrap>
              {logo}
            </>
          );
        }}
      />
    </StyledItem>;
  }

  if (selectType === 'grouped with logo') {
    return (
      <StyledItem>
        <H4>With logo grouped</H4>
        <Select
          menuRelative
          captureMenuScroll={false}
          isSearchable
          searchableProps={['value', 'labelText']}
          options={connectors}
          defaultValue={connectors[0].options[0]}
          type='with-logo'
          prefixControl={({ getValue }: ControlPrefixProps) => {
            const values = getValue() || [];

            return values.map(
              (option: OptionTypeBase): JSX.Element => (
                <StyledLogoWrap key={option.value}>
                  <img src={option.logo} style={{ width: 22 }} alt='' />
                </StyledLogoWrap>
              ),
            );
          }}
          prefixOption={({ data, hasValue, getValue }: OptionPrefixProps) => {
            const isChecked =
              hasValue && (getValue() || []).indexOf(data) !== -1;

            return (
              <>
                <StyledRadioWrap>
                  <RadioIcon checked={isChecked} />
                </StyledRadioWrap>
                <img
                  src={data.logo}
                  style={{ maxWidth: 40, maxHeight: 20 }}
                  alt=''
                />
              </>
            );
          }}
        />
      </StyledItem>
    );
  }

  if (selectType === 'with option') {
    const optionProp =
      optionPosition === 'prefix'
        ? {
            prefixOption: () => <HelpSVG size={20} />,
          }
        : { postfixOption: () => <HelpSVG size={20} /> };

    return (
      <StyledItem>
        <StyledTitle>
          {selectType}, option position: {optionPosition}
        </StyledTitle>
        <Select
          defaultValue={services[0]}
          options={services}
          type='with-logo'
          {...optionProp}
        />
        <ToggleButton
          onClick={() => {
            if (optionPosition === 'prefix') {
              setOptionPosition('postfix');
            } else {
              setOptionPosition('prefix');
            }
          }}
        >
          Toggle option position
        </ToggleButton>
      </StyledItem>
    );
  }

  return (
    <StyledItem>
      <StyledTitle>{selectType}</StyledTitle>
      <Select
        defaultValue={storage[0]}
        options={storage}
        type={selectType as SelectType}
      />
    </StyledItem>
  );
};

export const select = Template.bind({});
select.args = {};
select.parameters = {};
select.argTypes = {
  selectType: {
    defaultValue: 'medium',
    control: {
      type: 'radio',
      options: [
        'round-light',
        'round-gray',
        'medium',
        'large',
        'with logo',
        'grouped with logo',
        'with option',
        'multi',
      ],
    },
  },
};
