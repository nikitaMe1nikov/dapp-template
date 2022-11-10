export type ReturnPromiseType<T> = T extends PromiseLike<infer U> ? U : T
