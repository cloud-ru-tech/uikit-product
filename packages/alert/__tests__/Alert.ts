import { AlertProps, AlertTypes } from '../src';

function visit(props?: Partial<AlertProps & { hideCloseButton: boolean }>) {
  return cy.visitComponent({
    group: 'alert',
    name: 'alert',
    props: {
      ...(props || {}),
    },
  });
}

describe('[Alert]:', () => {
  (['Success', 'Warning', 'Error', 'Neutral', 'Loading'] as AlertTypes[]).forEach(type =>
    it(`${type} type`, () => {
      visit({ type });
      assert(cy.getByDataTestId('alert__content').should('exist'));
    }),
  );

  it(`Close button`, () => {
    visit({ hideCloseButton: false });
    assert(cy.getByDataTestId('alert__close-button').should('exist'), 'with close');

    visit({ hideCloseButton: true });
    assert(cy.getByDataTestId('alert__close-button').should('not.exist'), 'without close');
  });

  it(`Title`, () => {
    visit({ title: 'Title' });
    assert(cy.getByDataTestId('alert__content-title').should('exist'), 'with title');

    visit({ title: '' });
    assert(cy.getByDataTestId('alert__content-title').should('not.exist'), 'without title');
  });
});

export {};
