/**
 * # UniqueProps<Target, Exclude>
 *
 * @description
 * {Target1}과 {Target2} 사이에 공통된 속성들을 제거합니다.
 *
 * @example```ts
 * // Sample은 { hello1: string } 타입이 됨
 * type Sample = UniqueProps<{ hello1: string; hello2: string; }, { hello2: string }>
 * ```
 */
declare type UniqueProps<Target1, Target2> = {
  [K in Exclude<keyof Target1, keyof Target2>]: Target1[K];
};
