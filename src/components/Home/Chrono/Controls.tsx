import Timeline from '@lib'
import React, { useContext, useRef } from 'react'
import Btn from '../../Utils/Btn'
import start from '@icons/start.svg'
import stop from '@icons/stop.svg'
import restart from '@icons/restart_png_2.png'
import record from '@icons/record.svg'

import style from './style.module.scss'
import { RecordContext } from '../Home'

export default function Controls({ state, timeline }: { state: [number, (nextVal: number) => void]; timeline: Timeline }) {
	const [, addTimeline] = useContext(RecordContext)
	const minRange = useRef(0)

	return (
		<div className={style.controls}>
			{' '}
			<Btn
				style={style}
				opts={[
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
					},
					{
						className: 'stop',
						icon: stop,
						callback: () => timeline.stop()
					}
				]}
			/>
			<Btn
				style={style}
				opts={{
					className: 'restart',
					icon: restart,
					callback: () => {
						timeline.reset()[timeline.state](0, () => state[1](0))
					}
				}}
			/>
			<Btn
				style={style}
				opts={[
					{
						className: 'record',
						icon: record,
						callback: () => (minRange.current = state[0])
					},
					{
						className: 'record',
						icon: record,
						callback: () => addTimeline(minRange.current, state[0])
					}
				]}
			/>
		</div>
	)
}
