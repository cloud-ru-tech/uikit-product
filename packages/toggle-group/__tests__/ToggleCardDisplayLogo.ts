describe('[Toggle Group]: Toggle Card Display Logo', () => {
  it('renders correctly', () => {
    cy.visitComponent({
      group: 'toggle-group-toggle-card',
      name: 'display-logo',
      props: { 'data-test-id': 'toggle-card-display-logo' },
    });

    cy.getByDataTestId('toggle-card-display-logo').within(() => {
      cy.getByDataTestId('toggle-card-display-logo-icon')
        .should('exist')
        .getByDataTestId('toggle-card-display-logo-title')
        .should('exist')
        .getByDataTestId('toggle-card-display-logo-caption')
        .should('exist');
    });
  });
});

export {};
