/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from 'domain/enums';
import { removeUndefined } from 'main/utils';
import type { ApiProps } from 'domain/protocol';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchApi = async <T>(params: ApiProps): Promise<T> => {
  const body: any = params.isFormData ? params.body : JSON.stringify(params.body);
  const headers = {};

  if (!params.isFormData)
    Object.assign(headers, { 'Content-Type': 'application/json;charset=UTF-8' });

  const id = params.id ? `/${params.id}` : '';

  const queryParams =
    params.queryParams && Object.values(removeUndefined(params.queryParams)).length
      ? `?${new URLSearchParams(removeUndefined(params.queryParams))}`
      : '';

  const response = await fetch(`${baseUrl}${params.route}${id}${queryParams}`, {
    body,
    headers,
    method: params.method
  });

  const { page, limit } = params.queryParams as { page?: number; limit?: number };

  if (typeof page === 'number' && typeof limit === 'number') {
    const content = await response.json();

    let totalPages = page;

    if (content?.length > 0) totalPages += 1;

    return { content, totalElements: 999999, totalPages } as T;
  }

  // if ((response.status as unknown as HttpStatusCode) === HttpStatusCode.unauthorized) {
  //   window.history.back();
  //   return null as T;
  // }

  if ((response.status as unknown as HttpStatusCode) === HttpStatusCode.noContent) return null as T;

  const data = await response.json();

  if (response.ok) return data.payload;

  throw Object(data);
};
