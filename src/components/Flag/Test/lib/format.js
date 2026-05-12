import { DETAIL } from '../data/detail';

export const fmtPct = (n, d = 2) => (n * 100).toFixed(d) + '%';

export const fmtPctSigned = (n, d = 1) =>
  (n >= 0 ? '+' : '') + (n * 100).toFixed(d) + '%';

export const fmtMoney = (n, c = 'USD') =>
  n.toLocaleString('en-US', { style: 'currency', currency: c, maximumFractionDigits: 0 });

export const fmtMoneyDec = (n, c = 'USD') =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: c,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const fmtAUM = (n) =>
  n >= 1e9 ? '$' + (n / 1e9).toFixed(1) + 'B' : '$' + (n / 1e6).toFixed(0) + 'M';

export const getFreqLabel = (id) =>
  DETAIL.amount.frequencies.find((f) => f.id === id)?.label ?? id;
