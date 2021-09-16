import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import { TimelineOpts } from '@lib'
import Buttons from './Buttons/Buttons'
import Range from './Range/Range'
import PopAnimStatic from './PopAnim/PopAnimStatic'
import { RecordContext } from '../Home'
import useCanvasTimeline from '../../hooks/useCanvasTimeline'

const TimelineCard = ({ idx, opts }: { idx: number; opts?: TimelineOpts }) => {
	const { removeTimeline } = useContext(RecordContext)
	const [visible, setVisible] = useState(true)
	const canvasTimeline = useCanvasTimeline(opts, true)

	const deleteTl = useCallback(() => {
		canvasTimeline.current.timeline.delete()
		setVisible(false)
		setTimeout(() => removeTimeline(idx), 300)
	}, [idx])

	return (
		<PopAnimStatic visible={visible}>
			<div className={style.container}>
				<Buttons canvasTimeline={canvasTimeline} deleteTl={deleteTl} />
				<Range canvasTimeline={canvasTimeline} />
			</div>
		</PopAnimStatic>
	)
}

export default TimelineCard
