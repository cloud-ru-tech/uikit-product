import { LinkProps } from '../src';

type ArgType = {
  name: string;
  props: LinkProps;
};

describe('[Link]:', () => {
  const testId = 'link__test';
  const suffixIconId = 'link__suffix-icon';
  const prefixIconId = 'link__prefix-icon';

  function visit(props?: LinkProps) {
    const args: ArgType = {
      name: 'link',
      props: {
        ...(props || {}),
      },
    };

    cy.visitComponent<LinkProps>(args);
  }

  it('Rendered', () => {
    visit({
      'data-test-id': testId,
    });

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('text = Click, content should be Click', () => {
    const linkText = 'Click';
    visit({
      'data-test-id': testId,
      text: linkText,
    });

    cy.getByDataTestId(testId).should('have.text', linkText);
  });

  it('showSuffixIcon: true, should contain SuffixIcon', () => {
    visit({
      'data-test-id': testId,
      showSuffixIcon: true,
    });

    expect(cy.getByDataTestId(suffixIconId)).to.exist;
  });

  it('showSuffixIcon: false, does not contain SuffixIcon', () => {
    visit({
      'data-test-id': testId,
      showSuffixIcon: false,
    });

    cy.getByDataTestId(suffixIconId).should('not.exist');
  });

  it('prefixIcon: undefined, does not contain prefixIcon', () => {
    visit({
      prefixIcon: undefined,
    });

    cy.getByDataTestId(prefixIconId).should('not.exist');
  });

  it('disabled: true', () => {
    visit({
      'data-test-id': testId,
      disabled: true,
    });

    cy.getByDataTestId(testId).should('have.css', 'pointer-events', 'none');
  });

  it('redirect link, should be change url', () => {
    visit({
      'data-test-id': testId,
      text: 'test redirect',
    });

    cy.getByDataTestId(testId).invoke('attr', 'href').as('linkHref');
    cy.getByDataTestId(testId).click();

    cy.get('@linkHref').then(href => {
      cy.url().should('eq', href);
    });
  });
});

export {};
