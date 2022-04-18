describe('[Pagination]:', () => {
  function visit({ total, page }: { total: number; page: number }) {
    cy.visitComponent({
      group: 'pagination',
      name: 'pagination',
      props: {
        total,
        page,
      },
    });
  }

  const tests: Array<[{ total: number; page: number }, Array<number | [number, number]>]> = [
    [{ total: 7, page: 1 }, [1, 2, 3, 4, 5, 6, 7]],
    [{ total: 7, page: 7 }, [1, 2, 3, 4, 5, 6, 7]],
    [{ total: 8, page: 1 }, [1, 2, 3, 4, 5, [6, 7], 8]],
    [{ total: 8, page: 4 }, [1, 2, 3, 4, 5, [6, 7], 8]],
    [{ total: 8, page: 5 }, [1, [2, 3], 4, 5, 6, 7, 8]],
    [{ total: 8, page: 8 }, [1, [2, 3], 4, 5, 6, 7, 8]],
    [{ total: 10, page: 1 }, [1, 2, 3, 4, 5, [6, 9], 10]],
    [{ total: 10, page: 2 }, [1, 2, 3, 4, 5, [6, 9], 10]],
    [{ total: 10, page: 3 }, [1, 2, 3, 4, 5, [6, 9], 10]],
    [{ total: 10, page: 4 }, [1, 2, 3, 4, 5, [6, 9], 10]],
    [{ total: 10, page: 5 }, [1, [2, 3], 4, 5, 6, [7, 9], 10]],
    [{ total: 10, page: 6 }, [1, [2, 4], 5, 6, 7, [8, 9], 10]],
    [{ total: 10, page: 7 }, [1, [2, 5], 6, 7, 8, 9, 10]],
    [{ total: 10, page: 8 }, [1, [2, 5], 6, 7, 8, 9, 10]],
    [{ total: 10, page: 9 }, [1, [2, 5], 6, 7, 8, 9, 10]],
    [{ total: 10, page: 10 }, [1, [2, 5], 6, 7, 8, 9, 10]],
  ];

  for (const [input, output] of tests) {
    const sample = output.map(entry => (typeof entry === 'number' ? entry : `(${entry.join('...')})`)).join(' ');

    it(`renders ${sample} when total pages are ${input.total} and current page is ${input.page}`, () => {
      visit({ total: input.total, page: input.page });

      for (const [index, entry] of output.entries()) {
        cy.getByDataTestId(`pagination-entry-item-${index}`).within(() => {
          const dataTestId =
            typeof entry === 'number'
              ? `pagination-number-button-${entry}`
              : `pagination-more-button-${entry[0]}-${entry[1]}`;

          cy.getByDataTestId(dataTestId).should('exist');
        });
      }
    });
  }

  it('disables prev arrow button when current page is first page', () => {
    visit({ total: 7, page: 1 });

    cy.getByDataTestId('pagination-prev-arrow-button').should('have.attr', 'data-disabled');
  });

  it('disables next arrow button when current page is last page', () => {
    visit({ total: 7, page: 7 });

    cy.getByDataTestId('pagination-next-arrow-button').should('have.attr', 'data-disabled');
  });

  it('goes to first page when click on first page number button', () => {
    visit({ total: 15, page: 15 });

    cy.getByDataTestId('pagination-number-button-1')
      .click()
      .getByDataTestId('pagination-number-button-1') // Because `PaginationNumberButton` remounts on `selected` change.
      .should('have.attr', 'data-selected');
  });

  it('goes to last page when click on last page number button', () => {
    visit({ total: 15, page: 1 });

    cy.getByDataTestId('pagination-number-button-15')
      .click()
      .getByDataTestId('pagination-number-button-15') // Because `PaginationNumberButton` remounts on `selected` change.
      .should('have.attr', 'data-selected');
  });

  it('goes to page when click on page number button', () => {
    visit({ total: 15, page: 7 });

    cy.getByDataTestId('pagination-number-button-6')
      .click()
      .getByDataTestId('pagination-number-button-6') // Because `PaginationNumberButton` remounts on `selected` change.
      .should('have.attr', 'data-selected');
  });

  it('goes to next page when click on next arrow button', () => {
    visit({ total: 15, page: 7 });

    cy.getByDataTestId('pagination-next-arrow-button')
      .click()
      .getByDataTestId('pagination-number-button-8')
      .should('have.attr', 'data-selected');
  });

  it('goes to prev page when click on prev arrow button', () => {
    visit({ total: 15, page: 7 });

    cy.getByDataTestId('pagination-prev-arrow-button')
      .click()
      .getByDataTestId('pagination-number-button-6')
      .should('have.attr', 'data-selected');
  });

  it('goes to middle page in range of break when click on more button', () => {
    visit({ total: 15, page: 1 });

    cy.getByDataTestId('pagination-more-button-6-14')
      .click()
      .getByDataTestId('pagination-number-button-10')
      .should('have.attr', 'data-selected');
  });

  it('goes to less page between two middle pages in range of break when click on more button', () => {
    visit({ total: 16, page: 1 });

    cy.getByDataTestId('pagination-more-button-6-15')
      .click()
      .getByDataTestId('pagination-number-button-10')
      .should('have.attr', 'data-selected');
  });
});

export {};
