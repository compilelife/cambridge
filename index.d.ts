export function before<T, R>(obj: T, method: string, inject: (thiz: T, ...args: any)=>R): void;

export function after<T, R>(obj: T, method: string, inject: (thiz: T, result: R)=>R): void;

export function replace<T, R>(obj: T, method: string, inject: (thiz: T, ...args: any)=>R): void;

export function leave<T>(obj: T, method: string): void;
