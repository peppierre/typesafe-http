import { ZodType } from 'zod';
import { HttpClient } from '@angular/common/http';

type HttpGetOptionsBase     = Omit<NonNullable<Parameters<HttpClient['get']>[1]>,     'responseType' | 'observe'>;
type HttpDeleteOptionsBase  = Omit<NonNullable<Parameters<HttpClient['delete']>[1]>,  'responseType' | 'observe'>;
type HttpHeadOptionsBase    = Omit<NonNullable<Parameters<HttpClient['head']>[1]>,    'responseType' | 'observe'>;
type HttpOptionsOptionsBase = Omit<NonNullable<Parameters<HttpClient['options']>[1]>, 'responseType' | 'observe'>;
type HttpPatchOptionsBase   = Omit<NonNullable<Parameters<HttpClient['patch']>[2]>,   'responseType' | 'observe'>;
type HttpPostOptionsBase    = Omit<NonNullable<Parameters<HttpClient['post']>[2]>,    'responseType' | 'observe'>;
type HttpPutOptionsBase     = Omit<NonNullable<Parameters<HttpClient['put']>[2]>,     'responseType' | 'observe'>;

type ArrayBufferBody<B>      = B & { responseType?: 'arraybuffer';       observe?: 'body' | undefined };
type ArrayBufferEvents<B>    = B & { responseType?: 'arraybuffer';       observe: 'events' };
type ArrayBufferResponse<B>  = B & { responseType?: 'arraybuffer';       observe: 'response' };
type BlobBody<B>             = B & { responseType?: 'blob';              observe?: 'body' | undefined };
type BlobEvents<B>           = B & { responseType?: 'blob';              observe: 'events' };
type BlobResponse<B>         = B & { responseType?: 'blob';              observe: 'response' };
type TextBody<B>             = B & { responseType?: 'text';              observe?: 'body' | undefined };
type TextEvents<B>           = B & { responseType?: 'text';              observe: 'events' };
type TextResponse<B>         = B & { responseType?: 'text';              observe: 'response' };
type JsonBody<B>             = B & { responseType?: 'json' | undefined;  observe?: 'body' | undefined };
type JsonEvents<B>           = B & { responseType?: 'json' | undefined;  observe: 'events' };
type JsonResponse<B>         = B & { responseType?: 'json' | undefined;  observe: 'response' };
type JsonTyped<B, T>         = JsonBody<B>    & { runtimeType: ZodType<T> };
type JsonEventsTyped<B, T>   = JsonEvents<B>  & { runtimeType: ZodType<T> };
type JsonResponseTyped<B, T> = JsonResponse<B> & { runtimeType: ZodType<T> };

// --- ArrayBuffer ---
export type GetArrayBufferOptions     = ArrayBufferBody<HttpGetOptionsBase>;
export type DeleteArrayBufferOptions  = ArrayBufferBody<HttpDeleteOptionsBase>;
export type HeadArrayBufferOptions    = ArrayBufferBody<HttpHeadOptionsBase>;
export type OptionsArrayBufferOptions = ArrayBufferBody<HttpOptionsOptionsBase>;
export type PatchArrayBufferOptions   = ArrayBufferBody<HttpPatchOptionsBase>;
export type PostArrayBufferOptions    = ArrayBufferBody<HttpPostOptionsBase>;
export type PutArrayBufferOptions     = ArrayBufferBody<HttpPutOptionsBase>;

export type GetArrayBufferEventsOptions     = ArrayBufferEvents<HttpGetOptionsBase>;
export type DeleteArrayBufferEventsOptions  = ArrayBufferEvents<HttpDeleteOptionsBase>;
export type HeadArrayBufferEventsOptions    = ArrayBufferEvents<HttpHeadOptionsBase>;
export type OptionsArrayBufferEventsOptions = ArrayBufferEvents<HttpOptionsOptionsBase>;
export type PatchArrayBufferEventsOptions   = ArrayBufferEvents<HttpPatchOptionsBase>;
export type PostArrayBufferEventsOptions    = ArrayBufferEvents<HttpPostOptionsBase>;
export type PutArrayBufferEventsOptions     = ArrayBufferEvents<HttpPutOptionsBase>;

