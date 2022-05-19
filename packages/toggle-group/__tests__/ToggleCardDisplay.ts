describe('[Toggle Group]: Toggle Card Display', () => {
  it('renders correctly', () => {
    cy.visitComponent({
      group: 'toggle-group-toggle-card',
      name: 'display',
      props: { 'data-test-id': 'toggle-card-display' },
    });

    cy.getByDataTestId('toggle-card-display').within(() => {
      cy.getByDataTestId('toggle-card-display-icon')
        .should('exist')
        .getByDataTestId('toggle-card-display-title')
        .should('exist');
    });
  });
});

export {};
