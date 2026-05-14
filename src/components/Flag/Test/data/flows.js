// Flow keys are kept stable (A / R / B) so existing dispatcher logic in
// TestPrototypes, ActionBar, and TopBar does not need updates. Content
// generalizes from "thematic ETF" to "thematic basket."

export const FLOWS = {
  // A · Traditional Basket. Regulated full-service product onboarding.
  A: {
    name: "Traditional",
    steps: [
      { id: "browse", title: "Select basket" },
      { id: "composition", title: "Review composition" },
      { id: "risk", title: "Assess risk" },
      { id: "fees", title: "Review fees" },
      { id: "amount", title: "Set amount and account" },
      { id: "confirm", title: "Review and confirm" },
    ],
  },

  // R · Themed Basket. Compressed thematic-basket purchase (Public, Stash,
  // eToro CopyPortfolios, M1 Pies). Theme-first listing, basket-level
  // performance, allocation preview, purchase vocabulary.
  R: {
    name: "Themed",
    steps: [
      { id: "browse", title: "Browse themes" },
      { id: "detail", title: "Review theme" },
      { id: "amount", title: "Set amount" },
      { id: "confirm", title: "Review and invest" },
    ],
  },

  // B · Redesign. Compressed thematic backing. Surface as persistent
  // alignment with a view rather than as transactional purchase.
  B: {
    name: "Redesign",
    steps: [
      { id: "discover", title: "Recognize theme" },
      { id: "setLevel", title: "Set level" },
      { id: "confirm", title: "Confirm standing" },
    ],
  },
};

export const stepIdAt = (flow, step) => FLOWS[flow].steps[step - 1].id;
export const stepTitleAt = (flow, step) => FLOWS[flow].steps[step - 1].title;
export const totalSteps = (flow) => FLOWS[flow].steps.length;
