import React, { useContext, useRef } from 'react'
import style from './style.module.scss'
import Btn from '../../Utils/Btn'
import start from '@icons/start.svg'
import stop from '@icons/stop.svg'
import restart from '@icons/restart_png_2.png'
import record from '@icons/record.svg'
import useCanvasTimeline from '../../hooks/useCanvasTimeline'
import { RecordContext } from '../Home'

export default function Controls({ canvasText }: { canvasText: ReturnType<typeof useCanvasTimeline> }) {
	const { addTimeline } = useContext(RecordContext)
	const minRange = useRef(0)
	const { timeline } = canvasText.current

	return (
		<div className={style.controls}>
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
						timeline.reset().sync[timeline.state]() // reset canvas
					}
				}}
			/>
			<Btn
				style={style}
				opts={[
					{
						className: 'record inactive',
						icon: record,
						callback: () => (minRange.current = timeline.currentTimestamp)
					},
					{
						className: 'record',
						icon: record,
						callback: () => addTimeline(minRange.current, timeline.currentTimestamp)
					}
				]}
			/>
		</div>
	)
}
