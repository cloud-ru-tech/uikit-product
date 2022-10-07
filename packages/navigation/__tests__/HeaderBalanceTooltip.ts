import { fixture, Selector, test } from 'testcafe';

import { HeaderBalanceTooltipProps } from '@sbercloud/uikit-product-navigation';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(props: Partial<HeaderBalanceTooltipProps & { showRechargeButton: boolean }>) {
  return getTestcafeUrl({
    category: 'not-stable',
    group: 'navigation',
    name: 'header-balance-tooltip',
    props: { ...props, 'data-test-id': 'header-balance-tooltip' },
  });
}

function getWrapper() {
  return Selector(dataTestIdSelector('header-balance-tooltip'));
}

function getSpinner() {
  return Selector(dataTestIdSelector('header-balance-tooltip__spinner'));
}

function getRechargeButton() {
  return Selector(dataTestIdSelector('header-balance-tooltip__recharge-button'));
}

function getBalance() {
  return Selector(dataTestIdSelector('header-balance-tooltip__balance'));
}

function getLimit() {
  return Selector(dataTestIdSelector('header-balance-tooltip__limit'));
}

function getPie() {
  return Selector(dataTestIdSelector('header-balance-tooltip__pie'));
}

fixture('HeaderBalanceTooltip');

test.page(getPage({ balance: undefined }))('renders spinner when no balance is passed', async t => {
  await t.expect(getSpinner().exists).ok();
});

test.page(getPage({ showRechargeButton: true }))('renders recharge button when recharge handler is passed', async t => {
  await t.expect(getRechargeButton().exists).ok();
});

test.page(getPage({ balance: 9999 }))(
  'renders balance without grouping when balance is passed and it is less than 10000',
  async t => {
    await t.expect(getBalance().textContent).eql('9999\u00a0₽');
  },
);

test.page(getPage({ balance: 10000 }))(
  'renders balance with grouping when balance is passed and it is greater than or equal to 10000',
  async t => {
    await t.expect(getBalance().textContent).eql('10\u00a0000\u00a0₽');
  },
);

test.page(getPage({ balance: 90, limit: 100, 'data-test-id': 'header-balance-tooltip' }))(
  'renders balance and limit when balance and limit are passed and mouse is over',
  async t => {
    await t
      .hover(getWrapper())
      .expect(getBalance().visible)
      .ok()
      .expect(getBalance().textContent)
      .eql('90\u00a0₽')
      .expect(getLimit().visible)
      .ok()
      .expect(getLimit().textContent)
      .eql('100\u00a0₽');
  },
);

test.page(getPage({ balance: 90, limit: 100 }))('renders pie when balance and limit are passed', async t => {
  await t.expect(getPie().getAttribute('data-test-percent')).eql('90');
});

test.page(getPage({ balance: 21, limit: 100 }))(
  'renders pie without low indication when balance and limit are passed and percent is greater than 20',
  async t => {
    await t.expect(getPie().hasAttribute('data-test-low')).notOk();
  },
);

test.page(getPage({ balance: 20, limit: 100 }))(
  'renders pie with low indication when balance and limit are passed and percent is less than or equal to 20',
  async t => {
    await t.expect(getPie().hasAttribute('data-test-low')).ok();
  },
);
