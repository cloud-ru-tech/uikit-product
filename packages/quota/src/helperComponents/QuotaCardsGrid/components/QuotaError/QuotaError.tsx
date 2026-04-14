import { CrossSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { UpdateSVG } from '@snack-uikit/icons';
import { InfoBlock } from '@snack-uikit/info-block';

type QuotaErrorProps = {
  onRefresh: () => void;
};

export function QuotaError({ onRefresh }: QuotaErrorProps) {
  const { t } = useLocale('Quota');

  return (
    <InfoBlock
      size='s'
      align='vertical'
      description={t('errorText')}
      icon={{ icon: CrossSVG, appearance: 'neutral', decor: true }}
      footer={
        <InfoBlock.Footer
          primaryButton={{
            label: t('errorButton'),
            icon: <UpdateSVG size={24} />,
            appearance: 'neutral',
            onClick: onRefresh,
          }}
        />
      }
    />
  );
}
