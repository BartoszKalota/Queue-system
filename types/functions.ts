type agentModelFunction<T> = (arg: T) => Promise<any>;

export type objFunct = agentModelFunction<object>;
export type strFunct = agentModelFunction<string>;