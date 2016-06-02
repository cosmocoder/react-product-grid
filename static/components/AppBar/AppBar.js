import React, { PropTypes } from 'react'
import './styles.scss'

export default function AppBar (props) {
    return (
        <div className='mui-appbar products-menu'>
            <ul>
                <li className='products-menu__sort dropdown-button'>
                    <button className='mui--appbar-line-height ripple-effect'>
                        <span>Sort</span>
                        <i className='material-icons right'>arrow_drop_down</i>
                        <i className='material-icons icon-sort'>sort</i>
                    </button>
                    <ul className='dropdown'>
                        <li className='active'>
                            <button className='ripple-effect' data-sort='original'>Original</button>
                        </li>
                        <li>
                            <button className='ripple-effect' data-sort='size'>Size</button>
                        </li>
                        <li>
                            <button className='ripple-effect' data-sort='price'>Price</button>
                        </li>
                        <li>
                            <button className='ripple-effect' data-sort='id'>ID</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}
