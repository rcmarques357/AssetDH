import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000
})



//apiAxios.interceptors.request.use((config) => {
//  const token = /* read token */;
//  if (token) config.headers.Authorization = `Bearer ${token}`;
//  return config;
//});


function toFriendlyError(err: unknown): string {
  if ((axios.isCancel && axios.isCancel(err)) || (err as any)?.name === 'CanceledError') {
    return 'Request was canceled';
  }
  const ax = err as AxiosError;
  if (ax.response) return `Server error: ${ax.response.status} ${ax.response.statusText}`;
  if (ax.request) return 'Network error: no response from server';
  return ax.message ?? `Unknown error. Detail: ${ax.message}`;
}


function joinWithId(baseUrl: string, id: string | number, withTrailingSlash = true) {
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const encodedId = encodeURIComponent(String(id));
  return withTrailingSlash ? `${cleanBase}/${encodedId}/` : `${cleanBase}/${encodedId}`;
}



async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await api.get<T>(url, { signal });
  return res.data;
}


export async function getData<T>(
  url: string,
  signal?: AbortSignal
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await getJson<T>(url, signal);
    return { data };
  } catch (e) {
    return { error: toFriendlyError(e) };
  }
}


async function postJson<TRes, TReq = unknown>(
  url: string,
  body: TReq,
  signal?: AbortSignal,
  config?: AxiosRequestConfig
): Promise<TRes> {
  const res = await api.post<TRes>(url, body, { signal, ...config });
  return res.data;
}


export async function postData<TRes, TReq = unknown>(
  url: string,
  body: TReq,
  signal?: AbortSignal,
  config?: AxiosRequestConfig
): Promise<{ data?: TRes; error?: string }> {
  try {
    const data = await postJson<TRes, TReq>(url, body, signal, config);
    return { data };
  } catch (e) {
    return { error: toFriendlyError(e) };
  }
}

//TRes = response shape of data
//TReq = request shape of data

async function patchJsonId<TRes, TReq = unknown>(
  url: string,
  id: string | number,
  body: TReq,
  signal?: AbortSignal,
  config?: AxiosRequestConfig
): Promise<TRes> {
  const target = joinWithId(url, id, /* trailingSlash */ true);
  const res = await api.patch<TRes>(target, body, { signal, ...config });
  return res.data;
}

export async function patchData<TRes, TReq = unknown>(
  url: string,
  id: string | number,
  body: TReq,
  signal?: AbortSignal,
  config?: AxiosRequestConfig
): Promise<{ data?: TRes; error?: string; status?: number }> {
  try {
    const data = await patchJsonId<TRes, TReq>(url, id, body, signal, config);
    return { data };
  } catch (e) {
    return { error: toFriendlyError(e) };
  }
}

// /** Example: paginated responses */
// export type PageMeta = {
//   page: number;
//   pageSize: number;
//   total: number;
// };

// export type Paged<T> = {
//   items: T[];
//   meta: PageMeta;
// };


// export const fetchProcessesPaged = (
//   page: number,
//   pageSize: number,
//   signal?: AbortSignal
// ) => {
//   const params = new URLSearchParams({
//     page: String(page),
//     pageSize: String(pageSize),
//   });
//   return getData<Paged<Process>>(`/process?${params.toString()}`, signal);
// };

// // src/components/ProcessPaged.tsx
// import { useEffect, useState } from 'react';
// import { fetchProcessesPaged } from '../services/endpoints';
// import type { Process, Paged } from '../types';

// export function ProcessPaged() {
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [data, setData] = useState<Paged<Process> | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     (async () => {
//       setLoading(true);
//       setError(null);
//       const { data, error } = await fetchProcessesPaged(page, pageSize, controller.signal);
//       if (error) setError(error);
//       if (data) setData(data);
//       setLoading(false);
//     })();

//     return () => controller.abort();
//   }, [page, pageSize]);

//   if (loading) return <div>Loading…</div>;
//   if (error)   return <div style={{ color: 'crimson' }}>{error}</div>;
//   if (!data)   return null;

//   return (
//     <>
//       <ul>
//         {data.items.map(p => <li key={p.id}>{p.name}</li>)}
//       </ul>
//       <div>
//         Page {data.meta.page} / {Math.ceil(data.meta.total / data.meta.pageSize)}
//       </div>
//       <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
//       <button
//         disabled={data.meta.page >= Math.ceil(data.meta.total / data.meta.pageSize)}
//         onClick={() => setPage(p => p + 1)}
//       >
//         Next
//       </button>
//     </>
//   );
// }


// export const fetchProcessesByStatus = (
//   status: 'ACTIVE' | 'INACTIVE',
//   signal?: AbortSignal
// ) => {
//   const params = new URLSearchParams({ status });
//   return getData<Process[]>(`/process?${params.toString()}`, signal);
// };

