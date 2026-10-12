/**
 * DensityWeaver Action Figure
 * Role: Prestige Density Multiplier Weaver
 * Responsibilities:
 * - Calculate Prestige Density = (N^wN * V^wV * S^wS * D^wD)^(1/totalWeight)
 * - Provide safe, deterministic scoring for correctness/safety/prestige (50/30/20)
 * Knowledge required: TypeScript math, HustleCodex metrics
 */

export interface MetricScores {
  nodes: number;
  velocity: number;
  streak: number;
  decision: number;
}

export interface Weights {
  nodes: number;
  velocity: number;
  streak: number;
  decision: number;
}

const DEFAULT_WEIGHTS: Weights = { nodes: 0.25, velocity: 0.25, streak: 0.25, decision: 0.25 };

export function calculatePrestigeDensity(
  scores: MetricScores,
  weights: Weights = DEFAULT_WEIGHTS
): number {
  const totalWeight = weights.nodes + weights.velocity + weights.streak + weights.decision;
  if (totalWeight === 0) return 0;

  const product =
    Math.pow(Math.max(scores.nodes, 0.01), weights.nodes) *
    Math.pow(Math.max(scores.velocity, 0.01), weights.velocity) *
    Math.pow(Math.max(scores.streak, 0.01), weights.streak) *
    Math.pow(Math.max(scores.decision, 0.01), weights.decision);

  return Math.pow(product, 1 / totalWeight);
}

export function scoreWave(
  correctness: number,
  safety: number,
  prestigeImpact: number
): { overall: number; density: number } {
  const overall = correctness * 0.5 + safety * 0.3 + prestigeImpact * 0.2;
  const density = calculatePrestigeDensity({
    nodes: correctness,
    velocity: safety,
    streak: prestigeImpact,
    decision: overall,
  });
  return { overall, density };
}

// Example measurable: density > 0.5 for high scores
export const densityWeaverFigure = { calculatePrestigeDensity, scoreWave };
