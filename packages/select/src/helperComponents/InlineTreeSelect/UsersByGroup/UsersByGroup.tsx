import RcTree, { TreeProps } from 'rc-tree';
import { DataNode, EventDataNode } from 'rc-tree/lib/interface';
import { ReactNode, useEffect, useMemo, useState } from 'react';

import { Avatar } from '@sbercloud/uikit-product-avatar';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers/texts-provider';
import { selectClassname, StyledContainer } from './styled';

type InnerOptionType = DataNode & {
  src?: string;
  children?: InnerOptionType[];
};

export type OptionType = InnerOptionType & {
  title: string;
  children?: OptionType[];
};

export type CustomEventDataNode = {
  initKey?: string;
} & EventDataNode;

type IconProps = { data?: InnerOptionType };

function Icon({ data }: IconProps): ReactNode {
  const hasChildren = Boolean(data?.children);
  return (
    <Avatar
      size={Avatar.sizes.ExtraSmall}
      src={data?.src}
      name={(data?.title || '') as string}
      variant={hasChildren ? Avatar.variants.Company : Avatar.variants.User}
    />
  );
}

export type TextLike = string | number;

export type CheckedType = {
  checked: TextLike[];
  halfChecked: TextLike[];
};

export type UsersByGroupProps = {
  options?: OptionType[];
  filter?: (treeNode: EventDataNode) => boolean;
  onChange?: (checked: CheckedType) => void;
  isFiltered: boolean;
} & Partial<TreeProps>;

const DELIMITER = ':';

export function UsersByGroup({ options, filter, onChange, checkedKeys, isFiltered, ...treeProps }: UsersByGroupProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [stateOptions, setStateOptions] = useState<InnerOptionType[]>();
  const [checked, setChecked] = useState<CheckedType>();

  const optionsKeys = useMemo(
    () =>
      options?.reduce(
        (acc, option) => {
          const res = option?.children?.map(childrenOption => childrenOption.key);
          return { ...acc, ...(res ? { [option.key]: res } : {}) };
        },
        {} as { [key: string]: TextLike[] },
      ),
    [options],
  );

  const disabledOptionKeys = useMemo(
    () =>
      options?.reduce(
        (acc, option) => {
          const res = option?.children
            ?.map(childrenOption => (childrenOption.disabled ? childrenOption.key : ''))
            .filter(Boolean);
          return { ...acc, ...(res ? { [option.key]: res } : {}) };
        },
        {} as { [key: string]: TextLike[] },
      ),
    [options],
  );

  useEffect(() => {
    const checked = checkedKeys as CheckedType;

    const nextChecked = optionsKeys
      ? [...(checked?.checked as TextLike[])].reduce((acc, checkedKey) => {
          const res = [] as string[];
          Object.keys(optionsKeys).forEach(groupKey => {
            const inGroup = optionsKeys[groupKey].indexOf(checkedKey) !== -1;
            if (inGroup) res.push(`${groupKey}${DELIMITER}${checkedKey}`);
          });
          return [...acc, ...res];
        }, [] as string[])
      : [];

    const nextOptions = options?.map(option => {
      const childOptionKeys = option?.children?.map(childOption => `${childOption.key}`) || [];
      const isHalf = checked?.checked?.some(checkedKey => childOptionKeys?.indexOf(`${checkedKey}`) !== -1);

      return {
        ...option,
        ...(option.children
          ? {
              children: option.children.map(childOption => ({
                ...childOption,
                initKey: childOption.key,
                key: `${option.key}${DELIMITER}${childOption.key}`,
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
    <StyledContainer
      className={selectClassname}
      data-filtered={isFiltered || undefined}
      data-empty={textProvider<string>(languageCode, Texts.NoData)}
    >
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
          const customNode = node as CustomEventDataNode;

          const filterKeys = customNode.children
            ? optionsKeys?.[customNode.key]?.filter(key => disabledOptionKeys?.[customNode.key]?.indexOf(key) === -1)
            : [customNode.initKey];

          const resChecked = (checked as TextLike[])
            .map(checkedKey => {
              const group = groupKeys?.filter(groupKey => !`${checkedKey}`.indexOf(`${groupKey}`))?.[0];

              if (!group) {
                return '';
              }

              const reg = new RegExp(`^${group}${DELIMITER}`);

              return `${checkedKey}`.replace(reg, '');
            })
            .filter(Boolean);
          const filterChecked = isChecked
            ? resChecked
            : resChecked.filter(checkedKey => filterKeys?.indexOf(`${checkedKey}`) === -1);
          const uniqRes = [...new Set(filterChecked)] as string[];

          onChange?.({ checked: uniqRes, halfChecked: halfCheckedKeys || [] });
        }}
        filterTreeNode={filter}
      />
    </StyledContainer>
  );
}
