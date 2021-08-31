type PromiseExecutor = (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void

interface obj {
	[key: string]: any
}

interface Tobj<T> {
	[key: string]: T
}
