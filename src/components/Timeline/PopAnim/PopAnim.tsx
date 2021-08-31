import React, { useEffect, useRef, useState } from 'react'

import style from './style.module.scss'

export default function PopAnim({ visible, children }: { visible: boolean; children: React.ReactChild }) {
	const [visibleStyle, setVS] = useState<React.CSSProperties>({})
	const node = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setVS({ height: node.current!.clientHeight + 'px' })
	}, [])

	useEffect(() => {
		if (!visible) {
			setVS({ height: 0, opacity: 0 })
		}
	}, [visible])

	return (
		<div ref={node} className={style.popanim} style={visibleStyle}>
			{children}
		</div>
	)
}
