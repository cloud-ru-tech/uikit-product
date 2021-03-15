import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { styled } from '@linaria/react';

import { HelpSVG } from '@aicloud/ui-icons';

import { RadioIcon } from 'components/Radio';
import { Avatar } from 'components/Avatar';
import {
  services,
  storage,
  connectors,
  people,
} from 'components/Select/helpers/mockData';
import { H4 } from 'typography/Headers';

import {
  Select,
  ISelectProps,
  OptionPrefixProps,
  ControlPrefixProps,
  MultiValueContainerPrefixProps,
  OptionTypeBase,
} from './Select';

export default {
  title: 'Components/Select',
  component: Select,
} as Meta;

const StyledItemWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.div`
  margin: 7px;
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

const Template: Story<ISelectProps<OptionTypeBase>> = ({ ...args }) => {
  const [value, setValue] = useState<OptionTypeBase>();

  return (
    <StyledItemWrap>
      <StyledItem>
        <H4>Default</H4>
        <Select defaultValue={storage[0]} options={storage} {...args} />
      </StyledItem>
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
            const isChecked =
              hasValue && (getValue() || []).indexOf(data) !== -1;

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
      </StyledItem>
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
      <StyledItem>
        <H4>Prefix option</H4>
        <Select
          defaultValue={services[0]}
          options={services}
          type='with-logo'
          prefixOption={() => <HelpSVG size={20} />}
        />
      </StyledItem>
      <StyledItem>
        <H4>Postfix option</H4>
        <Select
          defaultValue={services[0]}
          options={services}
          type='with-logo'
          postfixOption={() => <HelpSVG size={20} />}
        />
      </StyledItem>
      <StyledItem>
        <H4>Multi</H4>
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
    </StyledItemWrap>
  );
};

export const select = Template.bind({});
select.args = {};
select.parameters = {};
select.argTypes = {
  type: {
    control: {
      type: 'radio',
      options: ['round-light', 'round-gray', 'medium', 'large'],
    },
  },
};
