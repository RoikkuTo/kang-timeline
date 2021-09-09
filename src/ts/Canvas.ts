import Timeline, { TimelineOpts } from '@lib'
import DrawText from './DrawText'
import DrawRange from './DrawRange'

export default class Canvas {
	private _timeline: Timeline
	private _textCanvas: DrawText | null = null
	private _rangeCanvas: DrawRange | null = null

	set timeline(tl) {
		this._timeline = tl
	}
	get timeline() {
		return this._timeline
	}

	setTextCanvas(c: HTMLCanvasElement, fontSize?: string, columnColor?: string) {
		this._textCanvas = new DrawText(c, fontSize, columnColor)
	}
	get textCanvas() {
		return this._textCanvas
	}

	setRangeCanvas(c: HTMLCanvasElement) {
		this._rangeCanvas = new DrawRange(c)
	}
	get rangeCanvas() {
		return this._rangeCanvas
	}

	constructor(opts?: TimelineOpts, autoplay?: boolean) {
		this._timeline = new Timeline({
			...opts,
			task: ({ globalTime, currentTime }) => {
				this.textCanvas?.draw(globalTime, currentTime)
				this.rangeCanvas?.draw(globalTime, currentTime)
			}
		})
		console.log(autoplay)
		if (autoplay) this._timeline.sync.start()
	}
}