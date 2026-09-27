# DIAL-WRIGHT-27 — Density Dial

WAVE_ID: `2026-09-27-l-spoke`
Repo: `DubjamMusic/prestige_console`
Merge policy: **pr-only**

## Job
Bind a scored density dial so Golden Globe inputs stay testable without rewriting the Next.js app shell. This is not globe-teller (Wave D lattice) and not orrery-warden (Wave G cipher). New figure, new path, new wave id.

## Responsibilities
- Own `dial.json` only.
- Print a reproducible density to three decimals.
- Keep merge policy pr-only.
- Never commit telemetry secrets.

## Knowledge required
- Density = (N^wN * V^wV * S^wS * D^wD)^(1 / totalWeight).
- Dial scores console inputs; it does not ship a new dashboard route.
- Chair holds merge.

## Primary path this wave
`figures/dial-wright/**` only.

## Out of scope
Do not rewrite `app/` pages or `middleware.ts` this wave. Auth-token rotation stays on a separate issue.
