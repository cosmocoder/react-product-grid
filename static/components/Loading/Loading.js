import React, { PropTypes } from 'react'
import './styles.scss'

export default function Loading (props) {
    return (
        <div className='loader'>
            <svg className='circular'>
                <circle
                    className='path'
                    cx='50'
                    cy='50'
                    r='20'
                    fill='none'
                    strokeWidth='4'
                    strokeMiterlimit='10'/>
            </svg>
        </div>
    )
}
