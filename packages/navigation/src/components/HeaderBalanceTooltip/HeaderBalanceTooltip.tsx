import { useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps, useLanguage, useMatchMedia, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import {
  HeaderBalanceTooltipCurrency,
  HeaderBalanceTooltipFoldable,
  HeaderBalanceTooltipPie,
  HeaderBalanceTooltipSpinner,
} from './components';
import { Mode } from './constants';
import { AccentText, Balance, Icon, RechargeButton, RegularText, Wrapper } from './styled';
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
  const isLoading = balance === undefined;
  const handleRechargeButtonClick = isLoading ? undefined : onRechargeClick;
  const isRechargeButtonVisible = Boolean(onRechargeClick);
  const { isMobile } = useMatchMedia();

  function handleMouseEnter() {
    setIsMouseOver(true);
  }

  function handleMouseLeave() {
    setIsMouseOver(false);
  }

  function getModeEntry(): ModeEntry {
    if (isLoading) {
      return [Mode.Loading];
    }

    if (isMobile) {
      return [Mode.RegularBalance, { balance }];
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
          <Icon>
            <HeaderBalanceTooltipSpinner />
          </Icon>
          <Balance type='button' disabled>
            <RegularText>₽</RegularText>
          </Balance>
        </>
      );
    }

    if (mode === Mode.RegularBalance) {
      return (
        <Balance type='button' onClick={onBalanceClick} disabled={!Boolean(onBalanceClick)}>
          <Tooltip
            placement={Tooltip.placements.Bottom}
            type={Tooltip.types.Tip}
            content={textProvider(languageCode, Texts.HeaderBalanceTooltipBalance)}
          >
            <RegularText data-test-id='header-balance-tooltip__balance'>
              <HeaderBalanceTooltipCurrency value={payload.balance} />
            </RegularText>
          </Tooltip>
        </Balance>
      );
    }

    if (mode === Mode.LimitedBalance) {
      return (
        <>
          <Icon>
            <HeaderBalanceTooltipPie balance={payload.balance} limit={payload.limit} />
          </Icon>
          <HeaderBalanceTooltipFoldable
            open={isMouseOver}
            fallback={
              isRechargeButtonVisible && (
                <Balance type='button' disabled>
                  <RegularText>₽</RegularText>
                </Balance>
              )
            }
          >
            <Balance type='button' onClick={onBalanceClick} disabled={!Boolean(onBalanceClick)}>
              <Tooltip
                placement={Tooltip.placements.Bottom}
                type={Tooltip.types.Tip}
                content={textProvider(languageCode, Texts.HeaderBalanceTooltipBalance)}
              >
                <AccentText data-test-id='header-balance-tooltip__balance'>
                  <HeaderBalanceTooltipCurrency value={payload.balance} />
                </AccentText>
              </Tooltip>
              <RegularText>/</RegularText>
              <Tooltip
                placement={Tooltip.placements.Bottom}
                type={Tooltip.types.Tip}
                content={textProvider(languageCode, Texts.HeaderBalanceTooltipLimit)}
              >
                <RegularText data-test-id='header-balance-tooltip__limit'>
                  <HeaderBalanceTooltipCurrency value={payload.limit} />
                </RegularText>
              </Tooltip>
            </Balance>
          </HeaderBalanceTooltipFoldable>
        </>
      );
    }

    return null;
  }

  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...extractSupportProps(rest)}>
      {isRechargeButtonVisible && (
        <RechargeButton>
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
        </RechargeButton>
      )}
      {renderModeEntry(getModeEntry())}
    </Wrapper>
  );
}
