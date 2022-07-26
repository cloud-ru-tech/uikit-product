import { AlertBannerProps, AlertBannerTypes } from '../src';

function visit(props?: Partial<AlertBannerProps & { hideCloseButton: boolean }>) {
  return cy.visitComponent({
    group: 'alert',
    name: 'alert-banner',
    props: {
      ...(props || {}),
    },
  });
}

describe('[Alert Banner]:', () => {
  (['Alarm', 'Warning', 'Neutral'] as AlertBannerProps['type'][]).forEach(type =>
    it(`${type} type`, () => {
      visit({ type });
      assert(cy.getByDataTestId('alert-banner__content').should('exist'));
    }),
  );

  it(`Close button`, () => {
    visit({ hideCloseButton: false });
    assert(cy.getByDataTestId('alert-banner__close-button').should('exist'), 'with close');

    visit({ hideCloseButton: true });
    assert(cy.getByDataTestId('alert-banner__close-button').should('not.exist'), 'without close');
  });

  it('Title', () => {
    visit({ title: 'Title' });
    assert(cy.getByDataTestId('alert-banner__content-title').should('exist'), 'with title');

    visit({ title: '' });
    assert(cy.getByDataTestId('alert-banner__content-title').should('not.exist'), 'without title');
  });

  it('Action button', () => {
    visit();
    assert(cy.getByDataTestId('alert-banner__action-button').should('exist'), 'with action button');

    visit({ buttonProps: undefined });
    assert(cy.getByDataTestId('alert-banner__action-button').should('not.exist'), 'without action button');
  });
});

export {};
