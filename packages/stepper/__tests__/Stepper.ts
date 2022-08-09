function visit() {
  return cy.visitComponent({
    name: 'stepper',
  });
}

const getStep = (stepNumber: number) => cy.getByDataTestId(`stepper__step-${stepNumber}`);

const goToStep = (stepNumber: number) => {
  getStep(stepNumber).within(() => {
    cy.get('div').first().click();
  });
};

const getNextStepButton = () => cy.getByDataTestId('move-forward');

const getPreviousStepButton = () => cy.getByDataTestId('move-backward');

const hasStepAttribute = ({
  stepNumber,
  attribute,
  chainer,
}: {
  stepNumber: number;
  attribute: string;
  chainer: string;
}) => {
  getStep(stepNumber).within(() => {
    cy.get('div').should(chainer, attribute, 'true');
  });
};

describe('[Stepper]:', () => {
  beforeEach(() => {
    visit();
  });

  it('Rendered', () => {
    cy.getByDataTestId('stepper-wrapper').should('exist');
  });

  it('next step button clicked and trigger error when first step input value = 1', () => {
    cy.getByDataTestId('first-step-input').type('1');

    getNextStepButton().click();

    hasStepAttribute({ stepNumber: 0, attribute: 'data-error', chainer: 'have.attr' });
  });

  it('clear error button clicked, when first step input value = 1', () => {
    cy.getByDataTestId('first-step-input').type('1');
    goToStep(1);

    cy.getByDataTestId('clear-errors').click();

    hasStepAttribute({ stepNumber: 0, attribute: 'data-error', chainer: 'not.have.attr' });
  });

  it('successfully going to the last step and returning back', () => {
    goToStep(1);
    hasStepAttribute({ stepNumber: 1, attribute: 'data-current', chainer: 'have.attr' });
    getStep(0).within(() => {
      cy.getByDataTestId('stepper__step__completed').should('exist');
    });

    goToStep(2);
    hasStepAttribute({ stepNumber: 2, attribute: 'data-current', chainer: 'have.attr' });
    getStep(1).within(() => {
      cy.getByDataTestId('stepper__step__completed').should('exist');
    });

    goToStep(1);
    getStep(1).within(() => {
      cy.getByDataTestId('stepper__step__completed').should('not.exist');
    });

    goToStep(0);
    getStep(0).within(() => {
      cy.getByDataTestId('stepper__step__completed').should('not.exist');
    });
  });

  it('user remains on first step when trying to go right to third step', () => {
    hasStepAttribute({ stepNumber: 0, attribute: 'data-current', chainer: 'have.attr' });

    goToStep(2);

    hasStepAttribute({ stepNumber: 0, attribute: 'data-current', chainer: 'have.attr' });
  });

  it('successfully going to the last step and returning back skipping second step', () => {
    goToStep(1);
    goToStep(2);
    goToStep(0);

    getStep(0).within(() => {
      cy.getByDataTestId('stepper__step__completed').should('not.exist');
    });
    getStep(1).within(() => {
      cy.getByDataTestId('stepper__step__completed').should('not.exist');
    });
  });

  it('successfully going to the last step and returning back using previous step/next step buttons', () => {
    cy.getByDataTestId('step-1-content').should('exist');

    getNextStepButton().click();
    hasStepAttribute({ stepNumber: 1, attribute: 'data-current', chainer: 'have.attr' });
    hasStepAttribute({ stepNumber: 1, attribute: 'data-error', chainer: 'not.have.attr' });
    cy.getByDataTestId('step-2-content').should('exist');

    getNextStepButton().click();
    hasStepAttribute({ stepNumber: 2, attribute: 'data-current', chainer: 'have.attr' });
    hasStepAttribute({ stepNumber: 2, attribute: 'data-error', chainer: 'not.have.attr' });
    cy.getByDataTestId('step-3-content').should('exist');

    getPreviousStepButton().click();
    hasStepAttribute({ stepNumber: 1, attribute: 'data-current', chainer: 'have.attr' });
    hasStepAttribute({ stepNumber: 1, attribute: 'data-error', chainer: 'not.have.attr' });
    cy.getByDataTestId('step-2-content').should('exist');

    getPreviousStepButton().click();
    hasStepAttribute({ stepNumber: 0, attribute: 'data-current', chainer: 'have.attr' });
    hasStepAttribute({ stepNumber: 0, attribute: 'data-error', chainer: 'not.have.attr' });
    cy.getByDataTestId('step-1-content').should('exist');
  });

  it('trigger error on last step when third step input = 3', () => {
    goToStep(1);
    goToStep(2);

    cy.getByDataTestId('third-step-input').type('3');
    cy.getByDataTestId('submit').click();

    hasStepAttribute({ stepNumber: 2, attribute: 'data-current', chainer: 'have.attr' });
    hasStepAttribute({ stepNumber: 2, attribute: 'data-error', chainer: 'have.attr' });
  });
});

export {};
