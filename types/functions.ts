type modelFunction<T> = (arg: T) => Promise<any>;

export type objFunct = modelFunction<object>;
export type strFunct = modelFunction<string>;

type modelTwoArgFunction<I, R> = (arg1: I, arg2: R) => Promise<any>;

export type strTwoArgFunct = modelTwoArgFunction<string, string>;