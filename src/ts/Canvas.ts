import Timeline, { TimelineOpts } from '@lib'
import DrawText from './DrawText'
import DrawRange from './DrawRange'

export default class Canvas {
	private _timeline: Timeline
	private _textCanvas: DrawText | null = null
	private _rangeCanvas: DrawRange | null = null

	private ratio: number = 0

	set timeline(tl) {
		this._timeline = tl
	}
	get timeline() {
		return this._timeline
	}

	setTextCanvas(c: HTMLCanvasElement, fontSize?: string, columnColor?: string) {
		this._textCanvas = new DrawText(c, this._timeline, fontSize, columnColor)
	}
	get textCanvas() {
		return this._textCanvas
	}

	setRangeCanvas(c: HTMLCanvasElement) {
		this._rangeCanvas = new DrawRange(c, this._timeline)
	}
	get rangeCanvas() {
		return this._rangeCanvas
	}

	constructor(opts?: TimelineOpts, autoplay?: boolean) {
		this._timeline = new Timeline({
			...opts,
			task: ({ currentTime }) => {
				this.textCanvas?.draw(currentTime)
				this.rangeCanvas?.draw(currentTime)
			}
		})
		if (autoplay) this._timeline.sync.start()
	}

	slideTimeline(posX: number) {
		if (this._rangeCanvas) {
			const rect = this._rangeCanvas.rangeCanvas.getBoundingClientRect()
			const ratio = Number((posX - rect.x) / rect.width)

			if (ratio >= 0 && ratio <= 1) this.ratio = ratio

			const targetTimstamp = this.ratio * (this._timeline.max! - this._timeline.min)

			this.textCanvas?.draw(targetTimstamp)
			this.rangeCanvas?.draw(targetTimstamp)

			this._timeline.setTimestamp(targetTimstamp)
		}
	}
}
