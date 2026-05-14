// Add this single export to your existing lib/format.js (do not replace
// the file). It mirrors getFreqLabel and is used by Success.jsx and
// the Traditional flow.

export const getAccountLabel = (id) =>
  DETAIL.amount.accountTypes.find((a) => a.id === id)?.label ?? id;
