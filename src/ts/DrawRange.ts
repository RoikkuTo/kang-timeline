export default class DrawRange {
	private _canvas: HTMLCanvasElement | null = null
	private ctx: CanvasRenderingContext2D | null = null

	set rangeCanvas(c) {
		if (c) {
			this._canvas = c
			this.ctx = this._canvas.getContext('2d')!
		}
	}
	get rangeCanvas() {
		return this._canvas
	}

	constructor(canvas?: HTMLCanvasElement) {
		this.rangeCanvas = canvas || null
	}

	draw(globalTime?: number, currentTime?: number) {
		console.log('vu')
	}
}
