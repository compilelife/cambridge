export function before<T, R>(obj: { new (): T }, method: string, inject: (thiz: T, ...args: any)=>R): void;
export function before<T, R>(obj: T, method: keyof T, inject: (thiz: T, ...args: any)=>R): void;

export function after<T, R>(obj: { new (): T }, method: string, inject: (thiz: T, result: R)=>R): void;
export function after<T, R>(obj: T, method: keyof T, inject: (thiz: T, result: R)=>R): void;

export function replace<T, R>(obj: { new (): T }, method: string, inject: (thiz: T, ...args: any)=>R): void;
export function replace<T, R>(obj: T, method: keyof T, inject: (thiz: T, ...args: any)=>R): void;

export function leave<T>(obj: { new (): T }, method: string): void;
export function leave<T>(obj: T, method: keyof T): void;
