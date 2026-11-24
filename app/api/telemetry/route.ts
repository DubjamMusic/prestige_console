import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TelemetrySchema = z.object({
  N: z.number().int().nonnegative(), // successful merged quality nodes
  V: z.number().nonnegative(), // merged PRs over time
  S: z.number().int().nonnegative(), // consecutive successful pipeline runs
  D: z.number().min(0).max(1), // successful checks / total checks
  Density: z.number().min(0).max(100),
  Updated: z.string().datetime(),
  Notes: z.string().max(200),
  repo: z.string().optional(),
  workflow: z.string().optional(),
  conclusion: z.enum(["success", "failure", "cancelled", "skipped"]).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = TelemetrySchema.parse(body);

    // Read-only event store: log approved fields only. In production this would
    // write to a durable store (KV, DB, or file). For the first collector we
    // echo + console for visibility.
    console.log("[prestige-telemetry]", JSON.stringify({
      ...data,
      receivedAt: new Date().toISOString(),
    }));

    return NextResponse.json({
      ok: true,
      stored: {
        N: data.N,
        V: data.V,
        S: data.S,
        D: data.D,
        Density: data.Density,
        Updated: data.Updated,
        Notes: data.Notes,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "invalid payload" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ready",
    accepts: ["N", "V", "S", "D", "Density", "Updated", "Notes"],
    note: "POST only the approved CI prestige fields. No source or secrets.",
  });
}
