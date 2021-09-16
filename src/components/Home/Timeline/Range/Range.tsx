import Timeline from '@/dist/Timeline'
import useCanvasTimeline from '@/src/components/hooks/useCanvasTimeline'
import React, { useEffect, useCallback, useState, useRef } from 'react'
import './style.scss'

const Track = ({ ratio }: { ratio: number }) => {
	return (
		<div className="track">
			<div className="runnable" style={{ width: `${ratio * 100}%` }}></div>
		</div>
	)
}

const Range = ({ canvasTimeline }: { canvasTimeline: ReturnType<typeof useCanvasTimeline> }) => {
	// const [timestamp] = state
	// const node = useRef<HTMLDivElement>(null)
	const active = useRef(false)
	const prevTState = useRef<Timeline['state']>(canvasTimeline.current.timeline.state)
	// const [ratio, setRatio] = useState(0)
	//
	// useEffect(() => {
	// 	window.onmouseup = () => {
	// 		if (active.current) {
	// 			active.current = false
	// 			timeline[prevTState.current]()
	// 			timeline.setTimestamp(Math.round(ratio * (timeline.max! - timeline.min)))
	// 		}
	// 	}
	// 	return () => {
	// 		window.onmouseup = null
	// 	}
	// }, [ratio])
	// return (
	// 	<div ref={node} className="range" onMouseDown={handleMouseDown}>
	// 		<Track ratio={active.current ? ratio : (timestamp - timeline.min) / (timeline.max! - timeline.min)} />
	// 	</div>
	// )
	const canvas = useRef<HTMLCanvasElement>(null)

	const handleMouseDown = useCallback(e => {
		prevTState.current = canvasTimeline.current.timeline.state
		canvasTimeline.current.timeline.sync.stop()
		active.current = true
		canvasTimeline.current.slideTimeline(e.clientX)
	}, [])

	useEffect(() => {
		canvasTimeline.current.setRangeCanvas(canvas.current!)

		window.onmousemove = e => {
			if (active.current) canvasTimeline.current.slideTimeline(e.clientX)
		}

		window.onmouseup = () => {
			if (active.current) {
				active.current = false
				canvasTimeline.current.timeline.sync[prevTState.current]()
			}
		}

		return () => {
			window.onmousemove = null
			window.onmouseup = null
		}
	}, [])

	return (
		<div className="range" onMouseDown={handleMouseDown}>
			{/* <Track ratio={active.current ? ratio : (timestamp - timeline.min) / (timeline.max! - timeline.min)} /> */}
			<canvas ref={canvas} />
		</div>
	)
}

export default Range
