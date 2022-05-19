describe('[Toggle Group]: Toggle Card', () => {
  it('renders correctly', () => {
    cy.visitComponent({
      group: 'toggle-group-toggle-card',
      name: 'card',
      props: { 'data-test-id': 'toggle-card' },
    });

    cy.getByDataTestId('toggle-card').within(() => {
      cy.getByDataTestId('toggle-card-icon')
        .should('exist')
        .getByDataTestId('toggle-card-title')
        .should('exist')
        .getByDataTestId('toggle-card-description')
        .should('exist');
    });
  });
});

export {};
