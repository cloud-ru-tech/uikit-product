import { DocumentProps } from '../src';

describe('[Document]:', () => {
  const testId = 'document-test';

  function visit(props?: DocumentProps) {
    return cy.visitComponent({
      name: 'document',
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  // temporary commented until object props problem will be solved
  /*it('Renders correctly without MIMEType prop', () => {
    visit({
      file: {
        name: 'test.txt',
        size: 374329606,
      },
    });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('document__type').should('contain.text', 'TXT');
    });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('document__size').should('contain.text', '374.33 Mb');
    });
  });

  it('Renders long displayName and tooltip is shown on hover', () => {
    const displayName = 'super-duper very long custom document title with max-width';

    visit({
      file: {
        name: 'test.txt',
        size: 374329606,
        displayName,
      },
    });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId('document__name').should('contain.text', displayName);
    });

    cy.getByDataTestId(testId)
      .eq(0)
      .trigger('mouseenter')
      .then(() => {
        expect(cy.getByDataTestId('document__tooltip')).to.exist;
      });
  });*/

  it('Renders remove button with tooltip', () => {
    visit({
      file: {
        name: 'test.txt',
        size: 374329606,
      },
      removeButton: {
        onClick() {},
        tooltip: {
          content: testId,
        },
      },
    });

    cy.getByDataTestId(testId)
      .eq(0)
      .within(() => cy.getByDataTestId('document__remove').should('exist').trigger('mouseenter'));

    expect(cy.getByDataTestId('button-tooltip__ButtonIconBase')).to.exist;
  });

  it('Renders without remove button', () => {
    visit({
      file: {
        name: 'test.txt',
        size: 374329606,
      },
      removeButton: undefined,
    });

    cy.getByDataTestId(testId)
      .eq(0)
      .within(() => {
        cy.getByDataTestId('document__remove').should('not.exist');
      });
  });
});

export {};
