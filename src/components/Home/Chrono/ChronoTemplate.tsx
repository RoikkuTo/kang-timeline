import React, { useEffect, useRef } from 'react'
import useCanvasTimeline from '../../hooks/useCanvasTimeline'

export default function ChronoTemplate({ canvasTimeline }: { canvasTimeline: ReturnType<typeof useCanvasTimeline> }) {
	// const convert = useCallback((currentTime: number) => {
	// 	const t = new Date(currentTime).toJSON()
	// 	const regex = /.*T(.*)Z/
	// 	const match = regex.exec(t)
	// 	return match?.[1].split(':') || ['--', '--', '--']
	// }, [])

	// const str = convert(timestamp)

	// return (
	// 	<div className={style['chrono-template']}>
	// 		<span>{str[0]}</span>
	// 		<span className={style.column}>:</span>
	// 		<span>{str[1]}</span>
	// 		<span className={style.column}>:</span>
	// 		<span>{str[2]}</span>
	// 	</div>
	// )
	const canvas = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		canvasTimeline.current.setTextCanvas(canvas.current!)
	}, [])

	return <canvas ref={canvas} />
}
