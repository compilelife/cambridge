export function before<T, R>(obj: { new (): T }, method: string, inject: (thiz: T, ...args: any)=>R): void;
export function before<T, R>(obj: T, method: keyof T, inject: (thiz: T, ...args: any)=>R): void;

export function after<T, R>(obj: { new (): T }, method: string, inject: (thiz: T, ...args: any)=>R): void;
export function after<T, R>(obj: T, method: keyof T, inject: (thiz: T, ...args: any)=>R): void;

export function replace<T, R>(obj: { new (): T }, method: string, inject: (thiz: T, ...args: any)=>R): void;
export function replace<T, R>(obj: T, method: keyof T, inject: (thiz: T, ...args: any)=>R): void;

