import { useRef } from 'react'
import Canvas from '@/src/ts/Canvas'
import { TimelineOpts } from '@lib'

export default function useCanvasTimeline(opts?: TimelineOpts, autoplay?: boolean) {
	const canvasText = useRef<Canvas>(new Canvas(opts, autoplay))
	return canvasText
}
