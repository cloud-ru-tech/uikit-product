import { useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import {
  HeaderBalanceTooltipCurrency,
  HeaderBalanceTooltipFloating,
  HeaderBalanceTooltipFoldable,
  HeaderBalanceTooltipPie,
  HeaderBalanceTooltipSpinner,
} from './components';
import { Mode } from './constants';
import * as S from './styled';
import { ModeEntry } from './types';

export type HeaderBalanceTooltipProps = WithSupportProps<{
  balance?: number;
  limit?: number;
  onBalanceClick?: () => void;
  onRechargeClick?: () => void;
}>;

export function HeaderBalanceTooltip({
  balance,
  limit,
  onBalanceClick,
  onRechargeClick,
  ...rest
}: HeaderBalanceTooltipProps) {
  const { languageCode } = useLanguage();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isFoldableOpen, setIsFoldableOpen] = useState(false);
  const isLoading = balance === undefined;
  const handleRechargeButtonClick = isLoading ? undefined : onRechargeClick;
  const isRechargeButtonVisible = Boolean(onRechargeClick);

  function handleMouseEnter() {
    setIsMouseOver(true);
  }

  function handleMouseLeave() {
    setIsMouseOver(false);
  }

  function handleFoldableOpen() {
    setIsFoldableOpen(true);
  }

  function handleFoldableClose() {
    setIsFoldableOpen(false);
  }

  function getModeEntry(): ModeEntry {
    if (isLoading) {
      return [Mode.Loading];
    }

    if (limit === undefined) {
      return [Mode.RegularBalance, { balance }];
    }

    return [Mode.LimitedBalance, { balance, limit }];
  }

  function renderModeEntry([mode, payload]: ModeEntry) {
    if (mode === Mode.Loading) {
      return (
        <>
          <S.Icon>
            <HeaderBalanceTooltipSpinner />
          </S.Icon>
          <S.Balance type='button' disabled>
            <S.RegularText>₽</S.RegularText>
          </S.Balance>
        </>
      );
    }

    if (mode === Mode.RegularBalance) {
      return (
        <S.Balance type='button' onClick={onBalanceClick} disabled={!Boolean(onBalanceClick)}>
          <Tooltip
            placement={Tooltip.placements.Bottom}
            type={Tooltip.types.Tip}
            content={textProvider(languageCode, Texts.HeaderBalanceTooltipBalance)}
          >
            <S.RegularText data-test-id='header-balance-tooltip__balance'>
              <HeaderBalanceTooltipCurrency value={payload.balance} />
            </S.RegularText>
          </Tooltip>
        </S.Balance>
      );
    }

    if (mode === Mode.LimitedBalance) {
      return (
        <>
          <S.Icon>
            <HeaderBalanceTooltipPie balance={payload.balance} limit={payload.limit} />
          </S.Icon>
          <HeaderBalanceTooltipFoldable
            open={isMouseOver}
            onOpen={handleFoldableOpen}
            onClose={handleFoldableClose}
            fallback={
              isRechargeButtonVisible && (
                <S.Balance type='button' disabled>
                  <S.RegularText>₽</S.RegularText>
                </S.Balance>
              )
            }
          >
            <S.Balance type='button' onClick={onBalanceClick} disabled={!Boolean(onBalanceClick)}>
              <Tooltip
                placement={Tooltip.placements.Bottom}
                type={Tooltip.types.Tip}
                content={textProvider(languageCode, Texts.HeaderBalanceTooltipBalance)}
              >
                <S.AccentText data-test-id='header-balance-tooltip__balance'>
                  <HeaderBalanceTooltipCurrency value={payload.balance} />
                </S.AccentText>
              </Tooltip>
              <S.RegularText>/</S.RegularText>
              <Tooltip
                placement={Tooltip.placements.Bottom}
                type={Tooltip.types.Tip}
                content={textProvider(languageCode, Texts.HeaderBalanceTooltipLimit)}
              >
                <S.RegularText data-test-id='header-balance-tooltip__limit'>
                  <HeaderBalanceTooltipCurrency value={payload.limit} />
                </S.RegularText>
              </Tooltip>
            </S.Balance>
          </HeaderBalanceTooltipFoldable>
        </>
      );
    }

    return null;
  }

  return (
    <S.Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...extractSupportProps(rest)}>
      <HeaderBalanceTooltipFloating active={isFoldableOpen}>
        <S.Frame>
          {isRechargeButtonVisible && (
            <S.RechargeButton>
              <Tooltip
                placement={Tooltip.placements.Bottom}
                type={Tooltip.types.Tip}
                content={textProvider(languageCode, Texts.HeaderBalanceTooltipRecharge)}
              >
                <ButtonIcon
                  variant={ButtonIcon.variants.Color}
                  icon={<CircleAddInterfaceSVG />}
                  onClick={handleRechargeButtonClick}
                  data-test-id='header-balance-tooltip__recharge-button'
                />
              </Tooltip>
            </S.RechargeButton>
          )}
          {renderModeEntry(getModeEntry())}
        </S.Frame>
      </HeaderBalanceTooltipFloating>
    </S.Wrapper>
  );
}
