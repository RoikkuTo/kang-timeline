import React, { useState } from 'react'
import Buttons from '../Buttons/Buttons'
import Range from '../Range/Range'

import './style.scss'


const Timeline = props => {
    const [handleMouseUp, setHandler] = useState((() => null))
    
    return (
        <div className="timeline" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <Buttons />
            <Range setHandler={setHandler} />
        </div>
    )
}

export default Timeline
