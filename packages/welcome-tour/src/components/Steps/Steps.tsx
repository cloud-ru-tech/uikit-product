import { PaginationSliderDots } from '@sbercloud/uikit-product-pagination-private';

import { noPointerEvents } from './styled';

type StepsProps = {
  stepsCount: number;
  currentStep: number;
};

function noop() {}

export function Steps({ currentStep, stepsCount }: StepsProps) {
  return <PaginationSliderDots total={stepsCount} page={currentStep + 1} onChange={noop} className={noPointerEvents} />;
}
