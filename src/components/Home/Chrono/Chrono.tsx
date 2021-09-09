import React, { useCallback, useState } from 'react'
import ChronoTemplate from './ChronoTemplate'
import Controls from './Controls'
import style from './style.module.scss'
import useCanvasTimeline from '../../hooks/useCanvasTimeline'

export default function Chrono() {
	const canvasTimeline1 = useCanvasTimeline(undefined, true)
	const canvasTimeline2 = useCanvasTimeline()

	return (
		<div className={style.chrono}>
			<div className={style.container}>
				<div className={style.provider}>
					<ChronoTemplate canvasTimeline={canvasTimeline1} fontSize="2.5rem" />
				</div>
				<div className={style.main}>
					<ChronoTemplate canvasTimeline={canvasTimeline2} fontSize="8rem" columnColor="#e2e2e2" />
				</div>
				<Controls canvasText={canvasTimeline2} />
			</div>
		</div>
	)
}
