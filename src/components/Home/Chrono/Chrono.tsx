import React, { useCallback, useState } from 'react'
import ChronoTemplate from './ChronoTemplate'
import Controls from './Controls'
import style from './style.module.scss'
import useCanvasTimeline from '../../hooks/useCanvasTimeline'

export default function Chrono() {
	const canvasText = useCanvasTimeline()

	return (
		<div className={style.chrono}>
			<div className={style.container}>
				<div className={style.provider}>
					<ChronoTemplate canvasTimeline={canvasText} />
				</div>
				<div className={style.main}>
					<ChronoTemplate canvasTimeline={canvasText} />
				</div>
				<Controls canvasText={canvasText} />
			</div>
		</div>
	)
}
