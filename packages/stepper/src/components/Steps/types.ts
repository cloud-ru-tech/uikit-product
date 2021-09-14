type Step = {
  id: string | number;
  name: string;
};

type InnerStep = Step & {
  isFilled: boolean;
  hasError: boolean;
};

export type { Step, InnerStep };
