import React, { useCallback, useEffect, useRef, useState } from 'react'
import './style.scss'

import start from '@icons/start.svg'
import stop from '@icons/stop.svg'
import restart from '@icons/restart_png_2.png'
import mini_dark_ratio_icon from '@icons/mini_dark_ratio_icon.png'
import del from '@icons/delete_cross.svg'
import Timeline from '@/dist/Timeline'

interface toggleBtnOpts {
	className: string
	icon: any
	callback: Timeline['start'] | Timeline['stop'] | ((...params: any[]) => void)
}

const Btn = ({
	opts,
	idx
}: {
	opts: toggleBtnOpts | toggleBtnOpts[]
	idx?: React.MutableRefObject<React.Dispatch<React.SetStateAction<number>>>
}) => {
	const [n, setN] = useState(0)

	const handleClick = useCallback(() => {
		if (Array.isArray(opts)) {
			opts[n].callback()
			opts.length > 1 && setN(prev => (prev === opts.length - 1 ? 0 : prev++))
		} else {
			opts.callback()
		}
	}, [n, opts])

	useEffect(() => {
		if (idx) idx.current = setN
	}, [])

	return (
		<div className={`button simple ${Array.isArray(opts) ? opts[n].className : opts.className}`} onClick={handleClick}>
			<img src={Array.isArray(opts) ? opts[n].icon : opts.icon} alt="" />
		</div>
	)
}

const Speed = ({ timeline }: { timeline: Timeline }) => {
	const handleChange = useCallback(e => {
		timeline.speed = Number(e.target.value)
	}, [])

	return (
		<div className="button speed">
			<img src={mini_dark_ratio_icon} alt="" />
			<input
				type="number"
				className="valSpeed"
				step="0.1"
				min="0"
				defaultValue="1.0"
				onChange={handleChange}
				onBlur={e => console.log(e.target.value)}
			/>
		</div>
	)
}

const Timestamp = ({ timestamp }: { timestamp: number }) => {
	const bool = useRef(false)
	const temp = useRef(0)

	const convert = useCallback((currentTime: number) => {
		const t = new Date(currentTime).toJSON()
		const regex = /.*T(.*)Z/
		const match = regex.exec(t)
		return match?.[1].split(':') || ['--', '--', '--']
	}, [])

	const handleClick = useCallback(() => {
		bool.current = !bool.current
		temp.current = timestamp
	}, [timestamp])

	const str = convert(bool.current ? temp.current : timestamp)

	return (
		<div className="timestamp" onClick={handleClick}>
			<div>
				<span>{str[0]}</span>
				<span className="column">:</span>
				<span>{str[1]}</span>
				<span className="column">:</span>
				<span>{str[2]}</span>
			</div>
		</div>
	)
}

const Buttons = ({
	state,
	timeline,
	deleteTl
}: {
	state: [number, React.Dispatch<React.SetStateAction<number>>]
	timeline: Timeline
	deleteTl: () => void
}) => {
	const idx = useRef<React.Dispatch<React.SetStateAction<number>>>(() => {})

	useEffect(() => {
		const listener = () => idx.current(1)
		timeline.onFinish(listener)
		return () => {
			timeline.offFinish(listener)
		}
	}, [])

	return (
		<div className="buttons">
			<div className="left-btns">
				<Btn
					opts={[
						{
							className: 'stop',
							icon: stop,
							callback: () => timeline.stop()
						},
						{
							className: 'start',
							icon: start,
							callback: () => {
								if (timeline.isFinished) {
									timeline.reset().start()
								} else {
									timeline.start()
								}
							}
						}
					]}
					idx={idx}
				/>
				<Btn
					opts={{
						className: 'restart',
						icon: restart,
						callback: () => timeline.reset()[timeline.state](0, () => state[1](0))
					}}
				/>
				<Speed timeline={timeline} />
			</div>
			<Timestamp timestamp={state[0]} />
			<Btn opts={{ className: 'delete', icon: del, callback: deleteTl }} />
		</div>
	)
}

export default Buttons
