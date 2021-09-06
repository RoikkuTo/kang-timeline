import { useRef } from 'react'
import Canvas from '@/src/ts/Canvas'
import { TimelineOpts } from '@lib'

export default function useCanvasTimeline(opts?: TimelineOpts) {
	const canvasText = useRef<Canvas>(new Canvas(opts))
	return canvasText
}
