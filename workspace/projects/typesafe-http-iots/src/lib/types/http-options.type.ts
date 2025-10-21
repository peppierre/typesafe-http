import * as iots from 'io-ts';
import { HttpOptionsBase } from './http-options-base.type';

// --- Generalized Body/Events/Response Options ---
type ArrayBufferBodyOptionsBase = HttpOptionsBase<'arraybuffer'> & { observe?: 'body' | undefined };
type ArrayBufferEventsOptionsBase = HttpOptionsBase<'arraybuffer'> & { observe: 'events' };
type ArrayBufferResponseOptionsBase = HttpOptionsBase<'arraybuffer'> & { observe: 'response' };
type BlobBodyOptionsBase = HttpOptionsBase<'blob'> & { observe?: 'body' | undefined };
type BlobEventsOptionsBase = HttpOptionsBase<'blob'> & { observe: 'events' };
type BlobResponseOptionsBase = HttpOptionsBase<'blob'> & { observe: 'response' };
type TextBodyOptionsBase = HttpOptionsBase<'text'> & { observe?: 'body' | undefined };
type TextEventsOptionsBase = HttpOptionsBase<'text'> & { observe: 'events' };
type TextResponseOptionsBase = HttpOptionsBase<'text'> & { observe: 'response' };
type JsonBodyOptionsBase = HttpOptionsBase<'json' | undefined> & { observe?: 'body' | undefined };
type JsonEventsOptionsBase = HttpOptionsBase<'json' | undefined> & { observe: 'events' };
type JsonResponseOptionsBase = HttpOptionsBase<'json' | undefined> & { observe: 'response' };

// --- Generalized Typed Options for Json (io-ts) ---
type JsonTypedOptionsBase<T> = JsonBodyOptionsBase & { runtimeType: iots.Type<T, unknown, unknown> };
type JsonEventsTypedOptionsBase<T> = JsonEventsOptionsBase & { runtimeType: iots.Type<T, unknown, unknown> };
type JsonResponseTypedOptionsBase<T> = JsonResponseOptionsBase & { runtimeType: iots.Type<T, unknown, unknown> };

// --- Aliases for Typed Options (Json) ---
export type GetJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type DeleteJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type HeadJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type OptionsJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type PatchJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type PostJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type PutJsonTypedOptions<T> = JsonTypedOptionsBase<T>;
export type GetJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type DeleteJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type HeadJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type OptionsJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type PatchJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type PostJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type PutJsonEventsTypedOptions<T> = JsonEventsTypedOptionsBase<T>;
export type GetJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;
export type DeleteJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;
export type HeadJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;
export type OptionsJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;
export type PatchJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;
export type PostJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;
export type PutJsonResponseTypedOptions<T> = JsonResponseTypedOptionsBase<T>;

// --- Aliases for Specific HTTP Verbs ---
// ArrayBuffer
export type GetArrayBufferOptions = ArrayBufferBodyOptionsBase;
export type DeleteArrayBufferOptions = ArrayBufferBodyOptionsBase;
export type HeadArrayBufferOptions = ArrayBufferBodyOptionsBase;
export type OptionsArrayBufferOptions = ArrayBufferBodyOptionsBase;
export type PatchArrayBufferOptions = ArrayBufferBodyOptionsBase;
export type PostArrayBufferOptions = ArrayBufferBodyOptionsBase;
export type PutArrayBufferOptions = ArrayBufferBodyOptionsBase;

// Blob
export type GetBlobOptions = BlobBodyOptionsBase;
export type DeleteBlobOptions = BlobBodyOptionsBase;
export type HeadBlobOptions = BlobBodyOptionsBase;
export type OptionsBlobOptions = BlobBodyOptionsBase;
export type PatchBlobOptions = BlobBodyOptionsBase;
export type PostBlobOptions = BlobBodyOptionsBase;
export type PutBlobOptions = BlobBodyOptionsBase;

// Text
export type GetTextOptions = TextBodyOptionsBase;
export type DeleteTextOptions = TextBodyOptionsBase;
export type HeadTextOptions = TextBodyOptionsBase;
export type OptionsTextOptions = TextBodyOptionsBase;
export type PatchTextOptions = TextBodyOptionsBase;
export type PostTextOptions = TextBodyOptionsBase;
export type PutTextOptions = TextBodyOptionsBase;

