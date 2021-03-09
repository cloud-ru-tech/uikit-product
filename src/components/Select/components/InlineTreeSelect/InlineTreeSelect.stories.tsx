import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { Select } from '../Default';
import { TreeView } from '../TreeView';
import {
  UsersByGroupSelect,
  IOptionType,
  CheckedType,
} from '../InlineTreeSelect/InlineTreeSelect';

export default {
  title: 'Example/Select',
  component: Select,
  decorators: [withDesign],
} as Meta;

export const treeView = (): JSX.Element => (
  <div>
    <TreeView options={TreeOptions} />
  </div>
);

export const usersByGroupSelect = (): JSX.Element => {
  const defautVal = { checked: ['b'] };
  const [tree, setTree] = useState<IOptionType[]>(TreeOptions as IOptionType[]);
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
        style={{ marginTop: 20 }}
        onClick={(): void => {
          setChecked(defautVal);
        }}
      >
        Set default
      </button>
      <button
        style={{ marginLeft: 20 }}
        onClick={(): void => {
          setDisabled(!isDisabled);
        }}
      >
        Trigger disabled
      </button>
      <button
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

const parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-WHITE_Design_System?node-id=7%3A19911',
  },
};

RoundLight.parameters = parameters;
RoundGray.parameters = parameters;
medium.parameters = parameters;
large.parameters = parameters;
withLogo.parameters = parameters;
prefixOption.parameters = parameters;
postfixOption.parameters = parameters;
multi.parameters = parameters;
treeView.parameters = parameters;
