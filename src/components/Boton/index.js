import React from 'react'
import './index.css'

export default function Boton(props) {
    const { texto, tipo, onClick } = props

    return (
        <button className={tipo} onClick={onClick}>
            { texto }
        </button>
    )
}
