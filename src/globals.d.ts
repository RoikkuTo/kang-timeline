declare module '*.scss'
declare module '*.png'
declare module '*.svg'

interface obj {
	[key: string]: any
}

interface Tobj<T> {
	[key: string]: T
}
