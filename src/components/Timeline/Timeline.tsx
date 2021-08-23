import React, { useEffect, useRef, useState } from 'react'
import Buttons from './Buttons/Buttons'
import Range from './Range/Range'

import Timeline, { TimelineOpts } from '@lib'

import './style.scss'

const TimelineCard = ({ opts }: { opts?: TimelineOpts }) => {
	const [val, setVal] = useState(0)
	const timeline = useRef(new Timeline(opts || { range: 60000, loop: true }))

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
		<div className="timeline">
			<Buttons state={[val, setVal]} timeline={timeline.current} />
			<Range state={[val, setVal]} timeline={timeline.current} />
		</div>
	)
}

export default TimelineCard
