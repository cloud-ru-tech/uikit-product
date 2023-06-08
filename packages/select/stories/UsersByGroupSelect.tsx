import { styled } from '@linaria/react';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { UsersByGroupSelect, UsersByGroupSelectProps } from '../src';
import { CheckedType, OptionType } from '../src/helperComponents/InlineTreeSelect';
import { treeOptions } from './helpers/mockData';

const meta: Meta = {
  title: 'Not stable/Select/Users By Group Select',
  component: UsersByGroupSelect,
};
export default meta;

const StyledButton = styled(Button)`
  margin: 10px 10px 0px 0px;
`;

function Template(args: UsersByGroupSelectProps) {
  const defaultVal: CheckedType = { checked: ['b'], halfChecked: [] };
  const [tree, setTree] = useState<OptionType[]>(treeOptions as OptionType[]);
  const [checked, setChecked] = useState<CheckedType | undefined>();
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
          setChecked(checked);
        }}
      />
      <StyledButton
        onClick={(): void => {
          setTree(tree => (tree.length ? [] : (treeOptions as OptionType[])));
        }}
        text='Trigger empty'
      />

      <StyledButton
        onClick={(): void => {
          setChecked(defaultVal);
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
}

export const usersByGroupSelect: StoryFn<UsersByGroupSelectProps> = Template.bind({});
usersByGroupSelect.argTypes = {};
usersByGroupSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=11428%3A185606',
  },
};
