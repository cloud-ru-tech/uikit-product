import { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { treeOptions } from 'components/Select/helpers/mockData';
import { IOptionType } from 'components/Select/helperComponents/InlineTreeSelect';

import { UsersByGroupSelect, CheckedType } from './InlineTreeSelect';

export default {
  title: 'Components/Select',
  component: UsersByGroupSelect,
} as Meta;

const Template = (): JSX.Element => {
  const defautVal = { checked: ['b'] };
  const [tree, setTree] = useState<IOptionType[]>(treeOptions as IOptionType[]);
  const [checked, setChecked] = useState<CheckedType | undefined>(defautVal);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  console.log('checked: ', checked);
  return (
    <>
      <UsersByGroupSelect
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
      <button
        type='button'
        style={{ marginTop: 20 }}
        onClick={(): void => {
          setChecked(defautVal);
        }}
      >
        Set default
      </button>
      <button
        type='button'
        style={{ marginLeft: 20 }}
        onClick={(): void => {
          setDisabled(!isDisabled);
        }}
      >
        Trigger disabled
      </button>
      <button
        type='button'
        style={{ marginLeft: 20 }}
        onClick={(): void => {
          const nextTree = [...tree];
          nextTree[0] = { ...nextTree[0] };
          nextTree[0].children = nextTree?.[0]?.children?.sort((a, b) =>
            (b.key as string).localeCompare(a.key as string),
          );
          console.log('nextTree: ', nextTree);
          setTree(nextTree);
        }}
      >
        Sort
      </button>
    </>
  );
};

export const inlineTreeSelect = Template.bind({});
