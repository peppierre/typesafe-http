
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ZodError, ZodType } from 'zod';
import {
  OptionsArrayBufferOptions,
  OptionsArrayBufferEventsOptions,
  OptionsArrayBufferResponseOptions,
  OptionsBlobOptions,
  OptionsBlobEventsOptions,
  OptionsBlobResponseOptions,
  OptionsTextOptions,
  OptionsTextEventsOptions,
  OptionsTextResponseOptions,
  OptionsJsonOptions,
  OptionsJsonEventsOptions,
  OptionsJsonResponseOptions,
  OptionsJsonTypedOptions,
  OptionsJsonEventsTypedOptions,
  OptionsJsonResponseTypedOptions,
  HeadArrayBufferOptions,
  HeadArrayBufferEventsOptions,
  HeadArrayBufferResponseOptions,
  HeadBlobOptions,
  HeadBlobEventsOptions,
  HeadBlobResponseOptions,
  HeadTextOptions,
  HeadTextEventsOptions,
  HeadTextResponseOptions,
  HeadJsonOptions,
  HeadJsonEventsOptions,
  HeadJsonResponseOptions,
  HeadJsonTypedOptions,
  HeadJsonEventsTypedOptions,
  HeadJsonResponseTypedOptions,
  GetArrayBufferOptions,
  GetArrayBufferEventsOptions,
  GetArrayBufferResponseOptions,
  GetBlobOptions,
  GetBlobEventsOptions,
  GetBlobResponseOptions,
  GetTextOptions,
  GetTextEventsOptions,
  GetTextResponseOptions,
  GetJsonOptions,
  GetJsonEventsOptions,
  GetJsonResponseOptions,
  GetJsonTypedOptions,
  GetJsonEventsTypedOptions,
  GetJsonResponseTypedOptions,
  DeleteArrayBufferOptions,
  DeleteArrayBufferEventsOptions,
  DeleteArrayBufferResponseOptions,
  DeleteBlobOptions,
  DeleteBlobEventsOptions,
  DeleteBlobResponseOptions,
  DeleteTextOptions,
  DeleteTextEventsOptions,
  DeleteTextResponseOptions,
  DeleteJsonOptions,
  DeleteJsonEventsOptions,
  DeleteJsonResponseOptions,
  DeleteJsonTypedOptions,
  DeleteJsonEventsTypedOptions,
  DeleteJsonResponseTypedOptions,
  PatchArrayBufferOptions,
  PatchArrayBufferEventsOptions,
  PatchArrayBufferResponseOptions,
  PatchBlobOptions,
  PatchBlobEventsOptions,
  PatchBlobResponseOptions,
  PatchTextOptions,
  PatchTextEventsOptions,
  PatchTextResponseOptions,
  PatchJsonOptions,
  PatchJsonEventsOptions,
  PatchJsonResponseOptions,
  PatchJsonTypedOptions,
  PatchJsonEventsTypedOptions,
  PatchJsonResponseTypedOptions,
  PostArrayBufferEventsOptions,
  PostArrayBufferOptions,
  PostArrayBufferResponseOptions,
  PostBlobEventsOptions,
  PostBlobOptions,
  PostBlobResponseOptions,
  PostJsonEventsOptions,
  PostJsonEventsTypedOptions,
  PostJsonOptions,
  PostJsonResponseOptions,
  PostJsonResponseTypedOptions,
  PostJsonTypedOptions,
  PostTextEventsOptions,
  PostTextOptions,
  PostTextResponseOptions,
  PutArrayBufferEventsOptions,
  PutArrayBufferOptions,
  PutArrayBufferResponseOptions,
  PutBlobEventsOptions,
  PutBlobOptions,
  PutBlobResponseOptions,
  PutJsonEventsOptions,
  PutJsonEventsTypedOptions,
  PutJsonOptions,
  PutJsonResponseOptions,
  PutJsonResponseTypedOptions,
  PutJsonTypedOptions,
  PutTextEventsOptions,
  PutTextOptions,
  PutTextResponseOptions
} from './types/http-options.type';

