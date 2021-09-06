import React, { useCallback, useEffect, useRef, useState } from 'react'
import './style.scss'

import start from '@icons/start.svg'
import stop from '@icons/stop.svg'
import restart from '@icons/restart_png_2.png'
import mini_dark_ratio_icon from '@icons/mini_dark_ratio_icon.png'
import del from '@icons/delete_cross.svg'
import Timeline from '@lib'
import ChronoTemplate from '../../Chrono/ChronoTemplate'
import Btn from '../../../Utils/Btn'
import style from './style.module.scss'
import useCanvasTimeline from '@/src/components/hooks/useCanvasTimeline'

const Speed = ({ timeline }: { timeline: Timeline }) => {
	const handleChange = useCallback(e => {
		timeline.speed = Number(e.target.value)
	}, [])

	return (
		<div className={`${style.btn} ${style.speed}`}>
			<img src={mini_dark_ratio_icon} alt="" />
			<input
				type="number"
				className={`${style.valSpeed}`}
				step="0.1"
				min="0"
				defaultValue="1.0"
				onChange={handleChange}
				onBlur={e => console.log(e.target.value)}
			/>
		</div>
	)
}

const Timestamp = ({ canvasTimeline }: { canvasTimeline: ReturnType<typeof useCanvasTimeline> }) => {
	const bool = useRef(false)

	const handleClick = () => {
		bool.current = !bool.current
		console.log('yop')
	}

	return (
		<div className="timestamp" onClick={handleClick}>
			<ChronoTemplate canvasTimeline={canvasTimeline} />
		</div>
	)
}

const Buttons = ({ canvasTimeline, deleteTl }: { canvasTimeline: ReturnType<typeof useCanvasTimeline>; deleteTl: () => void }) => {
	const idx = useRef<React.Dispatch<React.SetStateAction<number>>>(() => {})
	const { timeline } = canvasTimeline.current

	useEffect(() => {
		const listener = () => idx.current(1)
		timeline.onFinish(listener)
		return () => {
			timeline.offFinish(listener)
		}
	}, [])

	return (
		<div className="buttons">
			<div className="left-btns">
				<Btn
					style={style}
					opts={[
						{
							className: 'stop',
							icon: stop,
							callback: () => timeline.stop()
						},
						{
							className: 'start',
							icon: start,
							callback: () => {
								if (timeline.isFinished && timeline.max && timeline.currentTimestamp >= timeline.max) {
									timeline.reset().start()
								} else {
									timeline.start()
								}
							}
						}
					]}
					idx={idx}
				/>
				<Btn
					style={style}
					opts={{
						className: 'restart',
						icon: restart,
						callback: () => timeline.reset().sync[timeline.state]() // reset canvas
					}}
				/>
				<Speed timeline={timeline} />
			</div>
			<Timestamp canvasTimeline={canvasTimeline} />
			<Btn style={style} opts={{ className: 'delete', icon: del, callback: deleteTl }} />
		</div>
	)
}

export default Buttons
