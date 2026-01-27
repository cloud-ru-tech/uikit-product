import { LinkSVG, ShareSVG, TelegramSVG, VkSVG } from '@cloud-ru/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { Droplist, DroplistProps } from '@snack-uikit/list';
import { ValueOf } from '@snack-uikit/utils';

const SHARE_OPTIONS_TYPE = {
  Telegram: 'telegram',
  VK: 'vk',
  Copy: 'copy',
};

export type DropdownShareOption = {
  type: ValueOf<typeof SHARE_OPTIONS_TYPE>;
  onClick: () => void;
};

export type DropdownShareProps = {
  hideLabel?: boolean;
  options: DropdownShareOption[];
};

export function DropdownShare(props: DropdownShareProps) {
  const { hideLabel, options } = props;

  const items: DroplistProps['items'] = options.map(({ type, onClick }) => {
    switch (type) {
      case SHARE_OPTIONS_TYPE.Telegram:
        return {
          id: 'telegram',
          content: { option: 'Telegram' },
          beforeContent: <TelegramSVG />,
          onClick,
        };
      case SHARE_OPTIONS_TYPE.VK:
        return {
          id: 'vk',
          content: { option: 'VK' },
          beforeContent: <VkSVG />,
          onClick,
        };
      case SHARE_OPTIONS_TYPE.Copy:
        return {
          id: 'copy',
          content: { option: 'Копировать ссылку' },
          beforeContent: <LinkSVG />,
          onClick,
        };
      default:
        return {};
    }
  });

  return (
    <Droplist items={items} size='l' closeDroplistOnItemClick>
      <ButtonFunction
        size='m'
        label={!hideLabel ? 'Поделиться' : undefined}
        icon={<ShareSVG />}
        data-test-id='dropdown-share-button'
      />
    </Droplist>
  );
}
