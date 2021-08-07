import React, { useState, useEffect } from 'react'
import './style.scss'

// import Timeline from '../../lib/timeline'

const Track = ({ val }) => {


    return (
        <div className="track">
            <div className="runnable" style={{ width: val + '%' }}></div>
        </div>
    )
}

const Thumb = ({ val, setBool }) => {

    return (
        <div
            className="thumb" style={{ left: val + '%' }}
            onMouseDown={() => setBool(true)}
        ></div>
    )
}

const Range = ({ setHandler }) => {
    const [val, setVal] = useState(50)
    const [bool, setBool] = useState(false)

    useEffect(() => {
        const handler = () => setBool(false)
        setHandler(() => handler)
    }, [setHandler])

    return (
        <div
            className="range"
            onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX
                const p = 100 * (x - rect.left) / rect.width
                if (bool && p >= 0 && p <= 100) setVal(p)
            }}
        >
            <Track val={val}  />
            <Thumb val={val} setBool={setBool} />
        </div>
    )
}

export default Range
