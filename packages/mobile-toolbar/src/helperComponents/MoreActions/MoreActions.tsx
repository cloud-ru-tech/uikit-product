import { ReactNode, useState } from 'react';

import { MoreSVG } from '@cloud-ru/uikit-product-icons';
import { BaseItemProps, MobileDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ButtonFunction } from '@snack-uikit/button';
import { Tag } from '@snack-uikit/tag';

import { TEST_IDS } from '../../constants';

type Action = {
  tagLabel?: string;
  icon?: ReactNode;
} & Pick<BaseItemProps, 'content' | 'disabled' | 'onClick'>;

export type MoreActionsProps = {
  items?: Action[];
  pinTop?: Action[];
};

export function MoreActions({ items = [], pinTop }: MoreActionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <MobileDroplist
      open={isOpen}
      data-test-id={TEST_IDS.droplist}
      onOpenChange={setIsOpen}
      scroll
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      size='l'
      pinTop={pinTop?.map(item => ({
        ...item,
        beforeContent: item.icon,
        onClick: e => {
          item.onClick?.(e);
          setIsOpen(false);
          e.stopPropagation();
        },
      }))}
      items={items.map(item => ({
        onClick: e => {
          item.onClick?.(e);
          setIsOpen(false);
          e.stopPropagation();
        },
        disabled: item.disabled,
        content: item.content,
        beforeContent: item.icon,
        afterContent: item.tagLabel ? <Tag label={item.tagLabel} /> : undefined,
        'data-test-id': TEST_IDS.option,
      }))}
    >
      <ButtonFunction icon={<MoreSVG size={24} />} size='m' data-test-id={TEST_IDS.moreActionsButton} />
    </MobileDroplist>
  );
}
