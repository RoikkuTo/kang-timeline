import React, { useContext } from 'react'
import { RecordContext } from './Home'
import TimelineCard from './Timeline/Timeline'
import style from './style.module.scss'

const Text = () => {
	return (
		<div className={style.text}>
			<h1>Timeline</h1>
			<p>
				A JS Library which will allow you to manipulate the <span className="code link">window.requestAnimationFrame</span> API
			</p>
		</div>
	)
}

const CardContainer = () => {
	const [list] = useContext(RecordContext)
	return (
		<div className={style.cards}>
			{list.map((tl, idx) => (
				<TimelineCard key={tl.toString()} idx={idx} opts={{ range: tl, loop: true }} />
			))}
			{/* <TimelineCard />
			<TimelineCard opts={{ range: 10 * 60 * 1000, loop: true }} />
			<TimelineCard opts={{ range: 180000, loop: true }} />
			<TimelineCard opts={{ range: 1000 }} /> */}
		</div>
	)
}

export default function Descr() {
	return (
		<div className={style.desc}>
			<Text />
			<CardContainer />
		</div>
	)
}
