import { BadgeProps } from '../src';

type BadgeWithoutChildren = Omit<BadgeProps, 'children'>;

describe('[Badge]:', () => {
  const testId = 'badge__indicator';

  function visit(props?: BadgeWithoutChildren) {
    cy.visitComponent<BadgeWithoutChildren>({
      name: 'badge',
      props,
    });
  }

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('number = 89, content should be 89', () => {
    visit({
      number: 89,
    });

    cy.getByDataTestId(testId).should('have.text', '89');
  });

  it('number = 100, content should be 99+', () => {
    visit({
      number: 100,
    });

    cy.getByDataTestId(testId).should('have.text', '99+');
  });

  it('number = 0, should contain svg dot', () => {
    visit({
      number: 0,
    });

    cy.getByDataTestId(testId).within(() => {
      expect(cy.getByDataTestId('badge__dot')).to.exist;
    });
  });

  it('isGroupMessage: true, should contain svg dot', () => {
    visit({
      isGroupMessage: true,
    });

    cy.getByDataTestId(testId).within(() => {
      expect(cy.getByDataTestId('badge__dot')).to.exist;
    });
  });
});

export {};
