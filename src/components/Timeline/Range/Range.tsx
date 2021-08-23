import Timeline from '@/dist/Timeline'
import React, { useEffect, useCallback, useState, useRef } from 'react'
import './style.scss'

const Track = ({ ratio }: { ratio: number }) => {
	return (
		<div className="track">
			<div className="runnable" style={{ width: `${ratio * 100}%` }}></div>
		</div>
	)
}

const Range = ({ state, timeline }: { state: [number, React.Dispatch<React.SetStateAction<number>>]; timeline: Timeline }) => {
	const [timestamp] = state
	const node = useRef<HTMLDivElement>(null)
	const active = useRef(false)
	const prevTState = useRef<Timeline['state']>('stop')
	const [ratio, setRatio] = useState(0)

	const calc = useCallback(e => {
		if (node.current) {
			const rect = node.current.getBoundingClientRect()
			const x = e.clientX
			const ratio = Number((x - rect.x) / rect.width)
			if (ratio >= 0 && ratio <= 1) setRatio(ratio)
		}
	}, [])

	const handleMouseDown = useCallback(e => {
		timeline.stop()
		prevTState.current = timeline.state
		active.current = true
		calc(e)
	}, [])

	useEffect(() => {
		window.onmousemove = e => {
			if (active.current) calc(e)
		}
		return () => {
			window.onmousemove = null
		}
	}, [])

	useEffect(() => {
		window.onmouseup = () => {
			if (active.current) {
				active.current = false
				timeline[prevTState.current]()
				timeline.setTimestamp(Math.round(ratio * timeline.max!))
			}
		}
		return () => {
			window.onmouseup = null
		}
	}, [ratio])

	return (
		<div ref={node} className="range" onMouseDown={handleMouseDown}>
			<Track ratio={active.current ? ratio : timestamp / timeline.max!} />
		</div>
	)
}

export default Range
