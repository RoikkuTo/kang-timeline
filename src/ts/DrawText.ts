export default class DrawText {
	private _canvas: HTMLCanvasElement | null = null
	private ctx: CanvasRenderingContext2D | null = null

	set textCanvas(c) {
		if (c) {
			this._canvas = c
			this.ctx = this._canvas.getContext('2d')!
		}
	}
	get textCanvas() {
		return this._canvas
	}

	constructor(canvas?: HTMLCanvasElement) {
		this.textCanvas = canvas || null
	}

	draw(globalTime?: number, currentTime?: number) {
		console.log('vu')
	}
}
