import { StatusTag, StatusTagProps } from '@sbercloud/uikit-product-status';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-product-tooltip';

export const StatusCell = ({
  value,
  type,
  content,
  className,
}: TooltipProps & StatusTagProps & { value: StatusTagProps['text'] }) => {
  if (content) {
    return (
      <Tooltip content={content} type={Tooltip.types.Instant}>
        <StatusTag className={className} type={type} text={value} />
      </Tooltip>
    );
  }

  return <StatusTag className={className} type={type} text={value} />;
};
