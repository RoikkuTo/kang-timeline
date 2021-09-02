import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Buttons from './Buttons/Buttons'
import Range from './Range/Range'

import Timeline, { TimelineOpts } from '@lib'

import style from './style.module.scss'
import PopAnim from './PopAnim/PopAnim'
import { RecordContext } from '../Home'

const TimelineCard = ({ idx, opts }: { idx: number; opts?: TimelineOpts }) => {
	const [, , removeTimeline] = useContext(RecordContext)
	const [val, setVal] = useState(0)
	const [visible, setVisible] = useState(true)
	const timeline = useRef(new Timeline(opts || { range: 60000, loop: true }))

	const deleteTl = useCallback(() => {
		timeline.current.delete()
		setVisible(false)
		setTimeout(() => removeTimeline(idx), 250)
	}, [idx])

	useEffect(() => {
		timeline.current.task = {
			frequency: 100,
			run: ({ currentTime }) => setVal(currentTime)
		}
		timeline.current.start()
		return () => {
			timeline.current.delete()
		}
	}, [])

	return (
		<PopAnim visible={visible}>
			<div className={style.container}>
				<Buttons state={[val, setVal]} timeline={timeline.current} deleteTl={deleteTl} />
				<Range state={[val, setVal]} timeline={timeline.current} />
			</div>
		</PopAnim>
	)
}

export default TimelineCard
