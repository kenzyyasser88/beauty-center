import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "aura-beauty-center",
    checkedAt: new Date().toISOString(),
    checks: [
      { name: "app", status: "pass" },
      { name: "build", status: "pass" },
    ],
  });
}
