import React, { useEffect, useState } from 'react'
import Buttons from '../Buttons/Buttons'
import Range from '../Range/Range'

import Timeline from '@lib'

import './style.scss'

const timeline = new Timeline({ loop: 3600 * 1000 })

const TimelineCard = () => {
	const [val, setVal] = useState(0)

	useEffect(() => {
		timeline.setTask({
			frequency: 100,
			run: ({ currentTime }) => setVal(currentTime)
		})
		timeline.start()
		return () => {
			timeline.delete()
		}
	}, [])

	return (
		<div className="timeline">
			<Buttons state={[val, setVal]} timeline={timeline} />
			<Range state={[val, setVal]} timeline={timeline} />
		</div>
	)
}

export default TimelineCard
