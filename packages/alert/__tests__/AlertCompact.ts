import { AlertCompactProps } from '../src';

function visit(props?: Partial<AlertCompactProps>) {
  return cy.visitComponent({
    group: 'alert',
    name: 'alert-compact',
    props: {
      ...(props || {}),
    },
  });
}

describe('[Alert Compact]:', () => {
  (['Default', 'Attention'] as AlertCompactProps['type'][]).forEach(type =>
    it(`${type} type`, () => {
      visit({ type });
      assert(cy.getByDataTestId('alert-compact__content').should('exist'));
    }),
  );

  it('Link', () => {
    visit();
    assert(cy.getByDataTestId('alert-compact__link').should('exist'));

    visit({ linkProps: undefined });
    assert(cy.getByDataTestId('alert-compact__link').should('not.exist'));
  });
});

export {};
