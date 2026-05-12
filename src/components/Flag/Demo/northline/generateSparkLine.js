export function generateInteractionDensity({
  points = 72,
  baseline = 0.15,
  intensity = 1,
  bursts = 4,
  revisitStrength = 0.8,
  decay = 0.82,
  seed = 1,
}) {
  let s = seed;

  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  const data = Array.from({ length: points }, () => baseline + rand() * 0.08);

  // Main research bursts
  for (let b = 0; b < bursts; b++) {
    const center = Math.floor(rand() * points);
    const peak = intensity * (0.8 + rand() * 0.7);
    const width = 3 + Math.floor(rand() * 7);

    for (let i = 0; i < points; i++) {
      const distance = Math.abs(i - center);
      if (distance <= width) {
        data[i] += peak * Math.pow(decay, distance);
      }
    }
  }

  // Smaller revisit pulses
  const revisitCount = Math.max(1, Math.round(bursts * 0.6));

  for (let r = 0; r < revisitCount; r++) {
    const center = Math.floor(rand() * points);
    const peak = revisitStrength * intensity * (0.35 + rand() * 0.45);
    const width = 2 + Math.floor(rand() * 4);

    for (let i = 0; i < points; i++) {
      const distance = Math.abs(i - center);
      if (distance <= width) {
        data[i] += peak * Math.pow(0.72, distance);
      }
    }
  }

  // Normalize to a sparkline-friendly 0 to 100 range
  const max = Math.max(...data);

  return data.map((v) => Number(((v / max) * 100).toFixed(1)));
}

export const densityProfiles = {
  "em-consumer": {
    intensity: 1.35,
    bursts: 7,
    revisitStrength: 1.1,
    seed: 11,
  },
  "ai-infra": {
    intensity: 1.15,
    bursts: 5,
    revisitStrength: 0.9,
    seed: 22,
  },
  cybersec: {
    intensity: 0.95,
    bursts: 4,
    revisitStrength: 0.75,
    seed: 33,
  },
  "energy-transition": {
    intensity: 0.75,
    bursts: 3,
    revisitStrength: 0.65,
    seed: 44,
  },
  "us-infra": {
    intensity: 0.55,
    bursts: 2,
    revisitStrength: 0.45,
    seed: 55,
  },
  geopolitical: {
    intensity: 0.45,
    bursts: 2,
    revisitStrength: 0.4,
    seed: 66,
  },
};
function seededRandom(seed = 1) {
  let s = seed;
  return function rand() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function normal(rand) {
  const u = Math.max(rand(), 1e-9);
  const v = Math.max(rand(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function generateRegimePerformanceData({
  regime = "expansion",
  points = 72,
  seed = 1,
} = {}) {
  const rand = seededRandom(seed);

  const profiles = {
    expansion: {
      start: -0.025,
      end: 0.035,
      noise: 0.004,
      momentum: 0.78,
      pullbackChance: 0.045,
      pullbackSize: 0.012,
      min: -0.04,
      max: 0.055,
    },

    inflation: {
      start: -0.005,
      end: 0.005,
      noise: 0.007,
      momentum: 0.58,
      pullbackChance: 0.09,
      pullbackSize: 0.018,
      min: -0.055,
      max: 0.045,
    },

    "risk-off": {
      start: 0.01,
      end: -0.035,
      noise: 0.009,
      momentum: 0.5,
      pullbackChance: 0.16,
      pullbackSize: 0.026,
      min: -0.06,
      max: 0.035,
    },

    "high-rates": {
      start: 0.0,
      end: -0.012,
      noise: 0.006,
      momentum: 0.62,
      pullbackChance: 0.1,
      pullbackSize: 0.016,
      min: -0.05,
      max: 0.04,
    },
  };

  const p = profiles[regime] ?? profiles.expansion;

  let y = p.start;
  let velocity = 0;

  const data = [];

  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1);

    // Smooth target curve, not straight-line drift.
    // Expansion benefits from early recovery, then steadier gains.
    const target =
      p.start +
      (p.end - p.start) *
        (regime === "expansion" ? 1 - Math.pow(1 - progress, 2.2) : progress);

    const correction = (target - y) * 0.08;
    const noise = normal(rand) * p.noise;

    // Momentum keeps the line from reversing too often.
    velocity = velocity * p.momentum + correction + noise;

    // Regime-specific downside shocks.
    if (rand() < p.pullbackChance) {
      velocity -= p.pullbackSize * (0.45 + rand() * 0.8);
    }

    y += velocity;

    // Soft pull back from bounds instead of hard clipping behavior.
    if (y > p.max) {
      y = p.max - rand() * 0.004;
      velocity *= -0.25;
    }

    if (y < p.min) {
      y = p.min + rand() * 0.004;
      velocity *= -0.15;
    }

    data.push({
      x: i,
      y: Number(y.toFixed(4)),
    });
  }

  return data;
}
