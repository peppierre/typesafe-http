import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import z, { ZodError, ZodType } from 'zod';
import {
  WrappedDelete,
  WrappedGet,
  WrappedHead,
  WrappedOptions,
  WrappedPatch,
  WrappedPost,
  WrappedPut,
} from './types/wrap-method-types.type';

@Injectable({
  providedIn: 'root',
})
export class TypesafeHttpService {
  constructor(private http: HttpClient) {}

  public get: WrappedGet = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.get<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedGet;

  public post: WrappedPost = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, body, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.post<R>(url, body, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedPost;

  public put: WrappedPut = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, body, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.put<R>(url, body, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedPut;

  public patch: WrappedPatch = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, body, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.patch<R>(url, body, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedPatch;

  public delete: WrappedDelete = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.delete<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedDelete;

  public head: WrappedHead = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.head<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedHead;

  public options: WrappedOptions = (<R>(
    runtimeType: ZodType<R>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.options<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedOptions;

}

function generateHandler<R>(
  runtimeType: ZodType<R>
) {
  return (response: unknown) => {
    const result = runtimeType.safeParse(response);
    if (!result.success) {
      throw new TypeError(generateCustomTypeErrorMessage(
        runtimeType.constructor.name,
        response,
        result.error)
      );
    }
    return result.data as R;
  };
}

function generateCustomTypeErrorMessage(runtimeTypeName:  string, response: unknown, error: ZodError) {
  return `Type '${ runtimeTypeName }' decode mismatch.\n` +
          '\tUnable to decode following value:\n' +
          `\t${ JSON.stringify(response) }\n\n` +
          'Following errors were found:\n' +
          `${ z.prettifyError(error)}`;
}

function handleDecodeError(error: TypeError) {
  return throwError(() => error);
}
