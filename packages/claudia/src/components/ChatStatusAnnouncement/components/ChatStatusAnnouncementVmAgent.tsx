import { useLocale } from '@cloud-ru/uikit-product-locale';
import { LayoutType } from '@cloud-ru/uikit-product-utils';

import { ChatStatusAnnouncement } from '../ChatStatusAnnouncement';
import { VmInfoRow, VmInfoRowProps } from '../helperComponents/VmInfoRow';

export type ChatStatusAnnouncementVmAgentProps = {
  className?: string;
  onActionClick: () => void;
  layoutType: LayoutType;
} & Partial<VmInfoRowProps>;

export function ChatStatusAnnouncementVmAgent({
  onActionClick,
  layoutType,
  className,
  ip,
  vmName,
}: ChatStatusAnnouncementVmAgentProps) {
  const { t } = useLocale('Claudia');

  return (
    <ChatStatusAnnouncement
      className={className}
      layoutType={layoutType}
      appearance='orange'
      items={[
        { content: t('SshField.chatStatusAnnouncement.vmAgent.option') },
        ...(ip && vmName ? [{ content: <VmInfoRow vmName={vmName} ip={ip} /> }] : []),
      ]}
      actionLabel={t('SshField.chatStatusAnnouncement.newSession')}
      onActionClick={onActionClick}
    />
  );
}
