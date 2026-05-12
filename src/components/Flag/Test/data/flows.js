export const FLOWS = {
  A: {
    name: 'Traditional',
    steps: [
      { id: 'theme', title: 'Choose theme' },
      { id: 'holdings', title: 'Review holdings' },
      { id: 'risk', title: 'Assess risk' },
      { id: 'fees', title: 'Review fees' },
      { id: 'amount', title: 'Set amount' },
      { id: 'confirm', title: 'Confirm' },
    ],
  },
  R: {
    name: 'Robinhood',
    steps: [
      { id: 'list', title: 'Browse' },
      { id: 'detail', title: 'Review instrument' },
      { id: 'amount', title: 'Buy' },
      { id: 'review', title: 'Confirm order' },
    ],
  },
  B: {
    name: 'Redesign',
    steps: [
      { id: 'discover', title: 'Recognize theme' },
      { id: 'setLevel', title: 'Set level' },
      { id: 'confirm', title: 'Confirm standing' },
    ],
  },
};

export const stepIdAt = (flow, step) => FLOWS[flow].steps[step - 1].id;
export const stepTitleAt = (flow, step) => FLOWS[flow].steps[step - 1].title;
export const totalSteps = (flow) => FLOWS[flow].steps.length;
