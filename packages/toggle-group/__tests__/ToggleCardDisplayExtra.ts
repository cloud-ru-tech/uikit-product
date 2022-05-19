describe('[Toggle Group]: Toggle Card Display Extra', () => {
  it('renders correctly', () => {
    cy.visitComponent({
      group: 'toggle-group-toggle-card',
      name: 'display-extra',
      props: { 'data-test-id': 'toggle-card-display-extra' },
    });

    cy.getByDataTestId('toggle-card-display-extra').within(() => {
      cy.getByDataTestId('toggle-card-display-extra-icon')
        .should('exist')
        .getByDataTestId('toggle-card-display-extra-caption')
        .should('exist')
        .getByDataTestId('toggle-card-display-extra-title')
        .should('exist')
        .getByDataTestId('toggle-card-display-extra-description')
        .should('exist');
    });
  });
});

export {};
