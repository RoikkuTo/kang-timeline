import React, { useCallback, useContext, useState } from 'react'
import Chrono from './Chrono/Chrono'
import Descr from './Descr'
import style from './style.module.scss'

export const RecordContext = React.createContext<[[number, number][], (minRange: number, maxRange: number) => void]>([[], () => null])

export default function Home() {
	const [timelineList, setTimelineList] = useState<[number, number][]>([])

	const addTimeline = useCallback((minRange, maxRange) => {
		setTimelineList(prev => [...prev, [minRange, maxRange]])
	}, [])

	return (
		<RecordContext.Provider value={[timelineList, addTimeline]}>
			<div className={style.home}>
				<Chrono />
				<Descr />
			</div>
		</RecordContext.Provider>
	)
}
