import { ReactNode, useState } from 'react';

import { MinusSVG, PlusSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { InputPrivate } from '@snack-uikit/input-private';

import styles from './styles.module.scss';

type StepperWithAllowedValuesProps = {
  value: number;
  onChange(value: number): void;
  allowedValues: number[];
  postfix?: ReactNode;
};

export function StepperWithAllowedValues({ value, onChange, allowedValues, postfix }: StepperWithAllowedValuesProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(allowedValues.findIndex(item => item === value));

  return (
    <div className={styles.input}>
      <ButtonFunction
        icon={<MinusSVG />}
        onClick={() => {
          const newIdx = Math.max(selectedIdx - 1, 0);
          setSelectedIdx(newIdx);
          onChange(allowedValues[newIdx]);
        }}
      />
      <div className={styles.content}>
        <div
          style={{
            width: `${allowedValues[selectedIdx].toString().length * 8}px`,
          }}
        >
          <InputPrivate readonly value={String(allowedValues[selectedIdx])} />
        </div>
        {postfix && <div className={styles.postfix}>{postfix}</div>}
      </div>

      <ButtonFunction
        icon={<PlusSVG />}
        onClick={() => {
          const newIdx = Math.min(selectedIdx + 1, allowedValues.length - 1);
          setSelectedIdx(newIdx);
          onChange(allowedValues[newIdx]);
        }}
      />
    </div>
  );
}