export type GetArrayBufferResponseOptions     = ArrayBufferResponse<HttpGetOptionsBase>;
export type DeleteArrayBufferResponseOptions  = ArrayBufferResponse<HttpDeleteOptionsBase>;
export type HeadArrayBufferResponseOptions    = ArrayBufferResponse<HttpHeadOptionsBase>;
export type OptionsArrayBufferResponseOptions = ArrayBufferResponse<HttpOptionsOptionsBase>;
export type PatchArrayBufferResponseOptions   = ArrayBufferResponse<HttpPatchOptionsBase>;
export type PostArrayBufferResponseOptions    = ArrayBufferResponse<HttpPostOptionsBase>;
export type PutArrayBufferResponseOptions     = ArrayBufferResponse<HttpPutOptionsBase>;

// --- Blob ---
export type GetBlobOptions     = BlobBody<HttpGetOptionsBase>;
export type DeleteBlobOptions  = BlobBody<HttpDeleteOptionsBase>;
export type HeadBlobOptions    = BlobBody<HttpHeadOptionsBase>;
export type OptionsBlobOptions = BlobBody<HttpOptionsOptionsBase>;
export type PatchBlobOptions   = BlobBody<HttpPatchOptionsBase>;
export type PostBlobOptions    = BlobBody<HttpPostOptionsBase>;
export type PutBlobOptions     = BlobBody<HttpPutOptionsBase>;

export type GetBlobEventsOptions     = BlobEvents<HttpGetOptionsBase>;
export type DeleteBlobEventsOptions  = BlobEvents<HttpDeleteOptionsBase>;
export type HeadBlobEventsOptions    = BlobEvents<HttpHeadOptionsBase>;
export type OptionsBlobEventsOptions = BlobEvents<HttpOptionsOptionsBase>;
export type PatchBlobEventsOptions   = BlobEvents<HttpPatchOptionsBase>;
export type PostBlobEventsOptions    = BlobEvents<HttpPostOptionsBase>;
export type PutBlobEventsOptions     = BlobEvents<HttpPutOptionsBase>;

export type GetBlobResponseOptions     = BlobResponse<HttpGetOptionsBase>;
export type DeleteBlobResponseOptions  = BlobResponse<HttpDeleteOptionsBase>;
export type HeadBlobResponseOptions    = BlobResponse<HttpHeadOptionsBase>;
export type OptionsBlobResponseOptions = BlobResponse<HttpOptionsOptionsBase>;
export type PatchBlobResponseOptions   = BlobResponse<HttpPatchOptionsBase>;
export type PostBlobResponseOptions    = BlobResponse<HttpPostOptionsBase>;
export type PutBlobResponseOptions     = BlobResponse<HttpPutOptionsBase>;

// --- Text ---
export type GetTextOptions     = TextBody<HttpGetOptionsBase>;
export type DeleteTextOptions  = TextBody<HttpDeleteOptionsBase>;
export type HeadTextOptions    = TextBody<HttpHeadOptionsBase>;
export type OptionsTextOptions = TextBody<HttpOptionsOptionsBase>;
export type PatchTextOptions   = TextBody<HttpPatchOptionsBase>;
export type PostTextOptions    = TextBody<HttpPostOptionsBase>;
export type PutTextOptions     = TextBody<HttpPutOptionsBase>;

export type GetTextEventsOptions     = TextEvents<HttpGetOptionsBase>;
export type DeleteTextEventsOptions  = TextEvents<HttpDeleteOptionsBase>;
export type HeadTextEventsOptions    = TextEvents<HttpHeadOptionsBase>;
export type OptionsTextEventsOptions = TextEvents<HttpOptionsOptionsBase>;
export type PatchTextEventsOptions   = TextEvents<HttpPatchOptionsBase>;
export type PostTextEventsOptions    = TextEvents<HttpPostOptionsBase>;
export type PutTextEventsOptions     = TextEvents<HttpPutOptionsBase>;

export type GetTextResponseOptions     = TextResponse<HttpGetOptionsBase>;
export type DeleteTextResponseOptions  = TextResponse<HttpDeleteOptionsBase>;
export type HeadTextResponseOptions    = TextResponse<HttpHeadOptionsBase>;
export type OptionsTextResponseOptions = TextResponse<HttpOptionsOptionsBase>;
export type PatchTextResponseOptions   = TextResponse<HttpPatchOptionsBase>;
export type PostTextResponseOptions    = TextResponse<HttpPostOptionsBase>;
export type PutTextResponseOptions     = TextResponse<HttpPutOptionsBase>;

