import { LabelProps } from '../src';
import { Variants } from '../src/components/constants';

describe('[Label]:', () => {
  const testId = 'label__test';

  function visit(props?: Partial<LabelProps>) {
    cy.visitComponent<LabelProps>({
      name: 'label',
      props: {
        text: props?.text || 'label',
        variant: Variants.Green,
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  it('Rendered', () => {
    visit();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('text = Label, content should be Label', () => {
    const labelText = 'Label';
    visit({
      text: labelText,
    });

    cy.getByDataTestId(testId).should('have.text', labelText);
  });
});

export {};
