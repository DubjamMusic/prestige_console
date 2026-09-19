#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const card = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "density-card.json"),
    "utf8"
  )
);

const BANNED = ["planner", "executor", "monitor", "data_agent"];
if (card.figureId !== "globe-teller") throw new Error("wrong figureId");
if (BANNED.includes(card.figureId)) throw new Error("boardroom clone");
if (card.mergePolicy !== "pr-only") throw new Error("merge policy");
if (!["pip", "inline", "fullscreen"].includes(card.displayMode)) {
  throw new Error("bad displayMode");
}

const keys = ["nodes", "velocity", "streak", "decision"];
for (const k of keys) {
  const n = card.scores[k];
  if (typeof n !== "number" || n < 0 || n > 100) {
    throw new Error(`score out of range: ${k}`);
  }
}

const product = keys.reduce((acc, k) => acc * card.scores[k], 1);
const density = Math.pow(product, 1 / keys.length);
if (!(density > 0) || density > 100) throw new Error("density out of range");

const expected = Number(density.toFixed(2));
if (expected < 80 || expected > 90) {
  throw new Error(`unexpected density band: ${expected}`);
}

console.log("ok globe-teller density");
