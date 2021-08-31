import React from 'react'
import TimelineCard from '../Timeline/Timeline'

export default function Descr() {
	return (
		<div style={{ display: 'grid', gap: '10px' }}>
			<TimelineCard />
			<TimelineCard opts={{ range: 10 * 60 * 1000, loop: true }} />
			<TimelineCard opts={{ range: 180000, loop: true }} />
			<TimelineCard opts={{ range: 1000 }} />
		</div>
	)
}
