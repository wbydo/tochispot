type ReturnTypes<Module> = {
  [F in keyof Module]: Module[F] extends (...arg: any[]) => any ?
                   ReturnType<Module[F]> :
                   never;
};

type MapToUnion<T> = T extends {[K in keyof T]: infer U} ? U : never;
export type Action<T> = MapToUnion<ReturnTypes<T>>;
