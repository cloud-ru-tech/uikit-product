import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { css } from '@linaria/core';

import { HelpSVG } from '@aicloud/ui-icons';

import { RadioIcon } from 'components/Radio';
import { Avatar } from 'components/Avatar';
import {
  services,
  storage,
  connectors,
  people,
} from 'components/Select/helpers/mockData';

import {
  Select,
  OptionPrefixProps,
  ControlPrefixProps,
  MultiValueContainerPrefixProps,
  OptionTypeBase,
} from './Select';

export default {
  title: 'Example/Select',
  component: Select,
} as Meta;

export const Template = () => {
  const [value, setValue] = useState<OptionTypeBase>();

  return (
    <div>
      round-light
      <Select disabled options={storage} type='round-light' />
      round-gray
      <Select defaultValue={storage[0]} options={storage} type='round-gray' />
      medium
      <Select defaultValue={services[0]} options={services} type='medium' />
      large
      <Select defaultValue={storage[0]} options={storage} type='large' />
      withLogo
      <Select
        isSearchable
        searchableProps={['value', 'labelText']}
        menuRelative
        captureMenuScroll={false}
        defaultValue={value}
        options={services}
        type='with-logo'
        onChange={(val: OptionTypeBase): void => {
          setValue(val);
        }}
        prefixControl={({ getValue }: ControlPrefixProps) => {
          const values = getValue() || [];

          return values.map((option: OptionTypeBase) => {
            const LogoComponent = option.logo;

            return (
              <div
                key={option.value}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  margin: '0 12px 0 8px',
                  flexShrink: 0,
                }}
              >
                <LogoComponent wrapperSize={40} size={22} />
              </div>
            );
          });
        }}
        prefixOption={(props: OptionPrefixProps) => {
          const { data } = props;
          const { logo: LogoComponent } = data;

          const isChecked =
            props.hasValue && (props.getValue() || []).indexOf(data) !== -1;

          const wrapperStyles = css`
            flex-shrink: 0;
          `;

          return (
            <>
              <div style={{ margin: '0 12px 0 0', flexShrink: 0 }}>
                <RadioIcon checked={isChecked} />
              </div>
              <LogoComponent
                size={20}
                wrapperSize={30}
                wrapperClasses={wrapperStyles}
              />
            </>
          );
        }}
      />
      withLogoGrouped
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
              <div
                key={option.value}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  margin: '0 12px 0 8px',
                }}
              >
                <img src={option.logo} style={{ width: 22 }} alt='' />
              </div>
            ),
          );
        }}
        prefixOption={(props: OptionPrefixProps) => {
          const { data } = props;
          const isChecked =
            props.hasValue && (props.getValue() || []).indexOf(data) !== -1;

          return (
            <>
              <div style={{ margin: '0 12px 0 0', flexShrink: 0 }}>
                <RadioIcon checked={isChecked} />
              </div>
              <img src={data.logo} style={{ width: 40 }} alt='' />
            </>
          );
        }}
      />
      Prefix option
      <Select
        defaultValue={services[0]}
        options={services}
        type='with-logo'
        prefixOption={() => <HelpSVG size={20} />}
      />
      Postfix option
      <Select
        defaultValue={services[0]}
        options={services}
        type='with-logo'
        postfixOption={() => <HelpSVG size={20} />}
      />
      Multi
      <Select
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        defaultValue={people[0]}
        options={people}
        isMulti
        prefixMultiValueContainer={(props: MultiValueContainerPrefixProps) => {
          const { data } = props;
          return (
            <div style={{ padding: '0 0 0 8px', lineHeight: '28px' }}>
              <Avatar src={data.src}>{data.label}</Avatar>
            </div>
          );
        }}
        prefixOption={(props: OptionPrefixProps) => {
          const { data } = props;

          const isChecked =
            props.hasValue && (props.getValue() || []).indexOf(data) !== -1;

          return (
            <>
              <div style={{ margin: '0 12px 0 0' }}>
                <RadioIcon checked={isChecked} />
              </div>
              <Avatar src={data.src}>{data.label}</Avatar>
            </>
          );
        }}
      />
    </div>
  );
};

const parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-WHITE_Design_System?node-id=7%3A19911',
  },
};

Template.parameters = parameters;