// Json
export type GetJsonOptions = JsonBodyOptionsBase;
export type DeleteJsonOptions = JsonBodyOptionsBase;
export type HeadJsonOptions = JsonBodyOptionsBase;
export type OptionsJsonOptions = JsonBodyOptionsBase;
export type PatchJsonOptions = JsonBodyOptionsBase;
export type PostJsonOptions = JsonBodyOptionsBase;
export type PutJsonOptions = JsonBodyOptionsBase;

// --- Aliases for Events/Response Options ---
// ArrayBuffer
export type GetArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type DeleteArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type HeadArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type OptionsArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type PatchArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type PostArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type PutArrayBufferEventsOptions = ArrayBufferEventsOptionsBase;
export type GetArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;
export type DeleteArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;
export type HeadArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;
export type OptionsArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;
export type PatchArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;
export type PostArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;
export type PutArrayBufferResponseOptions = ArrayBufferResponseOptionsBase;

// Blob
export type GetBlobEventsOptions = BlobEventsOptionsBase;
export type DeleteBlobEventsOptions = BlobEventsOptionsBase;
export type HeadBlobEventsOptions = BlobEventsOptionsBase;
export type OptionsBlobEventsOptions = BlobEventsOptionsBase;
export type PatchBlobEventsOptions = BlobEventsOptionsBase;
export type PostBlobEventsOptions = BlobEventsOptionsBase;
export type PutBlobEventsOptions = BlobEventsOptionsBase;
export type GetBlobResponseOptions = BlobResponseOptionsBase;
export type DeleteBlobResponseOptions = BlobResponseOptionsBase;
export type HeadBlobResponseOptions = BlobResponseOptionsBase;
export type OptionsBlobResponseOptions = BlobResponseOptionsBase;
export type PatchBlobResponseOptions = BlobResponseOptionsBase;
export type PostBlobResponseOptions = BlobResponseOptionsBase;
export type PutBlobResponseOptions = BlobResponseOptionsBase;

// Text
export type GetTextEventsOptions = TextEventsOptionsBase;
export type DeleteTextEventsOptions = TextEventsOptionsBase;
export type HeadTextEventsOptions = TextEventsOptionsBase;
export type OptionsTextEventsOptions = TextEventsOptionsBase;
export type PatchTextEventsOptions = TextEventsOptionsBase;
export type PostTextEventsOptions = TextEventsOptionsBase;
export type PutTextEventsOptions = TextEventsOptionsBase;
export type GetTextResponseOptions = TextResponseOptionsBase;
export type DeleteTextResponseOptions = TextResponseOptionsBase;
export type HeadTextResponseOptions = TextResponseOptionsBase;
export type OptionsTextResponseOptions = TextResponseOptionsBase;
export type PatchTextResponseOptions = TextResponseOptionsBase;
export type PostTextResponseOptions = TextResponseOptionsBase;
export type PutTextResponseOptions = TextResponseOptionsBase;

// Json
export type GetJsonEventsOptions = JsonEventsOptionsBase;
export type DeleteJsonEventsOptions = JsonEventsOptionsBase;
export type HeadJsonEventsOptions = JsonEventsOptionsBase;
export type OptionsJsonEventsOptions = JsonEventsOptionsBase;
export type PatchJsonEventsOptions = JsonEventsOptionsBase;
export type PostJsonEventsOptions = JsonEventsOptionsBase;
export type PutJsonEventsOptions = JsonEventsOptionsBase;
export type GetJsonResponseOptions = JsonResponseOptionsBase;
export type DeleteJsonResponseOptions = JsonResponseOptionsBase;
export type HeadJsonResponseOptions = JsonResponseOptionsBase;
export type OptionsJsonResponseOptions = JsonResponseOptionsBase;
export type PatchJsonResponseOptions = JsonResponseOptionsBase;
export type PostJsonResponseOptions = JsonResponseOptionsBase;
export type PutJsonResponseOptions = JsonResponseOptionsBase;
