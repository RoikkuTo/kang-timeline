import React, { useCallback, useEffect, useRef, useState } from 'react'
import ChronoTemplate from './ChronoTemplate'
import Controls from './Controls'

import Timeline from '@lib'

import style from './style.module.scss'

export default function Chrono() {
	const [[globalTime, currentTime], setVal] = useState([0, 0])
	const timeProvider = useRef(new Timeline())
	const timeline = useRef(new Timeline())

	const setNextVal = useCallback((nextVal: number) => {
		setVal(prev => [globalTime, nextVal])
	}, [])

	useEffect(() => {
		timeProvider.current.task = {
			frequency: 100,
			run: ({ globalTime }) => setVal(prev => [globalTime, prev[1]])
		}
		timeline.current.task = {
			frequency: 100,
			run: ({ currentTime }) => setVal(prev => [prev[0], currentTime])
		}
		timeProvider.current.start()
		return () => {
			timeProvider.current.delete()
			timeline.current.delete()
		}
	}, [])

	return (
		<div className={style.chrono}>
			<div className={style.container}>
				<div className={style.provider}>
					<ChronoTemplate timestamp={globalTime} />
				</div>
				<div className={style.main}>
					<ChronoTemplate timestamp={currentTime} />
				</div>
				<Controls state={[currentTime, setNextVal]} timeline={timeline.current} />
			</div>
		</div>
	)
}
