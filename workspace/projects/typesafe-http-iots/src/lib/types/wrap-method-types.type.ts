import { HttpClient } from '@angular/common/http';
import { WrapOverloads } from './wrap-overloads.type';

type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type WrappedGet = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.get>
>;
export type WrappedPost = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.post>
>;
export type WrappedPut = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.put>
>;
export type WrappedPatch = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.patch>
>;
export type WrappedDelete = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.delete>
>;
export type WrappedHead = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.head>
>;
export type WrappedOptions = UnionToIntersection<
  WrapOverloads<typeof HttpClient.prototype.options>
>;
