import React from 'react'
import TimelineCard from './Timeline/Timeline'

const Text = () => {
	return (
		<div>
			<h1>Timeline</h1>
			<p>
				A JS Library which will allow you to manipulate the <span className="code link">window.requestAnimationFrame</span> API
			</p>
		</div>
	)
}

const CardContainer = () => {
	return (
		<div style={{ display: 'grid', gap: '10px' }}>
			<TimelineCard />
			<TimelineCard opts={{ range: 10 * 60 * 1000, loop: true }} />
			<TimelineCard opts={{ range: 180000, loop: true }} />
			<TimelineCard opts={{ range: 1000 }} />
		</div>
	)
}

export default function Descr() {
	return (
		<div>
			<Text />
			<CardContainer />
		</div>
	)
}
