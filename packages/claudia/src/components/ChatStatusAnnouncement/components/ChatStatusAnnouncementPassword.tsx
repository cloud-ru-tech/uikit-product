import { PasswordLockSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { LayoutType } from '@cloud-ru/uikit-product-utils';
import { themeVars } from '@snack-uikit/figma-tokens';

import { ChatStatusAnnouncement } from '../ChatStatusAnnouncement';

export type ChatStatusAnnouncementPasswordProps = {
  className?: string;
  onActionClick: () => void;
  layoutType: LayoutType;
};

export function ChatStatusAnnouncementPassword({
  onActionClick,
  layoutType,
  className,
}: ChatStatusAnnouncementPasswordProps) {
  const { t } = useLocale('Claudia');

  return (
    <ChatStatusAnnouncement
      className={className}
      layoutType={layoutType}
      icon={<PasswordLockSVG size={16} color={themeVars.sys.neutral.textSupport} />}
      items={[
        { content: t('SshField.chatStatusAnnouncement.password.option1') },
        { content: t('SshField.chatStatusAnnouncement.password.option2'), shouldFocusOnHover: true },
        { content: t('SshField.chatStatusAnnouncement.password.option3') },
      ]}
      actionLabel={t('SshField.chatStatusAnnouncement.cancel')}
      onActionClick={onActionClick}
    />
  );
}
