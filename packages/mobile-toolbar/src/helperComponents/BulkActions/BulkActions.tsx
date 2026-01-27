import { useRef, useState } from 'react';

import { useLocale } from '@cloud-ru/uikit-product-locale';
import { MobileDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { MobileTooltip } from '@cloud-ru/uikit-product-mobile-tooltip';
import { ButtonFunction } from '@snack-uikit/button';
import { Counter } from '@snack-uikit/counter';
import { useDynamicList } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';
import { BulkActionsProps } from './types';

export function BulkActions({ actions = [], selectedCount, outline }: BulkActionsProps & { outline?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const parentContainerRef = useRef<HTMLDivElement>(null);

  const { t } = useLocale('MobileToolbar');

  const { visibleItems, hiddenItems } = useDynamicList({
    items: actions,
    parentContainerRef,
    maxVisibleItems: 3,
  });

  return (
    <div className={styles.bulkActionsContainer} data-outline={outline}>
      <div className={styles.counter}>
        {selectedCount && <Counter value={selectedCount} appearance='primary' color='decor' />}
      </div>
      <div className={styles.bulkActionsWrapper} data-test-id={TEST_IDS.bulkActions} ref={parentContainerRef}>
        <div className={styles.smallSeparator} />
        <div className={styles.bulkActions}>
          {visibleItems.map(({ label, icon: Icon, onClick, disabled, tooltip, 'data-test-id': testId }) => (
            <MobileTooltip
              tip={tooltip}
              key={label}
              open={tooltip ? undefined : false}
              placement='top'
              data-test-id={`${testId}-tooltip`}
            >
              <ButtonFunction
                className={styles.action}
                data-test-id={testId}
                iconPosition='before'
                icon={<Icon />}
                label={label}
                size='m'
                onClick={onClick}
                disabled={disabled}
              />
            </MobileTooltip>
          ))}
        </div>

        {hiddenItems.length > 0 && (
          <MobileDroplist
            open={isOpen}
            onOpenChange={setIsOpen}
            items={hiddenItems.map(({ label, icon: Icon, onClick, disabled, tooltip, 'data-test-id': testId }) => ({
              id: label,
              content: { option: label },
              beforeContent: <Icon />,
              onClick: () => {
                onClick?.();
                setIsOpen(false);
              },
              disabled,
              itemWrapRender: item => (
                <MobileTooltip
                  tip={tooltip}
                  open={tooltip ? undefined : false}
                  placement='right'
                  data-test-id={`${testId}-tooltip`}
                >
                  {item}
                </MobileTooltip>
              ),
              'data-test-id': testId,
            }))}
          >
            <ButtonFunction
              className={styles.moreActionButton}
              size='m'
              appearance='primary'
              label={t('more')}
              data-test-id={TEST_IDS.moreBulkActionsButton}
            />
          </MobileDroplist>
        )}
      </div>
    </div>
  );
}
