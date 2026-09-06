"use client";

import { useEffect, useState } from "react";

type HealthData = {
  status: string;
  service: string;
  checkedAt: string;
  checks: { name: string; status: string }[];
};

export default function HealthPanel() {
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/health")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <p className="mt-8 border-l border-forest/20 pl-4 text-sm text-forest/70">
        Could not reach /api/health: {error}
      </p>
    );
  }

  if (!data) {
    return (
      <p className="mt-8 border-l border-forest/20 pl-4 text-sm text-forest/70">
        Checking status…
      </p>
    );
  }

  return (
    <div className="mt-8 border-l border-clay pl-4">
      <p className="font-display text-lg italic text-forest">
        {data.status === "ok" ? "All systems running" : data.status}
      </p>
      <dl className="mt-4 flex flex-col gap-2 text-sm text-forest/70">
        <div className="flex justify-between gap-4">
          <dt>Service</dt>
          <dd className="text-forest">{data.service}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Checked at</dt>
          <dd className="text-forest">
            {new Date(data.checkedAt).toLocaleString()}
          </dd>
        </div>
        {data.checks.map((check) => (
          <div key={check.name} className="flex justify-between gap-4">
            <dt className="capitalize">{check.name}</dt>
            <dd className="text-forest">{check.status}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
