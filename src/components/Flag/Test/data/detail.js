export const DETAIL = {
  style: 'Growth',
  region: 'EM Asia, LatAm select',
  deploymentCadence: 'Monthly · Rebalanced quarterly',

  holdings: [
    { name: 'Mercado Libre', ticker: 'MELI', weight: 0.082, country: 'Argentina', sector: 'Cons. Disc.' },
    { name: 'Tencent Holdings', ticker: '0700.HK', weight: 0.076, country: 'China', sector: 'Communication' },
    { name: 'Reliance Industries', ticker: 'RELIANCE.NS', weight: 0.065, country: 'India', sector: 'Energy' },
    { name: 'Naspers', ticker: 'NPN.JO', weight: 0.058, country: 'South Africa', sector: 'Communication' },
    { name: 'Alibaba Group', ticker: '9988.HK', weight: 0.054, country: 'China', sector: 'Cons. Disc.' },
    { name: 'Sea Limited', ticker: 'SE', weight: 0.048, country: 'Singapore', sector: 'Cons. Disc.' },
    { name: 'Bajaj Finance', ticker: 'BAJFINANCE.NS', weight: 0.044, country: 'India', sector: 'Financial' },
    { name: 'Walmart de Mexico', ticker: 'WALMEX.MX', weight: 0.041, country: 'Mexico', sector: 'Cons. Staples' },
    { name: 'MakeMyTrip', ticker: 'MMYT', weight: 0.038, country: 'India', sector: 'Cons. Disc.' },
    { name: 'Coupang', ticker: 'CPNG', weight: 0.036, country: 'South Korea', sector: 'Cons. Disc.' },
  ],

  sectorBreakdown: [
    { sector: 'Consumer Discretionary', weight: 0.34 },
    { sector: 'Communication Services', weight: 0.21 },
    { sector: 'Financial Services', weight: 0.14 },
    { sector: 'Consumer Staples', weight: 0.12 },
    { sector: 'Energy', weight: 0.09 },
    { sector: 'Other', weight: 0.1 },
  ],

  geographicExposure: [
    { region: 'China', weight: 0.28 },
    { region: 'India', weight: 0.22 },
    { region: 'Brazil', weight: 0.12 },
    { region: 'Mexico', weight: 0.09 },
    { region: 'South Korea', weight: 0.08 },
    { region: 'Other EM', weight: 0.21 },
  ],

  assetAllocation: [
    { class: 'Equities', weight: 0.6 },
    { class: 'Credit', weight: 0.2 },
    { class: 'Rates', weight: 0.1 },
    { class: 'Cash Buffer', weight: 0.1 },
  ],

  portfolioImpact: {
    currentExposure: 0.12,
    postCommitExposure: 0.19,
    overlapWithCurrent: 0.32,
  },

  risk: {
    ratingScaleMax: 7,
    rating: 4,
    ratingLabel: 'Balanced',
    timeHorizonYears: { min: 3, max: 5 },
    volatility1Y: { low: 0.15, high: 0.22, note: 'modeled on similar EM growth themes.' },
    maxDrawdown1Y: { low: -0.18, high: -0.28, note: 'stress-tested across recent regimes.' },
    sharpe3Y: 0.42,
    beta: 1.18,
    worstRegime: { name: 'Risk-off', note: 'USD strength compounds losses.' },
    bestRegime: { name: 'Expansion', note: 'Broad growth, falling rates, improving liquidity.' },
    suitability: 'Moderate to high risk tolerance.',
    suitabilityOptions: [
      { id: 'match', text: 'This matches my risk tolerance.' },
      { id: 'lower', text: 'I want something more conservative.' },
      { id: 'higher', text: 'I want something more aggressive.' },
      { id: 'uncertain', text: 'I am not sure. Show me more information.' },
    ],
  },

  fees: {
    expenseRatio: 0.0032,
    managementFee: 0.0025,
    otherCosts: 0.0007,
    categoryAvgExpenseRatio: 0.0048,
    tenYearCostOn10kUSD: 348,
  },

  keySensitivities: [
    { name: 'USD strength', note: 'Stronger USD reduces purchasing power and pressures EM assets.' },
    { name: 'EM liquidity tightening', note: 'Tighter liquidity increases funding costs, reduces inflows.' },
    { name: 'Consumer slowdown', note: 'Weaker consumer spending dampens revenue growth expectations.' },
    { name: 'China demand contraction', note: 'Softer China demand impacts export-oriented EM economies.' },
  ],

  amount: {
    currency: 'USD',
    minimum: 25,
    maximum: 100000,
    presets: [50, 100, 250, 500, 1000],
    frequencies: [
      { id: 'one-time', label: 'One-time' },
      { id: 'weekly', label: 'Weekly' },
      { id: 'monthly', label: 'Monthly' },
      { id: 'quarterly', label: 'Quarterly' },
    ],
    defaultFrequency: 'monthly',
    defaultAmount: 250,
  },

  disclosure: {
    bullets: [
      'The value of investments can go down as well as up. Past performance is not a reliable indicator of future results.',
      'Emerging-market investments are exposed to currency, political, and liquidity risk that may amplify volatility relative to developed markets.',
      'Fees are subject to change with prior notice. Total expense ratio includes management fee, custody, and trading costs.',
      'Holdings are reviewed and rebalanced quarterly per the index methodology. The platform does not provide individualized investment advice.',
    ],
    shortNote:
      'Thematic positions carry risk and may not perform as expected. You can increase, decrease, pause, or retract this exposure anytime.',
  },
};
