import { StatusTag, StatusTagProps } from '@sbercloud/uikit-react-status';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';

export const StatusCell = ({
  value,
  type,
  content,
  className,
}: TooltipProps & StatusTagProps & { value: StatusTagProps['text'] }) => {
  if (content) {
    return (
      <Tooltip content={content}>
        <StatusTag className={className} type={type} text={value} />
      </Tooltip>
    );
  }

  return <StatusTag className={className} type={type} text={value} />;
};
