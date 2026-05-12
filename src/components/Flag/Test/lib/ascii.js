const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

export function asciiBar(pct, width = 20, fillChar = '#', emptyChar = '-') {
  const fill = Math.round(width * clamp(pct, 0, 1));
  return '[' + fillChar.repeat(fill) + emptyChar.repeat(width - fill) + ']';
}

export function riskBar(rating, max) {
  return '[' + '#'.repeat(rating) + '-'.repeat(max - rating) + '] ' + rating + '/' + max;
}

export function sparkBlocks(values, width) {
  const blocks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  let sampled = values;
  if (values.length !== width) {
    sampled = [];
    const step = (values.length - 1) / (width - 1);
    for (let i = 0; i < width; i++) {
      const idx = i * step;
      const lo = Math.floor(idx);
      const hi = Math.min(values.length - 1, Math.ceil(idx));
      const t = idx - lo;
      sampled.push(values[lo] * (1 - t) + values[hi] * t);
    }
  }
  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const range = max - min || 1;
  return sampled.map((v) => blocks[Math.round(((v - min) / range) * 7)]).join('');
}
