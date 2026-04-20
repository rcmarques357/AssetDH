import React, { useEffect, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { getProcesses } from "@/services/ProcessService";
import { ProcessGET } from '@/components/process-improvement/types';

export default function APIConnection() {
  const [items, setItems] = useState<ProcessGET[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async() => {
      setLoading(true);
      setError(null);
      const { data, error }= await getProcesses(controller.signal);
      if (error)
        setError(error)
      if (data)
        setItems(data);
      setLoading(false);
    }) ();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading data…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <PageLayout title="API Connection">
      <div>
        <h1>Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.process_number} - {item.process_name} -{" "}
              {item.process_status}
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
