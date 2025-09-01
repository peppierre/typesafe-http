import { ZodType } from 'zod';
import { HttpClientOverloads } from './http-client-overloads.type';
import { Observable } from 'rxjs';

// Add runtimeType as first parameter
type WrapOverload<T extends unknown[], R> = <R>( // eslint-disable-line @typescript-eslint/no-unused-vars
  ...args: [runtimeType: ZodType<R>, ...params: T]
) => Observable<R>;

// Final dynamic overload union
export type WrapOverloads<T> = HttpClientOverloads<T> extends infer O
  ? O extends [infer Args extends unknown[], infer R]
    ? WrapOverload<Args, R>
    : never
  : never;
