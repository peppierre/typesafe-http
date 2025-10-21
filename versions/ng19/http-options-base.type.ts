import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface HttpOptionsBase<AllowedResponseType = undefined> {
    responseType?: AllowedResponseType;
    observe?: 'body' | 'events' | 'response' | undefined;
    headers?: HttpHeaders | Record<string, string | string[]>;
    context?: HttpContext;
    params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
    reportProgress?: boolean;
    withCredentials?: boolean;
    transferCache?: boolean | { includeHeaders?: string[] };
    body?: unknown;
};
