import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as iots from 'io-ts';
import {
  WrappedDelete,
  WrappedGet,
  WrappedHead,
  WrappedOptions,
  WrappedPatch,
  WrappedPost,
  WrappedPut,
} from './types/wrap-method-types.type';

const IOTS_RESULT_TAG_LEFT = 'Left';

@Injectable({
  providedIn: 'root',
})
export class TypesafeHttpService {
  constructor(private http: HttpClient) {}

  public get: WrappedGet = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.get<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedGet;

  public post: WrappedPost = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, body, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.post<R>(url, body, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedPost;

  public put: WrappedPut = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, body, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.put<R>(url, body, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedPut;

  public patch: WrappedPatch = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, body, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.patch<R>(url, body, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedPatch;

  public delete: WrappedDelete = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.delete<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedDelete;

  public head: WrappedHead = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
    ...args: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    const [url, options, ..._unsupportedParams] = [...args]; // eslint-disable-line @typescript-eslint/no-unused-vars
    return this.http.head<R>(url, options).pipe(
      map(generateHandler(runtimeType)),
      catchError(handleDecodeError)
    );
  }) as WrappedHead;

  public options: WrappedOptions = (<R>(
    runtimeType: iots.Type<R, unknown, unknown>,
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
  runtimeType: iots.Type<R, unknown, unknown>
) {
  return (response: unknown) => {
    const result = runtimeType.decode(response);
    if (result._tag === IOTS_RESULT_TAG_LEFT) {
      throw new TypeError(generateCustomTypeErrorMessage(
        runtimeType.name,
        response,
        result.left
      ));
    }
    return result.right;
  };
}

function generateCustomTypeErrorMessage(runtimeTypeName:  string, response: unknown, errors: iots.Errors) {
  return `Type '${ runtimeTypeName }' decode mismatch.\n` +
          '\tUnable to decode following value:\n' +
          `\t${ JSON.stringify(response) }\n\n` +
          '\tFollowing errors were found:\n' +
          `${ errors.map(
            (error) => `${
              error.context
                .filter((context) => context.key !== '')
                .map((context) => `\t\t${ context.key }: ${ context.type.name } -> ${ context.actual }`)
                .join('\n')
              }`
          ).join('\n') }`;
}

function handleDecodeError(error: TypeError) {
  return throwError(() => error);
}
