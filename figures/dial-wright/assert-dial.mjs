#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const card = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "dial.json"), "utf8"),
);

if (card.figureId !== "dial-wright") process.exit(console.error("bad figureId") || 1);
if (card.predecessorNotThisWave === card.figureId) process.exit(console.error("reused predecessor") || 1);
if (card.waveId !== "2026-09-27-l-spoke") process.exit(console.error("bad waveId") || 1);

const banned = ["planner", "executor", "monitor", "data_agent"];
const identity = [card.figureId, card.codename, card.role, ...(card.knowledge || [])].join(" ").toLowerCase();
for (const token of banned) {
  if (identity.includes(token)) process.exit(console.error("banned token " + token) || 1);
}

const w = card.weights;
const s = card.sample;
const total = w.N + w.V + w.S + w.D;
const density = (s.N ** w.N * s.V ** w.V * s.S ** w.S * s.D ** w.D) ** (1 / total);
const rounded = Math.round(density * 1000) / 1000;
if (rounded !== card.expectedDensity) {
  process.exit(console.error(`density mismatch got=${rounded} expected=${card.expectedDensity}`) || 1);
}
if (card.mergePolicy !== "pr-only") process.exit(console.error("merge policy must be pr-only") || 1);
console.log(`ok dial-wright density=${rounded}`);
