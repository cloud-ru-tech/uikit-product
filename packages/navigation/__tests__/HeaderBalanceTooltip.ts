describe('[Navigation]: Header Balance Tooltip', () => {
  function visit({
    balance,
    limit,
    showRechargeButton = false,
  }: {
    balance?: number;
    limit?: number;
    showRechargeButton?: boolean;
  }) {
    cy.visitComponent({
      category: 'not-stable',
      group: 'navigation',
      name: 'header-balance-tooltip',
      props: { balance, limit, showRechargeButton, 'data-test-id': 'header-balance-tooltip' },
    });
  }

  it('renders spinner when no balance is passed', () => {
    visit({});

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__spinner').should('exist');
    });
  });

  it('renders recharge button when recharge handler is passed', () => {
    visit({ showRechargeButton: true });

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__recharge-button').should('exist');
    });
  });

  it('renders balance without grouping when balance is passed and it is less than 10000', () => {
    visit({ balance: 9999 });

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__balance').should('exist').and('have.text', '9999\u00a0₽');
    });
  });

  it('renders balance with grouping when balance is passed and it is greater than or equal to 10000', () => {
    visit({ balance: 10000 });

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__balance').should('exist').and('have.text', '10\u00a0000\u00a0₽');
    });
  });

  it('renders balance and limit when balance and limit are passed and mouse is over', () => {
    visit({ balance: 90, limit: 100 });

    cy.getByDataTestId('header-balance-tooltip')
      .trigger('mouseover')
      .within(() => {
        cy.getByDataTestId('header-balance-tooltip__balance')
          .should('exist')
          .and('have.text', '90\u00a0₽')
          .getByDataTestId('header-balance-tooltip__limit')
          .should('exist')
          .and('have.text', '100\u00a0₽');
      });
  });

  it('renders pie when balance and limit are passed', () => {
    visit({ balance: 90, limit: 100 });

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__pie').should('exist').and('have.attr', 'data-test-percent', '90');
    });
  });

  it('renders pie without low indication when balance and limit are passed and percent is greater than 20', () => {
    visit({ balance: 21, limit: 100 });

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__pie').should('exist').and('not.have.attr', 'data-test-low');
    });
  });

  it('renders pie with low indication when balance and limit are passed and percent is less than or equal to 20', () => {
    visit({ balance: 20, limit: 100 });

    cy.getByDataTestId('header-balance-tooltip').within(() => {
      cy.getByDataTestId('header-balance-tooltip__pie').should('exist').and('have.attr', 'data-test-low');
    });
  });
});

export {};
