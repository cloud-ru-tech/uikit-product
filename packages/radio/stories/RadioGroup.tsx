import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IRadioProps, Radio, RadioGroup } from '../src';

const { COLORS_DRAWER } = DEPRECATED_EXPORT_VARS;

export default {
  title: 'Not stable/Radio/Radio Group',
  component: Radio,
} as Meta;

const Wrapper = styled.div`
  background-color: var(${COLORS_DRAWER.BACKGROUND});
  padding: 10px;
`;

const Template: Story<IRadioProps> = ({ ...args }) => {
  const [value, setValue] = useState('story2');

  return (
    <Wrapper>
      <RadioGroup
        name='stories'
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      >
        {[...new Array(3)].map((_value, index) => (
          <Radio
            {...args}
            key={index}
            value={`story${index}`}
            label={`story${index}`}
            description={`description${index}`}
          />
        ))}
      </RadioGroup>
    </Wrapper>
  );
};

export const radioGroup = Template.bind({});
radioGroup.args = {};
radioGroup.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
