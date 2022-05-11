describe('[Toggle Group]: Toggle Group', () => {
  function visit(mode: string) {
    cy.visitComponent({
      group: 'toggle-group',
      name: 'toggle-group',
      props: { mode, 'data-test-id': 'toggle-group' },
    });
  }

  it('select checkbox cards correctly', () => {
    visit('checkbox');

    cy.getByDataTestId('toggle-group').within(() => {
      cy.getByDataTestId('basic-images-card-1')
        .click()
        .getByDataTestId('models-card-1')
        .click()
        .getByDataTestId('containers-card-1')
        .click()
        .click()
        .getByDataTestId('toggle-card-box-input-checked')
        .should('have.length', 2);
    });
  });

  it('select radio cards correctly', () => {
    visit('radio');

    cy.getByDataTestId('toggle-group').within(() => {
      cy.getByDataTestId('basic-images-card-1')
        .click()
        .getByDataTestId('models-card-1')
        .click()
        .getByDataTestId('containers-card-1')
        .click()
        .click()
        .getByDataTestId('toggle-card-box-input-checked')
        .should('have.length', 1);
    });
  });
});

export {};
