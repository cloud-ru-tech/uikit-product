import { useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Balance, Floating, Foldable, Pie, RubleSign, Spinner } from './components';
import * as S from './styled';

export type HeaderBalanceTooltipProps = WithSupportProps<{
  balance?: number;
  limit?: number;
  onBalanceClick?(): void;
  onRechargeClick?(): void;
  isMobile?: boolean;
}>;

export function HeaderBalanceTooltip({
  balance,
  limit,
  onBalanceClick,
  onRechargeClick,
  isMobile,
  ...rest
}: HeaderBalanceTooltipProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isFoldableOpen, setIsFoldableOpen] = useState(false);
  const isLoading = balance === undefined;
  const handleRechargeButtonClick = isLoading ? undefined : onRechargeClick;
  const isRechargeButtonVisible = Boolean(onRechargeClick);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);
  const handleFoldableOpen = () => setIsFoldableOpen(true);
  const handleFoldableClose = () => setIsFoldableOpen(false);

  function renderBalanceComponent() {
    if (isLoading) {
      return (
        <>
          <S.Icon>
            <Spinner />
          </S.Icon>
          <RubleSign />
        </>
      );
    }

    if (limit === undefined || isMobile) {
      return <Balance balance={balance} onBalanceClick={onBalanceClick} />;
    }

    return (
      <>
        <S.Icon>
          <Pie balance={balance} limit={limit} />
        </S.Icon>
        <Foldable
          open={isMouseOver}
          onOpen={handleFoldableOpen}
          onClose={handleFoldableClose}
          fallback={isRechargeButtonVisible && <RubleSign />}
        >
          <Balance balance={balance} limit={limit} onBalanceClick={onBalanceClick} />
        </Foldable>
      </>
    );
  }

  return (
    <S.Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...extractSupportProps(rest)}>
      <Floating active={isFoldableOpen}>
        <S.Frame>
          {isRechargeButtonVisible && <S.RechargeButton onClick={handleRechargeButtonClick} />}
          {renderBalanceComponent()}
        </S.Frame>
      </Floating>
    </S.Wrapper>
  );
}