@Injectable({
  providedIn: 'root',
})
export class TypesafeHttpService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  constructor(private http: HttpClient) {}

  public delete    (url: string, options: DeleteArrayBufferOptions): Observable<ArrayBuffer>;
  public delete    (url: string, options: DeleteArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public delete    (url: string, options: DeleteArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public delete    (url: string, options: DeleteBlobOptions): Observable<Blob>;
  public delete    (url: string, options: DeleteBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public delete    (url: string, options: DeleteBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public delete    (url: string, options: DeleteTextOptions): Observable<string>;
  public delete    (url: string, options: DeleteTextEventsOptions): Observable<HttpEvent<string>>;
  public delete    (url: string, options: DeleteTextResponseOptions): Observable<HttpResponse<string>>;
  public delete    (url: string, options?: DeleteJsonOptions | undefined): Observable<object>;
  public delete    (url: string, options: DeleteJsonEventsOptions): Observable<HttpEvent<object>>;
  public delete    (url: string, options: DeleteJsonResponseOptions): Observable<HttpResponse<object>>;
  public delete<T> (url: string, options?: DeleteJsonTypedOptions<T> | undefined): Observable<T>;
  public delete<T> (url: string, options: DeleteJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public delete<T> (url: string, options: DeleteJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public delete<T> (url: string, options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.delete(url, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }

  public get       (url: string, options: GetArrayBufferOptions): Observable<ArrayBuffer>;
  public get       (url: string, options: GetArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public get       (url: string, options: GetArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public get       (url: string, options: GetBlobOptions): Observable<Blob>;
  public get       (url: string, options: GetBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public get       (url: string, options: GetBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public get       (url: string, options: GetTextOptions): Observable<string>;
  public get       (url: string, options: GetTextEventsOptions): Observable<HttpEvent<string>>;
  public get       (url: string, options: GetTextResponseOptions): Observable<HttpResponse<string>>;
  public get       (url: string, options?: GetJsonOptions | undefined): Observable<object>;
  public get       (url: string, options: GetJsonEventsOptions): Observable<HttpEvent<object>>;
  public get       (url: string, options: GetJsonResponseOptions): Observable<HttpResponse<object>>;
  public get<T>    (url: string, options?: GetJsonTypedOptions<T> | undefined): Observable<T>;
  public get<T>    (url: string, options: GetJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public get<T>    (url: string, options: GetJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public get<T>    (url: string, options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.get(url, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }

  public head      (url: string, options: HeadArrayBufferOptions): Observable<ArrayBuffer>;
  public head      (url: string, options: HeadArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public head      (url: string, options: HeadArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public head      (url: string, options: HeadBlobOptions): Observable<Blob>;
  public head      (url: string, options: HeadBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public head      (url: string, options: HeadBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public head      (url: string, options: HeadTextOptions): Observable<string>;
  public head      (url: string, options: HeadTextEventsOptions): Observable<HttpEvent<string>>;
  public head      (url: string, options: HeadTextResponseOptions): Observable<HttpResponse<string>>;
  public head      (url: string, options?: HeadJsonOptions | undefined): Observable<object>;
  public head      (url: string, options: HeadJsonEventsOptions): Observable<HttpEvent<object>>;
  public head      (url: string, options: HeadJsonResponseOptions): Observable<HttpResponse<object>>;
  public head<T>   (url: string, options?: HeadJsonTypedOptions<T> | undefined): Observable<T>;
  public head<T>   (url: string, options: HeadJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public head<T>   (url: string, options: HeadJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public head<T>   (url: string, options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.head(url, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }

  public options   (url: string, options: OptionsArrayBufferOptions): Observable<ArrayBuffer>;
  public options   (url: string, options: OptionsArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public options   (url: string, options: OptionsArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public options   (url: string, options: OptionsBlobOptions): Observable<Blob>;
  public options   (url: string, options: OptionsBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public options   (url: string, options: OptionsBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public options   (url: string, options: OptionsTextOptions): Observable<string>;
  public options   (url: string, options: OptionsTextEventsOptions): Observable<HttpEvent<string>>;
  public options   (url: string, options: OptionsTextResponseOptions): Observable<HttpResponse<string>>;
  public options   (url: string, options?: OptionsJsonOptions | undefined): Observable<object>;
  public options   (url: string, options: OptionsJsonEventsOptions): Observable<HttpEvent<object>>;
  public options   (url: string, options: OptionsJsonResponseOptions): Observable<HttpResponse<object>>;
  public options<T>(url: string, options?: OptionsJsonTypedOptions<T> | undefined): Observable<T>;
  public options<T>(url: string, options: OptionsJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public options<T>(url: string, options: OptionsJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public options<T>(url: string, options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.options(url, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }

  public patch     (url: string, body: unknown, options: PatchArrayBufferOptions): Observable<ArrayBuffer>;
  public patch     (url: string, body: unknown, options: PatchArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public patch     (url: string, body: unknown, options: PatchArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public patch     (url: string, body: unknown, options: PatchBlobOptions): Observable<Blob>;
  public patch     (url: string, body: unknown, options: PatchBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public patch     (url: string, body: unknown, options: PatchBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public patch     (url: string, body: unknown, options: PatchTextOptions): Observable<string>;
  public patch     (url: string, body: unknown, options: PatchTextEventsOptions): Observable<HttpEvent<string>>;
  public patch     (url: string, body: unknown, options: PatchTextResponseOptions): Observable<HttpResponse<string>>;
  public patch     (url: string, body: unknown, options?: PatchJsonOptions | undefined): Observable<object>;
  public patch     (url: string, body: unknown, options: PatchJsonEventsOptions): Observable<HttpEvent<object>>;
  public patch     (url: string, body: unknown, options: PatchJsonResponseOptions): Observable<HttpResponse<object>>;
  public patch<T>  (url: string, body: unknown, options?: PatchJsonTypedOptions<T> | undefined): Observable<T>;
  public patch<T>  (url: string, body: unknown, options: PatchJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public patch<T>  (url: string, body: unknown, options: PatchJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public patch<T>  (url: string, body: unknown, options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.patch(url, body, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }

  public post      (url: string, body: any, options: PostArrayBufferOptions): Observable<ArrayBuffer>;
  public post      (url: string, body: any, options: PostArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public post      (url: string, body: any, options: PostArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public post      (url: string, body: any, options: PostBlobOptions): Observable<Blob>;
  public post      (url: string, body: any, options: PostBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public post      (url: string, body: any, options: PostBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public post      (url: string, body: any, options: PostTextOptions): Observable<string>;
  public post      (url: string, body: any, options: PostTextEventsOptions): Observable<HttpEvent<string>>;
  public post      (url: string, body: any, options: PostTextResponseOptions): Observable<HttpResponse<string>>;
  public post      (url: string, body: any, options?: PostJsonOptions | undefined): Observable<object>;
  public post      (url: string, body: any, options: PostJsonEventsOptions): Observable<HttpEvent<object>>;
  public post      (url: string, body: any, options: PostJsonResponseOptions): Observable<HttpResponse<object>>;
  public post<T>   (url: string, body: any, options?: PostJsonTypedOptions<T> | undefined): Observable<T>;
  public post<T>   (url: string, body: any, options: PostJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public post<T>   (url: string, body: any, options: PostJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public post<T>   (url: string, body: any,  options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.post(url, body, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }

  public put       (url: string, body: any, options: PutArrayBufferOptions): Observable<ArrayBuffer>;
  public put       (url: string, body: any, options: PutArrayBufferEventsOptions): Observable<HttpEvent<ArrayBuffer>>;
  public put       (url: string, body: any, options: PutArrayBufferResponseOptions): Observable<HttpResponse<ArrayBuffer>>;
  public put       (url: string, body: any, options: PutBlobOptions): Observable<Blob>;
  public put       (url: string, body: any, options: PutBlobEventsOptions): Observable<HttpEvent<Blob>>;
  public put       (url: string, body: any, options: PutBlobResponseOptions): Observable<HttpResponse<Blob>>;
  public put       (url: string, body: any, options: PutTextOptions): Observable<string>;
  public put       (url: string, body: any, options: PutTextEventsOptions): Observable<HttpEvent<string>>;
  public put       (url: string, body: any, options: PutTextResponseOptions): Observable<HttpResponse<string>>;
  public put       (url: string, body: any, options?: PutJsonOptions | undefined): Observable<object>;
  public put       (url: string, body: any, options: PutJsonEventsOptions): Observable<HttpEvent<object>>;
  public put       (url: string, body: any, options: PutJsonResponseOptions): Observable<HttpResponse<object>>;
  public put<T>    (url: string, body: any, options?: PutJsonTypedOptions<T> | undefined): Observable<T>;
  public put<T>    (url: string, body: any, options: PutJsonEventsTypedOptions<T>): Observable<HttpEvent<T>>;
  public put<T>    (url: string, body: any, options: PutJsonResponseTypedOptions<T>): Observable<HttpResponse<T>>;
  public put<T>    (url: string, body: any,  options?: any): Observable<ArrayBuffer | object | Blob | string | T > | Observable<HttpEvent<ArrayBuffer | object | Blob | string | T>> | Observable<HttpResponse<ArrayBuffer | object | Blob | string | T>> {
    return this.http.put(url, body, options).pipe(
      tap(generateHandler<T>(options)),
      catchError(handleDecodeError)
    );
  }
}

function generateHandler<R>(options: any = {}): (response: ArrayBuffer | string | object | R | HttpEvent<ArrayBuffer | string | object | R> | HttpResponse<ArrayBuffer | string | object | R>) => void {
  const { runtimeType, observe = 'body', responseType = 'json' } = options;
  return (response: ArrayBuffer | string | object | R | HttpEvent<ArrayBuffer | string | object | R> | HttpResponse<ArrayBuffer | string | object | R>) => {
    if (responseType === 'json' && runtimeType instanceof ZodType) {
      let resultValue: R | null = null;
      if (observe === 'body') {
        resultValue = response as R;
      } else if (observe === 'response') {
        resultValue = (response as HttpResponse<any>).body as R;
      } else if (observe === 'events' && (response as HttpEvent<R>).type === HttpEventType.Response) {
        resultValue = (response as HttpResponse<R>).body! as R;
      }
      if (resultValue === null) {
        return;
      }
      const result = runtimeType.safeParse(response);
      if (!result.success) {
        throw new TypeError(generateCustomTypeErrorMessage(
          runtimeType.constructor.name,
          response,
          result.error
        ));
      }
    }
  };
}

function generateCustomTypeErrorMessage(runtimeTypeName:  string, response: unknown, error: ZodError) {
  return `Type '${ runtimeTypeName }' decode mismatch.\n` +
          '\tUnable to decode following value:\n' +
          `\t${ JSON.stringify(response) }\n\n` +
          'Following errors were found:\n' +
          `${ error.issues.map(
            (error) => `${
                `\t\t${ error.path.join('.') }: ${ error.message }`
              }`
          ).join('\n') }`;
}

function handleDecodeError(error: TypeError) {
  return throwError(() => error);
}
