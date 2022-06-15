import { InputRangeProps, InputSliderProps } from '../src/components/types';

describe('[InputSlider]: InputSlider', () => {
  const testId = 'input-slider-test';
  const handleClass = '.rc-slider-handle';
  const inputTestId = 'input-slider__input';
  const inputMinTestId = 'input-slider__input-min';
  const inputMaxTestId = 'input-slider__input-max';

  function visit(props: { name: string }) {
    cy.visitComponent({
      group: 'input-slider',
      name: props.name,
      props: {
        'data-test-id': testId,
        ...(props || {}),
      },
    });
  }

  function visitSlider(props?: Partial<InputSliderProps>) {
    visit({ name: 'input-slider', ...props });
  }

  function visitRange(props?: Partial<InputRangeProps>) {
    visit({ name: 'input-range', ...props });
  }

  it('Input Slider: Rendered', () => {
    visitSlider();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('Input Slider: Change value by input', () => {
    const defaultValue = 3;
    const additionalValue = '3';
    const resultValue = '33';
    visitSlider({ value: defaultValue });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputTestId).focus().type(additionalValue);

      cy.getByDataTestId(inputTestId).should('have.value', resultValue);
    });
  });

  it('Input Slider: Change value by handler', () => {
    const defaultValue = 3;
    const step = 1;
    const resultValue = '13';
    visitSlider({ value: defaultValue, step });

    cy.get(handleClass).type('{rightArrow}'.repeat(10));

    cy.getByDataTestId(inputTestId).should('have.value', resultValue);
  });

  it('Input Slider: display marks', () => {
    const defaultMarks = { 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: 100 };
    visitSlider();

    cy.getByDataTestId(testId).contains(defaultMarks[0]);
    cy.getByDataTestId(testId).contains(defaultMarks[20]);
    cy.getByDataTestId(testId).contains(defaultMarks[40]);
    cy.getByDataTestId(testId).contains(defaultMarks[60]);
    cy.getByDataTestId(testId).contains(defaultMarks[80]);
    cy.getByDataTestId(testId).contains(defaultMarks[100]);
  });

  it('Input Slider: display label', () => {
    const label = 'TestLabel';
    visitSlider({ label });

    cy.getByDataTestId(testId).contains(label);
  });

  it('Input Slider: display postfix', () => {
    const postfix = 'TestPostfix';
    visitSlider({ postfix });

    cy.getByDataTestId(testId).contains(postfix);
  });

  it('Input Slider: display hint', () => {
    const hint = 'TestHint';
    visitSlider({ hint });

    cy.getByDataTestId(testId).contains(hint);
  });

  it('Input Slider: value < min', () => {
    const defaultValue = 20;
    const min = 20;
    const resultValue = '20';
    visitSlider({ value: defaultValue, min });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputTestId).focus().type('{backspace}');

      cy.get(handleClass).type('{leftArrow}'.repeat(1));

      cy.getByDataTestId(inputTestId).should('have.value', resultValue);
    });
  });

  it('Input Slider: value > max', () => {
    const defaultValue = 80;
    const additionalValue = '1';
    const max = 100;
    const resultValue = '100';
    visitSlider({ value: defaultValue, max });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputTestId).focus().type(additionalValue);

      cy.get(handleClass).type('{rightArrow}'.repeat(2));

      cy.getByDataTestId(inputTestId).should('have.value', resultValue);
    });
  });

  // Input Range

  it('Input Range: Rendered', () => {
    visitRange();

    expect(cy.getByDataTestId(testId)).to.exist;
  });

  it('Input Range: Change value by input', () => {
    const defaultValue: [number, number] = [20, 80];
    const additionalValue = '3';
    const resultFirstInput = '23';
    const resultSecondInput = '100';
    visitRange({ value: defaultValue });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMinTestId).focus().type('{backspace}').type(additionalValue);
      cy.getByDataTestId(inputMaxTestId).focus().type(additionalValue);

      cy.getByDataTestId(inputMinTestId).should('have.value', resultFirstInput);
      cy.getByDataTestId(inputMaxTestId).should('have.value', resultSecondInput);
    });
  });

  it('Input Range: Change value by handler', () => {
    const defaultValue: [number, number] = [20, 80];
    const step = 1;
    const resultFirstInput = '30';
    const resultSecondInput = '70';
    visitRange({ value: defaultValue, step });

    cy.get(handleClass).first().type('{rightArrow}'.repeat(10));
    cy.get(handleClass).last().type('{leftArrow}'.repeat(10));

    cy.getByDataTestId(inputMinTestId).should('have.value', resultFirstInput);
    cy.getByDataTestId(inputMaxTestId).should('have.value', resultSecondInput);
  });

  it('Input Range: display marks', () => {
    const defaultMarks = { 0: 0, 20: 20, 40: 40, 60: 60, 80: 80, 100: 100 };
    visitRange();

    cy.getByDataTestId(testId).contains(defaultMarks[0]);
    cy.getByDataTestId(testId).contains(defaultMarks[20]);
    cy.getByDataTestId(testId).contains(defaultMarks[40]);
    cy.getByDataTestId(testId).contains(defaultMarks[60]);
    cy.getByDataTestId(testId).contains(defaultMarks[80]);
    cy.getByDataTestId(testId).contains(defaultMarks[100]);
  });

  it('Input Range: display label', () => {
    const label = 'TestLabel';
    visitRange({ label });

    cy.getByDataTestId(testId).contains(label);
  });

  it('Input Range: display postfix', () => {
    const postfix = 'TestPostfix';
    visitRange({ postfix });

    cy.getByDataTestId(testId).contains(postfix);
  });

  it('Input Range: display hint', () => {
    const hint = 'TestHint';
    visitRange({ hint });

    cy.getByDataTestId(testId).contains(hint);
  });

  it('Input Range: change first input to value[0] > value[1]', () => {
    const defaultValue: [number, number] = [20, 80];
    const additionalValue = '1';
    const resultValue = '80';
    visitRange({ value: defaultValue });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMinTestId).focus().type(additionalValue);

      cy.getByDataTestId(inputMinTestId).should('have.value', resultValue);
      cy.getByDataTestId(inputMaxTestId).should('have.value', resultValue);
    });
  });

  it('Input Range: change first input to value[0] < min', () => {
    const defaultValue: [number, number] = [20, 80];
    const min = 20;
    const resultValue = '20';
    visitRange({ value: defaultValue, min });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMinTestId).focus().type('{backspace}');

      cy.getByDataTestId(inputMinTestId).should('have.value', resultValue);
    });
  });

  it('Input Range: change second input to value[1] < min', () => {
    const defaultValue: [number, number] = [20, 80];
    const min = 20;
    const resultValue = '20';
    visitRange({ value: defaultValue, min });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMaxTestId).focus().type('{backspace}');

      cy.getByDataTestId(inputMaxTestId).should('have.value', resultValue);
    });
  });

  it('Input Range: change second input to value[1] > max', () => {
    const defaultValue: [number, number] = [20, 80];
    const additionalValue = '2';
    const max = 100;
    const resultValue = '100';
    visitRange({ value: defaultValue, max });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMaxTestId).focus().type(additionalValue);

      cy.getByDataTestId(inputMaxTestId).should('have.value', resultValue);
    });
  });

  it('Input Range: change second input to min < value[1] < value[0]', () => {
    const defaultValue: [number, number] = [20, 80];
    const min = 0;
    const resultValue = '8';
    visitRange({ value: defaultValue, min });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMaxTestId).focus().type('{backspace}');

      cy.getByDataTestId(inputMinTestId).should('have.value', resultValue);
      cy.getByDataTestId(inputMaxTestId).should('have.value', resultValue);
    });
  });

  it('Input Range: change second input to  value[0] < value[1] < max', () => {
    const defaultValue: [number, number] = [20, 80];
    const min = 0;
    const max = 100;
    const additionalValue = '3';
    const resultFirstValue = '8';
    const resultSecondValue = '83';
    visitRange({ value: defaultValue, min, max });

    cy.getByDataTestId(testId).within(() => {
      cy.getByDataTestId(inputMaxTestId).focus().type('{backspace}').type(additionalValue);

      cy.getByDataTestId(inputMinTestId).should('have.value', resultFirstValue);
      cy.getByDataTestId(inputMaxTestId).should('have.value', resultSecondValue);
    });
  });
});

export {};
