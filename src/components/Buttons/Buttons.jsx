import React, { useState } from 'react'
import './style.scss'

import mini_dark_pause_icon from '../../icons/mini_dark_pause_icon.png'
import mini_dark_restart_icon from '../../icons/mini_dark_restart_icon.png'
import mini_dark_ratio_icon from '../../icons/mini_dark_ratio_icon.png'
import mini_dark_delete_icon from '../../icons/mini_dark_delete_icon.png'

const SimpleToggleButton = ({ name, img }) => {
	const [bool, setBool] = useState(0)

	return (
		<div className={`button simple ${name[bool]}`} onClick={() => setBool(prev => (prev ? 0 : 1))}>
			<img src={img[bool]} alt="" />
		</div>
	)
}

const SimpleButton = ({ name, img }) => (
	<div className={`button simple ${name}`}>
		<img src={img} alt="" />
	</div>
)

const Buttons = props => {
	const time = Date.now()

	return (
		<div className="buttons">
			<SimpleToggleButton name={['play', 'pause']} img={['' /* mini_dark_play_icon */, mini_dark_pause_icon]} />
			<SimpleButton name="restart" img={mini_dark_restart_icon} />
			<div className="button ratio">
				<img src={mini_dark_ratio_icon} style={{ position: 'absolute', top: '50%', left: '8px', transform: 'translateY(-50%)' }} alt="" />
				<input type="number" className="valRatio" step="0.1" min="0" defaultValue="1.0" />
			</div>
			<div className="timestamp">
				<div>
					<span>time.getUTCMinute()</span>
					<span className="column">:</span>
					<span>00</span>
					<span className="column">:</span>
					<span>00.000</span>
				</div>
			</div>
			<SimpleButton name="delete" img={mini_dark_delete_icon} />
		</div>
	)
}

export default Buttons
