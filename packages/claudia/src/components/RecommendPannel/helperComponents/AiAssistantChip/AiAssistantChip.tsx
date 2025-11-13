import { forwardRef, MouseEventHandler, RefObject } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { LAYOUT_TYPE, LayoutType } from '@sbercloud/uikit-product-utils';
import { Link } from '@snack-uikit/link';
import { Tooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { ButtonGigaOutline } from '../../../ButtonGiga';
import { IconGiga } from '../../../IconGiga';
import { SIZE, Size } from '../../types';

type AiAssistantChipProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  size: Size;
  layoutType?: LayoutType;
  docsUrl?: string;
  dataTestId?: string;
};

export const AiAssistantChip = forwardRef<HTMLElement | HTMLButtonElement, AiAssistantChipProps>(
  ({ onClick, size, layoutType, docsUrl, dataTestId }, ref) => {
    const isMobile = layoutType === LAYOUT_TYPE.Mobile || size === SIZE.M;
    const totalSize = isMobile ? SIZE.M : size;

    const { t } = useLocale('Claudia');

    const tooltipContent = (
      <div>
        <Typography.SansLabelM tag='p' data-test-id={`${dataTestId}__tooltip-title`}>
          {t('AiAssistantChip.tooltipTitle')}
        </Typography.SansLabelM>
        <Typography.SansBodyS tag='p' data-test-id={`${dataTestId}__tooltip-description`}>
          {t('AiAssistantChip.tooltipDescription')}
        </Typography.SansBodyS>
        <Link
          text={t('AiAssistantChip.documentationLink')}
          appearance='invert-neutral'
          textMode='accent'
          target='_blank'
          href={docsUrl}
          data-test-id={`${dataTestId}__documentation-link`}
        ></Link>
      </div>
    );

    return (
      <Tooltip
        triggerRef={ref as RefObject<HTMLElement>}
        tip={tooltipContent}
        placement='top'
        data-test-id={dataTestId}
      >
        <ButtonGigaOutline size={totalSize} data-mobile={isMobile} onClick={onClick} icon={<IconGiga size={24} />} />
      </Tooltip>
    );
  },
);
