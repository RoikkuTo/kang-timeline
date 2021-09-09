export default class DrawText {
	fontSize: string = ''
	columnColor: string = ''

	private _canvas: HTMLCanvasElement | null = null
	private ctx: CanvasRenderingContext2D | null = null
	private gap = 10
	private currTextPos = 0
	private textHeight = 0

	set textCanvas(c) {
		if (c) {
			this._canvas = c
			this._canvas.width = this._canvas.clientWidth
			this._canvas.height = parseFloat(this.fontSize)
			this.ctx = this._canvas.getContext('2d')!
			this.draw(0, 0)
		}
	}
	get textCanvas() {
		return this._canvas
	}

	static convert(currentTime: number) {
		const t = new Date(currentTime).toJSON()
		const regex = /.*T(.*)Z/
		const match = regex.exec(t)
		return match?.[1].split(':') || ['--', '--', '--']
	}

	constructor(canvas?: HTMLCanvasElement, fontSize?: string, columnColor?: string) {
		if (fontSize) {
			const m = fontSize.match(/^[-]?(\d+([.]\d+)?)(rem|vw|vh)$/) || '30px'
			const [, val, , unit] = m

			switch (unit) {
				case 'rem':
					this.fontSize =
						(Number(val) * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('font-size')) || '30') + 'px'
					break

				case 'vw':
					this.fontSize = Number(val) * window.innerWidth + 'px'
					break

				case 'vh':
					this.fontSize = Number(val) * window.innerHeight + 'px'
					break

				default:
					this.fontSize = fontSize
					break
			}
		}

		this.columnColor = columnColor || '#aeaeae'
		this.textCanvas = canvas || null
	}

	private cursor(str: string) {
		if (this.ctx) this.currTextPos = this.currTextPos + this.ctx.measureText(str).width + this.gap
	}

	private clear() {
		if (this._canvas && this.ctx) {
			this.currTextPos = 0
			this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
		}
	}

	draw(globalTime: number, currentTime: number) {
		this.clear()
		if (this._canvas && this.ctx) {
			const time = DrawText.convert(currentTime)
			this.ctx.font = `${this.fontSize} "Libre Baskerville"`
			this.textHeight = this.ctx.measureText('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789').fontBoundingBoxAscent

			this.ctx.fillStyle = 'black'
			this.ctx.fillText(time[0], 0, this.textHeight)

			this.ctx.fillStyle = this.columnColor
			this.cursor(time[0])
			this.ctx.fillText(':', this.currTextPos, this.textHeight)

			this.ctx.fillStyle = 'black'
			this.cursor(':')
			this.ctx.fillText(time[1], this.currTextPos, this.textHeight)

			this.ctx.fillStyle = this.columnColor
			this.cursor(time[0])
			this.ctx.fillText(':', this.currTextPos, this.textHeight)

			this.ctx.fillStyle = 'black'
			this.cursor(':')
			this.ctx.fillText(time[2], this.currTextPos, this.textHeight)
		}
	}
}