// --- Json ---
export type GetJsonOptions     = JsonBody<HttpGetOptionsBase>;
export type DeleteJsonOptions  = JsonBody<HttpDeleteOptionsBase>;
export type HeadJsonOptions    = JsonBody<HttpHeadOptionsBase>;
export type OptionsJsonOptions = JsonBody<HttpOptionsOptionsBase>;
export type PatchJsonOptions   = JsonBody<HttpPatchOptionsBase>;
export type PostJsonOptions    = JsonBody<HttpPostOptionsBase>;
export type PutJsonOptions     = JsonBody<HttpPutOptionsBase>;

export type GetJsonEventsOptions     = JsonEvents<HttpGetOptionsBase>;
export type DeleteJsonEventsOptions  = JsonEvents<HttpDeleteOptionsBase>;
export type HeadJsonEventsOptions    = JsonEvents<HttpHeadOptionsBase>;
export type OptionsJsonEventsOptions = JsonEvents<HttpOptionsOptionsBase>;
export type PatchJsonEventsOptions   = JsonEvents<HttpPatchOptionsBase>;
export type PostJsonEventsOptions    = JsonEvents<HttpPostOptionsBase>;
export type PutJsonEventsOptions     = JsonEvents<HttpPutOptionsBase>;

export type GetJsonResponseOptions     = JsonResponse<HttpGetOptionsBase>;
export type DeleteJsonResponseOptions  = JsonResponse<HttpDeleteOptionsBase>;
export type HeadJsonResponseOptions    = JsonResponse<HttpHeadOptionsBase>;
export type OptionsJsonResponseOptions = JsonResponse<HttpOptionsOptionsBase>;
export type PatchJsonResponseOptions   = JsonResponse<HttpPatchOptionsBase>;
export type PostJsonResponseOptions    = JsonResponse<HttpPostOptionsBase>;
export type PutJsonResponseOptions     = JsonResponse<HttpPutOptionsBase>;

// --- Json Typed (zod) ---
export type GetJsonTypedOptions<T>     = JsonTyped<HttpGetOptionsBase, T>;
export type DeleteJsonTypedOptions<T>  = JsonTyped<HttpDeleteOptionsBase, T>;
export type HeadJsonTypedOptions<T>    = JsonTyped<HttpHeadOptionsBase, T>;
export type OptionsJsonTypedOptions<T> = JsonTyped<HttpOptionsOptionsBase, T>;
export type PatchJsonTypedOptions<T>   = JsonTyped<HttpPatchOptionsBase, T>;
export type PostJsonTypedOptions<T>    = JsonTyped<HttpPostOptionsBase, T>;
export type PutJsonTypedOptions<T>     = JsonTyped<HttpPutOptionsBase, T>;

export type GetJsonEventsTypedOptions<T>     = JsonEventsTyped<HttpGetOptionsBase, T>;
export type DeleteJsonEventsTypedOptions<T>  = JsonEventsTyped<HttpDeleteOptionsBase, T>;
export type HeadJsonEventsTypedOptions<T>    = JsonEventsTyped<HttpHeadOptionsBase, T>;
export type OptionsJsonEventsTypedOptions<T> = JsonEventsTyped<HttpOptionsOptionsBase, T>;
export type PatchJsonEventsTypedOptions<T>   = JsonEventsTyped<HttpPatchOptionsBase, T>;
export type PostJsonEventsTypedOptions<T>    = JsonEventsTyped<HttpPostOptionsBase, T>;
export type PutJsonEventsTypedOptions<T>     = JsonEventsTyped<HttpPutOptionsBase, T>;

export type GetJsonResponseTypedOptions<T>     = JsonResponseTyped<HttpGetOptionsBase, T>;
export type DeleteJsonResponseTypedOptions<T>  = JsonResponseTyped<HttpDeleteOptionsBase, T>;
export type HeadJsonResponseTypedOptions<T>    = JsonResponseTyped<HttpHeadOptionsBase, T>;
export type OptionsJsonResponseTypedOptions<T> = JsonResponseTyped<HttpOptionsOptionsBase, T>;
export type PatchJsonResponseTypedOptions<T>   = JsonResponseTyped<HttpPatchOptionsBase, T>;
export type PostJsonResponseTypedOptions<T>    = JsonResponseTyped<HttpPostOptionsBase, T>;
export type PutJsonResponseTypedOptions<T>     = JsonResponseTyped<HttpPutOptionsBase, T>;
