import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface HttpOptionsBase<AllowedResponseType = undefined> {
    responseType?: AllowedResponseType;
    observe?: 'body' | 'events' | 'response' | undefined;
    headers?: HttpHeaders | Record<string, string | string[]> | undefined;
    context?: HttpContext | undefined;
    params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined;
    reportProgress?: boolean | undefined;
    withCredentials?: boolean | undefined;
    credentials?: RequestCredentials | undefined;
    keepalive?: boolean | undefined;
    priority?: RequestPriority | undefined;
    cache?: RequestCache | undefined;
    mode?: RequestMode | undefined;
    redirect?: RequestRedirect | undefined;
    referrer?: string | undefined;
    integrity?: string | undefined;
    transferCache?: boolean | { includeHeaders?: string[] | undefined; } | undefined;
    timeout?: number | undefined;
    body?: unknown;
};