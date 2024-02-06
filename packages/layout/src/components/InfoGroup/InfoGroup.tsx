import { ReactNode } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';

import { InfoStroke } from '../InfoStroke';
import styles from './styles.module.scss';

export type InfoGroupProps = WithSupportProps<{
  items: WithSupportProps<{
    label: ReactNode;
    value: ReactNode;
  }>[];
  itemDefaultValue?: ReactNode;
  buttonText?: string;
  onClick?(): void;
  showButton?: boolean;
}>;

export function InfoGroup({ items, itemDefaultValue, buttonText, onClick, showButton }: InfoGroupProps) {
  return (
    <>
      <div>
        {items.map(({ label, value, ...rest }, itemIdx, self) => {
          const notLast = itemIdx !== self.length - 1;

          return (
            <InfoStroke
              key={itemIdx}
              label={label}
              value={value || itemDefaultValue}
              bottomDivider={notLast}
              {...extractSupportProps(rest)}
            />
          );
        })}
      </div>

      {showButton && buttonText && (
        <div className={styles.buttonContainer}>
          <ButtonFilled onClick={onClick} label={buttonText} size='m' />
        </div>
      )}
    </>
  );
}
