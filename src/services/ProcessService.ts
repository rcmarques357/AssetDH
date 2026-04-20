// Work Orders Service for Django API Integration
// Handles work order management API calls

import { ProcessGET, ProcessPOST } from '@/components/process-improvement/types';
import { useEffect, useState, useCallback } from 'react';
import { getData, postData, patchData } from '@/utils/api';
import type { AxiosRequestConfig } from 'axios';



export interface ProcessStats {
  total: number;
  completed: number;
  inProgress: number;
};

export async function getProcesses(signal?: AbortSignal) {
  return await getData<ProcessGET[]>('GDQPortal/process/', signal)
};

/* CALLING GET() FROM A .TSX PAGE
import { useEffect, useState } from 'react';
import { getProcessesImp } from '../services/endpoints';
import type { ProcessGET } from '../types';

export default function ProcessesPage() {
  const [rows, setRows] = useState<ProcessGET[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await getProcessesImp(controller.signal);
      if (error) setError(error);
      if (data) setRows(data);
      setLoading(false);
    })();

    return () => controller.abort(); // ✅ cancels on unmount
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div style={{ color: 'crimson' }}>{error}</div>;

  return (
    <ul>
      {rows.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}*/

export async function postProcesses(payload: ProcessPOST, signal?: AbortSignal, config?: AxiosRequestConfig) {
  return postData<ProcessGET,ProcessPOST>('GDQPortal/process/', payload, signal, config)
};

/* CALLING POST() FROM A .TSX PAGE

import { useState } from 'react';
import { postProcesses } from '../services/endpoints';
import type { ProcessGET, ProcessPOST } from '../types';

export default function CreateProcessButton() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<ProcessGET | null>(null);

  const onCreate = async () => {
    setCreating(true);
    setError(null);
    setCreated(null);

    const payload: ProcessPOST = { name: 'My New Process', owner: 'rafael' };
    const controller = new AbortController();

    const { data, error } = await postProcesses(payload, controller.signal);
    if (error) setError(error);
    if (data) setCreated(data);

    setCreating(false);
  };

  return (
    <>
      <button onClick={onCreate} disabled={creating}>
        {creating ? 'Creating…' : 'Create Process'}
      </button>

      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {created && <pre>{JSON.stringify(created, null, 2)}</pre>}
    </>
  );
}*/

export async function updateProcesses(payload: Partial<ProcessPOST>, id: number | string , signal?: AbortSignal, config?: AxiosRequestConfig) {
  return patchData<ProcessGET, Partial<ProcessPOST>>('GDQPortal/process/',id, payload, signal, config)
};