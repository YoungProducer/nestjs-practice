export interface FetchOptions {
    url?: string;
    method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'HEAD' | 'OPTIONS';
    headers?: { [key: string]: string };
    body?: any;
    [rest: string]: any;
}

export type FetchToCurl = (
    requestInfo: string | FetchOptions,
    requestInit?: FetchOptions,
) => string;
