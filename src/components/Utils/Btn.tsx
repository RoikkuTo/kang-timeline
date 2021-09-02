import React, { useCallback, useEffect, useState } from 'react'
import Timeline from '@lib'

interface toggleBtnOpts {
	className: string
	icon: any
	callback: Timeline['start'] | Timeline['stop'] | ((...params: any[]) => void)
}

export default function Btn({
	opts,
	idx,
	style
}: {
	opts: toggleBtnOpts | toggleBtnOpts[]
	idx?: React.MutableRefObject<React.Dispatch<React.SetStateAction<number>>>
	style: obj
}) {
	const [n, setN] = useState(0)

	const handleClick = useCallback(() => {
		if (Array.isArray(opts)) {
			opts[n].callback()
			opts.length > 1 && setN(prev => (prev === opts.length - 1 ? 0 : prev + 1))
		} else {
			opts.callback()
		}
	}, [n, opts])

	useEffect(() => {
		if (idx) idx.current = setN
	}, [])

	return (
		<div className={`${style.btn} ${style.simple} ${Array.isArray(opts) ? opts[n].className : opts.className}`} onClick={handleClick}>
			<img src={Array.isArray(opts) ? opts[n].icon : opts.icon} alt="" />
		</div>
	)
}
