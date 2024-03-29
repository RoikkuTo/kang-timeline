import React, { useCallback, useState } from 'react'
import Chrono from './Chrono/Chrono'
import Descr from './Descr'
import style from './style.module.scss'

interface Ctx {
	timelineList: [number, number][]
	addTimeline: (minRange: number, maxRange: number) => void
	removeTimeline: (idx: number) => void
}

export const RecordContext = React.createContext<Ctx>({
	timelineList: [],
	addTimeline: () => {},
	removeTimeline: () => {}
})

export default function Home() {
	const [timelineList, setTimelineList] = useState<[number, number][]>([[0, 5000]])

	const addTimeline = useCallback((minRange: number, maxRange: number) => {
		if (minRange !== 0 && maxRange !== 0) setTimelineList(prev => [...prev, [minRange, maxRange]])
	}, [])

	const removeTimeline = useCallback((idx: number) => {
		setTimelineList(prev => {
			const tmp = [...prev]
			tmp.splice(idx, 1)
			return tmp
		})
	}, [])

	return (
		<RecordContext.Provider value={{ timelineList, addTimeline, removeTimeline }}>
			<div className={style.home}>
				<Chrono />
				<Descr />
			</div>
		</RecordContext.Provider>
	)
}
