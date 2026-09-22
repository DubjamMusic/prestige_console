# ORRERY-WARDEN-22 — Density Orbit

WAVE_ID: `2026-09-22-g-cipher`
Repo: `DubjamMusic/prestige_console`
Merge policy: **pr-only**

## Job
Stand up an orrery card that computes prestige density from N/V/S/D samples. This is not globe-teller (Wave D lattice). New figure, new path, new wave id.

## Responsibilities
- Own `orrery.json` only.
- Print a reproducible density to three decimals.
- Keep merge policy pr-only.

## Knowledge required
- Density = (N^wN * V^wV * S^wS * D^wD)^(1 / totalWeight).
- Wave D globe-teller density card stays on its own branch. Do not edit it here.
- Chair holds merge.

## Primary path this wave
`figures/orrery-warden/**` only.

## Out of scope
Do not scrape live telemetry secrets into this file. Secret drift is a separate issue.
