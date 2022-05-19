describe('[Toggle Group]: Toggle Card Extended', () => {
  it('renders correctly', () => {
    cy.visitComponent({
      group: 'toggle-group-toggle-card',
      name: 'extended',
      props: { 'data-test-id': 'toggle-card-extended' },
    });

    cy.getByDataTestId('toggle-card-extended').within(() => {
      cy.getByDataTestId('toggle-card-extended-title')
        .should('exist')
        .getByDataTestId('toggle-card-extended-displayed-value')
        .should('exist')
        .getByDataTestId('toggle-card-extended-description')
        .should('exist')
        .getByDataTestId('toggle-card-extended-label')
        .should('exist');
    });
  });
});

export {};
