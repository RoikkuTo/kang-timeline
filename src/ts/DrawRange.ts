import Timeline from '@lib'

export default class DrawRange {
	trackHeight: number = 35
	padW: number = 12
	border: number = 14 // 14

	timeline: Timeline

	private _canvas!: HTMLCanvasElement
	private ctx!: CanvasRenderingContext2D

	set rangeCanvas(c) {
		this._canvas = c
		this.resize()

		this.ctx = this._canvas.getContext('2d')!
	}
	get rangeCanvas() {
		return this._canvas
	}

	constructor(canvas: HTMLCanvasElement, timeline: Timeline) {
		this.timeline = timeline
		this.rangeCanvas = canvas
	}

	private clear() {
		if (this._canvas && this.ctx) {
			this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
		}
	}

	resize() {
		this._canvas.width = this._canvas.clientWidth
		this._canvas.height = this._canvas.clientHeight
	}

	point(x: number, y: number, r: number, color: string) {
		this.ctx.fillStyle = color
		this.ctx.beginPath()
		this.ctx.arc(x, y, r, 0, 2 * Math.PI)
		this.ctx.closePath()
		this.ctx.fill()
	}

	roundRect(x: number, y: number, width: number, height: number, radius: { tl: number; tr: number; bl: number; br: number }) {
		const corner: [number, number, number, number, number, number][] = [
			[x + width - radius.tr / 2, y, x + width, y + radius.tr / 2, x + width, y + radius.tr],
			[x + width, y + height - radius.br / 2, x + width - radius.br / 2, y + height, x + width - radius.br, y + height],
			[x + radius.bl / 2, y + height, x, y + height - radius.bl / 2, x, y + height - radius.bl],
			[x, y + radius.tl / 2, x + radius.tl / 2, y, x + radius.tl, y]
		]

		this.ctx.beginPath()
		this.ctx.moveTo(x + radius.tl, y)
		this.ctx.lineTo(x + width - radius.tr, y)
		this.ctx.bezierCurveTo(...corner[0])
		this.ctx.lineTo(x + width, y + height - radius.br)
		this.ctx.bezierCurveTo(...corner[1])
		this.ctx.lineTo(x + radius.bl, y + height)
		this.ctx.bezierCurveTo(...corner[2])
		this.ctx.lineTo(x, y + radius.tl)
		this.ctx.bezierCurveTo(...corner[3])
		this.ctx.closePath()
		this.ctx.fill()

		// const r = 2
		// this.point(x, y + radius.tl, r, 'red')
		// this.point(x, y + radius.tl / 2, r, 'blue')
		// this.point(x + radius.tl / 2, y, r, 'green')
		// this.point(x + radius.tl, y, r, 'red')
	}

	draw(currentTime: number) {
		this.clear()

		const top = (this._canvas.height - this.trackHeight) / 2
		const left = this.padW
		const maxWidth = this._canvas.width - left * 2
		const width = maxWidth * (currentTime / this.timeline.max!)

		const gradient = this.ctx.createLinearGradient(0, 0, width, 0)
		gradient.addColorStop(0, '#47d3ff')
		gradient.addColorStop(1, '#78fb9d')

		this.ctx.fillStyle = '#ececec'
		this.roundRect(left, top, maxWidth, this.trackHeight, {
			tl: this.border,
			tr: this.border,
			bl: this.border,
			br: this.border
		})

		this.ctx.fillStyle = gradient
		this.roundRect(left, top, width, this.trackHeight, { tl: this.border, tr: 0, bl: this.border, br: 0 })

		this.ctx.filter = 'blur(4px)'
		this.ctx.fillStyle = gradient
		this.roundRect(left, top, width, this.trackHeight, { tl: this.border, tr: 0, bl: this.border, br: 0 })
		this.ctx.filter = 'none'

		this.ctx.fillStyle = 'white'
		this.roundRect(left + width - 6, 0, 12, this._canvas.height, {
			tl: 5,
			tr: 5,
			bl: 5,
			br: 5
		})
	}
}
