import React, { useEffect, useRef, useState } from 'react'

import style from './style.module.scss'

export default function PopAnimStatic({ visible, children }: { visible: boolean; children: React.ReactChild }) {
	return <div className={`${style.popanim} ${visible ? style.visible : style.hidden}`}>{children}</div>
}
