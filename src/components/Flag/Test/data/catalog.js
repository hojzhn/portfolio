// Five thematic baskets. Holdings list, prices, and curator names align
// with the Themed-arm wireframe (test-prototype-themed-arm.html) so the
// React flow renders the same UX. holdingsCount stays larger than
// topHoldings.length so the "TOP X of Y total" framing remains intact.
// Every holding carries a pricePerShare so the Amount screen can compute
// fractional shares.

export const CATALOG = [
  {
    ticker: "EMCG",
    name: "Emerging Markets Consumer Growth",
    themeShort: "Emerging-market consumer growth",
    theme: "Rising incomes, digital adoption, expanding middle class.",

    // Traditional · regulated full-service framing
    manager: "Pacific Asset Management",
    category: "International Equity · Growth",
    inception: "2018-06",

    // Themed · shown as "Managed · ${curator}"
    curator: "ARK",
    sinceInceptionReturn: 0.524,

    // Common
    riskRating: 4,
    oneYearReturn: 0.124,
    threeYearReturn: 0.287,
    fiveYearReturn: 0.412,
    expenseRatio: 0.0095,
    aumUSD: 2.4e9,
    holdingsCount: 12,

    typicalExposure: [
      { class: "Equities", weight: 0.6 },
      { class: "Credit", weight: 0.2 },
      { class: "Rates", weight: 0.1 },
      { class: "Cash", weight: 0.1 },
    ],
    userEngagement: { researches: 18, watchlists: 5, revisits: 7 },
    signalStrength: { score: 87, level: "High" },
    momentum90d: { multiplier: 2.4 },

    sparkline: [
      3, 3, 4, 4, 3, 4, 5, 5, 4, 5, 6, 6, 5, 6, 7, 7, 6, 7, 6, 5, 4, 5, 6, 7, 7,
      6, 7, 7, 6, 7,
    ],

    topHoldings: [
      {
        name: "Mercado Libre",
        ticker: "MELI",
        weight: 0.142,
        sector: "Cons. Disc.",
        pricePerShare: 1850.2,
      },
      {
        name: "Tencent",
        ticker: "0700.HK",
        weight: 0.116,
        sector: "Communication",
        pricePerShare: 380.5,
      },
      {
        name: "Reliance",
        ticker: "RELIANCE",
        weight: 0.105,
        sector: "Energy",
        pricePerShare: 28.4,
      },
      {
        name: "Alibaba",
        ticker: "9988.HK",
        weight: 0.094,
        sector: "Cons. Disc.",
        pricePerShare: 92.1,
      },
      {
        name: "Sea Limited",
        ticker: "SE",
        weight: 0.084,
        sector: "Cons. Disc.",
        pricePerShare: 138.4,
      },
      {
        name: "Coupang",
        ticker: "CPNG",
        weight: 0.076,
        sector: "Cons. Disc.",
        pricePerShare: 24.2,
      },
      {
        name: "Bajaj Finance",
        ticker: "BAJFINANCE",
        weight: 0.064,
        sector: "Financial",
        pricePerShare: 92.5,
      },
      {
        name: "MakeMyTrip",
        ticker: "MMYT",
        weight: 0.058,
        sector: "Cons. Disc.",
        pricePerShare: 96.3,
      },
    ],
    sectors: [
      { sector: "Consumer Discretionary", weight: 0.34 },
      { sector: "Communication Services", weight: 0.21 },
      { sector: "Financial Services", weight: 0.14 },
      { sector: "Consumer Staples", weight: 0.12 },
      { sector: "Other", weight: 0.19 },
    ],

    news: [
      {
        date: "Today",
        source: "Bloomberg",
        headline:
          "Mercado Libre Q3 earnings beat estimates on Latin America growth",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline:
          "India retail sales accelerate, boosting consumer basket inflows",
      },
      {
        date: "2 days ago",
        source: "Financial Times",
        headline:
          "Tencent reports record gaming revenue, lifts EM growth outlook",
      },
    ],
  },

  {
    ticker: "AIIE",
    name: "AI Infrastructure Expansion",
    themeShort: "AI infrastructure expansion",
    theme: "Compute, chips, power, data center buildout.",

    manager: "Capital Investment Advisors",
    category: "Sector · Technology · Growth",
    inception: "2020-03",

    curator: "Public",
    sinceInceptionReturn: 0.841,

    riskRating: 5,
    oneYearReturn: 0.218,
    threeYearReturn: 0.523,
    fiveYearReturn: null,
    expenseRatio: 0.0085,
    aumUSD: 4.1e9,
    holdingsCount: 8,

    typicalExposure: [
      { class: "Equities", weight: 0.7 },
      { class: "Credit", weight: 0.15 },
      { class: "Cash", weight: 0.15 },
    ],
    userEngagement: { researches: 13, watchlists: 4, revisits: 4 },
    signalStrength: { score: 78, level: "High" },
    momentum90d: { multiplier: 1.8 },

    sparkline: [
      2, 2, 3, 3, 2, 3, 4, 4, 5, 5, 6, 6, 5, 6, 7, 7, 7, 6, 5, 6, 7, 7, 7, 7, 7,
      7, 7, 6, 7, 7,
    ],

    topHoldings: [
      {
        name: "NVIDIA",
        ticker: "NVDA",
        weight: 0.241,
        sector: "Semiconductor",
        pricePerShare: 145.2,
      },
      {
        name: "Microsoft",
        ticker: "MSFT",
        weight: 0.183,
        sector: "Software",
        pricePerShare: 420.5,
      },
      {
        name: "AMD",
        ticker: "AMD",
        weight: 0.125,
        sector: "Semiconductor",
        pricePerShare: 135.4,
      },
      {
        name: "ASML Holding",
        ticker: "ASML",
        weight: 0.092,
        sector: "Semi-equipment",
        pricePerShare: 925.0,
      },
      {
        name: "TSMC",
        ticker: "TSM",
        weight: 0.084,
        sector: "Semiconductor",
        pricePerShare: 185.3,
      },
      {
        name: "Broadcom",
        ticker: "AVGO",
        weight: 0.075,
        sector: "Semiconductor",
        pricePerShare: 1620.0,
      },
      {
        name: "Arista Networks",
        ticker: "ANET",
        weight: 0.058,
        sector: "Networking",
        pricePerShare: 320.45,
      },
      {
        name: "Vertiv",
        ticker: "VRT",
        weight: 0.042,
        sector: "Data Center",
        pricePerShare: 88.1,
      },
    ],
    sectors: [
      { sector: "Semiconductors", weight: 0.42 },
      { sector: "Software", weight: 0.28 },
      { sector: "Networking & Hardware", weight: 0.15 },
      { sector: "Data Center Infrastructure", weight: 0.1 },
      { sector: "Other Technology", weight: 0.05 },
    ],

    news: [
      {
        date: "2h ago",
        source: "Bloomberg",
        headline:
          "Nvidia capex guidance raised, AI chip demand seen extending into 2027",
      },
      {
        date: "Today",
        source: "WSJ",
        headline: "Hyperscalers commit $200B in data center spend through 2026",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline: "Power grid bottlenecks slow AI rollout, analysts say",
      },
    ],
  },

  {
    ticker: "CYBR",
    name: "Cybersecurity Resilience",
    themeShort: "Cybersecurity resilience",
    theme: "Rising threats, regulatory tailwinds, enterprise spend.",

    manager: "Vanguard Thematic",
    category: "Sector · Technology · Mid-cap",
    inception: "2019-09",

    curator: "Public",
    sinceInceptionReturn: 0.412,

    riskRating: 4,
    oneYearReturn: 0.087,
    threeYearReturn: 0.215,
    fiveYearReturn: 0.412,
    expenseRatio: 0.0042,
    aumUSD: 1.8e9,
    holdingsCount: 10,

    typicalExposure: [
      { class: "Equities", weight: 0.65 },
      { class: "Credit", weight: 0.2 },
      { class: "Cash", weight: 0.15 },
    ],
    userEngagement: { researches: 10, watchlists: 3, revisits: 3 },
    signalStrength: { score: 72, level: "Above avg" },
    momentum90d: { multiplier: 1.3 },

    sparkline: [
      4, 4, 5, 5, 4, 5, 6, 5, 5, 5, 5, 6, 6, 5, 5, 6, 5, 6, 6, 5, 5, 6, 5, 6, 5,
      5, 6, 6, 5, 6,
    ],

    topHoldings: [
      {
        name: "CrowdStrike",
        ticker: "CRWD",
        weight: 0.165,
        sector: "Software",
        pricePerShare: 318.2,
      },
      {
        name: "Palo Alto",
        ticker: "PANW",
        weight: 0.142,
        sector: "Software",
        pricePerShare: 425.5,
      },
      {
        name: "Fortinet",
        ticker: "FTNT",
        weight: 0.108,
        sector: "Software",
        pricePerShare: 68.4,
      },
      {
        name: "Zscaler",
        ticker: "ZS",
        weight: 0.092,
        sector: "Software",
        pricePerShare: 185.3,
      },
      {
        name: "Cloudflare",
        ticker: "NET",
        weight: 0.083,
        sector: "Software",
        pricePerShare: 112.4,
      },
      {
        name: "Okta",
        ticker: "OKTA",
        weight: 0.075,
        sector: "Software",
        pricePerShare: 92.5,
      },
    ],
    sectors: [
      { sector: "Software & Services", weight: 0.62 },
      { sector: "IT Services", weight: 0.18 },
      { sector: "Tech Hardware", weight: 0.12 },
      { sector: "Other", weight: 0.08 },
    ],

    news: [
      {
        date: "Today",
        source: "Reuters",
        headline:
          "Ransomware attacks up 38% YoY, driving security budgets higher",
      },
      {
        date: "Yesterday",
        source: "FT",
        headline:
          "EU expands cyber resilience mandate to critical infrastructure",
      },
      {
        date: "3 days ago",
        source: "Bloomberg",
        headline: "Zero-trust adoption hits inflection point in enterprise",
      },
    ],
  },

  {
    ticker: "ENTR",
    name: "Energy Transition Enablers",
    themeShort: "Energy transition enablers",
    theme: "Grid modernization, storage, electrification supply chain.",

    manager: "BlackRock Sustainable",
    category: "Sector · Energy · ESG",
    inception: "2021-01",

    curator: "iShares",
    sinceInceptionReturn: 0.186,

    riskRating: 4,
    oneYearReturn: 0.046,
    threeYearReturn: 0.124,
    fiveYearReturn: null,
    expenseRatio: 0.0078,
    aumUSD: 3.2e9,
    holdingsCount: 14,

    typicalExposure: [
      { class: "Equities", weight: 0.5 },
      { class: "Credit", weight: 0.3 },
      { class: "Rates", weight: 0.1 },
      { class: "Cash", weight: 0.1 },
    ],
    userEngagement: { researches: 8, watchlists: 2, revisits: 2 },
    signalStrength: { score: 64, level: "Above avg" },
    momentum90d: { multiplier: 0.9 },

    sparkline: [
      5, 5, 5, 4, 5, 4, 5, 5, 4, 4, 5, 5, 5, 5, 6, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5,
      5, 5, 4, 5, 5,
    ],

    topHoldings: [
      {
        name: "NextEra Energy",
        ticker: "NEE",
        weight: 0.135,
        sector: "Utilities",
        pricePerShare: 68.4,
      },
      {
        name: "Linde",
        ticker: "LIN",
        weight: 0.118,
        sector: "Materials",
        pricePerShare: 478.2,
      },
      {
        name: "Albemarle",
        ticker: "ALB",
        weight: 0.092,
        sector: "Materials",
        pricePerShare: 92.1,
      },
      {
        name: "Eaton",
        ticker: "ETN",
        weight: 0.084,
        sector: "Industrials",
        pricePerShare: 285.4,
      },
      {
        name: "Quanta Services",
        ticker: "PWR",
        weight: 0.075,
        sector: "Industrials",
        pricePerShare: 245.5,
      },
    ],
    sectors: [
      { sector: "Industrials", weight: 0.32 },
      { sector: "Utilities", weight: 0.25 },
      { sector: "Materials", weight: 0.22 },
      { sector: "Information Technology", weight: 0.12 },
      { sector: "Other", weight: 0.09 },
    ],

    news: [
      {
        date: "Today",
        source: "Bloomberg",
        headline: "Grid storage installations triple in 2025",
      },
      {
        date: "Yesterday",
        source: "Reuters",
        headline:
          "Inflation Reduction Act funds boost domestic battery production",
      },
      {
        date: "2 days ago",
        source: "FT",
        headline: "Hydrogen infrastructure faces capex headwinds",
      },
    ],
  },

  {
    ticker: "USIR",
    name: "U.S. Infrastructure Reinvestment",
    themeShort: "U.S. infrastructure reinvestment",
    theme:
      "Public and private capex cycle across transport, industrials, utilities.",

    manager: "Fidelity Select",
    category: "Sector · Industrials",
    inception: "2017-04",

    curator: "Public",
    sinceInceptionReturn: 0.224,

    riskRating: 3,
    oneYearReturn: 0.058,
    threeYearReturn: 0.156,
    fiveYearReturn: 0.224,
    expenseRatio: 0.0065,
    aumUSD: 5.6e9,
    holdingsCount: 15,

    typicalExposure: [
      { class: "Equities", weight: 0.55 },
      { class: "Credit", weight: 0.25 },
      { class: "Rates", weight: 0.1 },
      { class: "Cash", weight: 0.1 },
    ],
    userEngagement: { researches: 6, watchlists: 2, revisits: 1 },
    signalStrength: { score: 58, level: "Average" },
    momentum90d: { multiplier: 0.6 },

    sparkline: [
      4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 5, 6, 5, 5, 6, 6, 5, 5, 5, 5, 6,
      5, 5, 5, 5, 5,
    ],

    topHoldings: [
      {
        name: "Caterpillar",
        ticker: "CAT",
        weight: 0.118,
        sector: "Industrials",
        pricePerShare: 385.2,
      },
      {
        name: "Vulcan Materials",
        ticker: "VMC",
        weight: 0.094,
        sector: "Materials",
        pricePerShare: 268.5,
      },
      {
        name: "Eaton",
        ticker: "ETN",
        weight: 0.084,
        sector: "Industrials",
        pricePerShare: 285.4,
      },
      {
        name: "Union Pacific",
        ticker: "UNP",
        weight: 0.076,
        sector: "Industrials",
        pricePerShare: 238.1,
      },
      {
        name: "Quanta Services",
        ticker: "PWR",
        weight: 0.075,
        sector: "Industrials",
        pricePerShare: 245.5,
      },
    ],
    sectors: [
      { sector: "Industrials", weight: 0.48 },
      { sector: "Materials", weight: 0.21 },
      { sector: "Utilities", weight: 0.14 },
      { sector: "Real Estate", weight: 0.09 },
      { sector: "Other", weight: 0.08 },
    ],

    news: [
      {
        date: "Today",
        source: "WSJ",
        headline:
          "Bipartisan infrastructure spending hits record execution rate",
      },
      {
        date: "Yesterday",
        source: "Bloomberg",
        headline: "Construction backlog reaches 9-month high",
      },
      {
        date: "3 days ago",
        source: "Reuters",
        headline: "Port modernization drives industrial REIT gains",
      },
    ],
  },
];

export const findCatalog = (ticker) => CATALOG.find((c) => c.ticker === ticker);
