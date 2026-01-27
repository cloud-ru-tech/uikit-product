import { MouseEventHandler, ReactNode } from 'react';

import { ArrowLeftSVG } from '@cloud-ru/uikit-product-icons';
import { Typography } from '@snack-uikit/typography';

import s from './styles.module.scss';

type TitleWithGoBackProps = {
  title: ReactNode;
  onGoBack?: MouseEventHandler<SVGElement>;
};

export function TitleWithGoBack({ onGoBack, title }: TitleWithGoBackProps) {
  return (
    <div className={s.wrapper} data-icon-back={Boolean(onGoBack)}>
      {onGoBack && <ArrowLeftSVG size={24} className={s.arrow} onClick={onGoBack} />}
      <Typography.SansTitleL>{title}</Typography.SansTitleL>
      {onGoBack && <div className={s.buttonStub} />}
    </div>
  );
}
