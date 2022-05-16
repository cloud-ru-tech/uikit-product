import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CheckedType, UsersByGroupSelect } from '../src';
import { IOptionType } from '../src/helperComponents/InlineTreeSelect';
import { treeOptions } from './helpers/mockData';

export default {
  title: 'Not stable/Select/Users By Group Select',
  component: UsersByGroupSelect,
} as Meta;

const StyledButton = styled(Button)`
  margin: 10px 10px 0px 0px;
`;

const Template: Story = (args): JSX.Element => {
  const defautVal = { checked: ['b'] };
  const [tree, setTree] = useState<IOptionType[]>(treeOptions as IOptionType[]);
  const [checked, setChecked] = useState<CheckedType | undefined>(defautVal);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  return (
    <>
      <UsersByGroupSelect
        {...args}
        disabled={isDisabled}
        options={tree}
        // value={checked}
        defaultValue={checked}
        searchProps={['title', 'email']}
        onChange={(checked): void => {
          // console.log("checked onChange: ", checked);
          setChecked(checked);
        }}
      />
      <StyledButton
        onClick={(): void => {
          setTree(tree => (tree.length ? [] : (treeOptions as IOptionType[])));
        }}
        text='Trigger empty'
      />

      <StyledButton
        onClick={(): void => {
          setChecked(defautVal);
        }}
        text='Set default'
      />

      <StyledButton
        onClick={(): void => {
          setDisabled(!isDisabled);
        }}
        text='Trigger disabled'
      />

      <StyledButton
        onClick={(): void => {
          const nextTree = [...tree];
          nextTree[0] = { ...nextTree[0] };
          nextTree[0].children = nextTree?.[0]?.children?.sort((a, b) =>
            (b.key as string).localeCompare(a.key as string),
          );

          setTree(nextTree);
        }}
        text='Sort'
      />
    </>
  );
};

export const usersByGroupSelect = Template.bind({});
usersByGroupSelect.argTypes = {};
usersByGroupSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
