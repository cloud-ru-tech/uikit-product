import { FC, useState, useEffect, useMemo } from 'react';
import RcTree, { TreeProps } from 'rc-tree';
import { DataNode, EventDataNode } from 'rc-tree/lib/interface';

import { UserStubColorSVG, GroupStub1ColorSVG } from '@sbercloud/icons';

import { Avatar, IAvatarProps } from 'components/Avatar';

import { StyledContainer, selectClassname } from './styled';

export interface IOptionType extends DataNode {
  src?: string;
  avatarShape: IAvatarProps['shape'];
}
export interface ICustomEventDataNode extends EventDataNode {
  initKey?: string;
}

const Icon = ({ data }: { data: IOptionType }): React.ReactNode => {
  const hasChildren = Boolean(data?.children);

  return (
    <Avatar
      size='m'
      src={data?.src}
      shape={data?.avatarShape}
      icon={hasChildren ? <GroupStub1ColorSVG /> : <UserStubColorSVG />}
    />
  );
};

export interface IUsersByGroupProps extends Partial<TreeProps> {
  options?: IOptionType[];
  filter?: (treeNode: EventDataNode) => boolean;
  onChange?: (cheched: {
    checked: React.ReactText[] | CheckedType;
    halfChecked?: React.ReactText[];
  }) => void;
}

export type CheckedType = {
  checked: React.ReactText[];
  halfChecked: React.ReactText[];
};

const DELIMETR = ':';

export const UsersByGroup: FC<IUsersByGroupProps> = ({
  options,
  filter,
  onChange,
  checkedKeys,
  ...treeProps
}) => {
  const [stateOptions, setStateOptions] = useState<IOptionType[]>();
  const [checked, setChecked] = useState<CheckedType>();

  const optionsKeys = useMemo(
    () =>
      options?.reduce((acc, option) => {
        const res = option?.children?.map(childrenOption => childrenOption.key);
        return { ...acc, ...(res ? { [option.key]: res } : {}) };
      }, {} as { [key: string]: React.ReactText[] }),
    [options],
  );

  const disabledOptionKeys = useMemo(
    () =>
      options?.reduce((acc, option) => {
        const res = option?.children
          ?.map(childrenOption =>
            childrenOption.disabled ? childrenOption.key : '',
          )
          .filter(Boolean);
        return { ...acc, ...(res ? { [option.key]: res } : {}) };
      }, {} as { [key: string]: React.ReactText[] }),
    [options],
  );

  useEffect(() => {
    const checked = checkedKeys as CheckedType;

    const nextChecked = optionsKeys
      ? [...(checked?.checked as React.ReactText[])].reduce(
          (acc, checkedKey) => {
            const res = [] as string[];
            Object.keys(optionsKeys).forEach(groupKey => {
              const inGroup = optionsKeys[groupKey].indexOf(checkedKey) !== -1;
              if (inGroup) res.push(`${groupKey}${DELIMETR}${checkedKey}`);
            });
            return [...acc, ...res];
          },
          [] as string[],
        )
      : [];

    const nextOptions = options?.map(option => {
      const childOptionKeys =
        option?.children?.map(childOption => `${childOption.key}`) || [];
      const isHalf = checked?.checked?.some(
        checkedKey => childOptionKeys?.indexOf(`${checkedKey}`) !== -1,
      );

      return {
        ...option,
        ...(option.children
          ? {
              children: option.children.map(childOption => ({
                ...childOption,
                initKey: childOption.key,
                key: `${option.key}${DELIMETR}${childOption.key}`,
              })),
            }
          : {}),
        className: `${option.className || ''} mlspace-treenode-expanded ${
          isHalf ? 'mlspace-treenode-half-indeterminate' : ''
        }`,
      };
    });

    setStateOptions(nextOptions);
    setChecked({
      ...((checkedKeys as CheckedType) || {}),
      checked: nextChecked,
    });
  }, [options, checkedKeys]);

  if (!stateOptions) {
    return null;
  }

  return (
    <StyledContainer className={selectClassname}>
      <RcTree
        {...treeProps}
        checkedKeys={checked}
        treeData={stateOptions}
        checkable
        virtual={false}
        height={400}
        itemHeight={36}
        selectable={false}
        defaultExpandAll
        icon={Icon}
        prefixCls='mlspace'
        onCheck={(checked, props): void => {
          const { checked: isChecked, node, halfCheckedKeys } = props;
          const groupKeys = options?.map(option => option.key);
          const customNode = node as ICustomEventDataNode;

          const filterKeys = customNode.children
            ? optionsKeys?.[customNode.key]?.filter(
                key =>
                  disabledOptionKeys?.[customNode.key]?.indexOf(key) === -1,
              )
            : [customNode.initKey];

          const resChecked = (checked as React.ReactText[])
            .map(checkedKey => {
              const group = groupKeys?.filter(
                groupKey => !`${checkedKey}`.indexOf(`${groupKey}`),
              )?.[0];

              if (!group) {
                return '';
              }

              const reg = new RegExp(`^${group}${DELIMETR}`);

              return `${checkedKey}`.replace(reg, '');
            })
            .filter(Boolean);
          const filterChecked = isChecked
            ? resChecked
            : resChecked.filter(
                checkedKey => filterKeys?.indexOf(`${checkedKey}`) === -1,
              );
          const uniqRes = [...new Set(filterChecked)] as string[];

          onChange?.({ checked: uniqRes, halfChecked: halfCheckedKeys });
        }}
        filterTreeNode={filter}
      />
    </StyledContainer>
  );
};
