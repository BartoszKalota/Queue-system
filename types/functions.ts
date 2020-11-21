type modelFunction<T> = (arg: T) => Promise<any>;

export type objFunct = modelFunction<object>;
export type strFunct = modelFunction<string>;