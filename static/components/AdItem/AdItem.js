import React, { PropTypes } from 'react'
import './styles.scss'

AdItem.propTypes = {
    src: PropTypes.string.isRequired
}

export default function AdItem ({src}) {
    return (
        <div className='products-item products-item--ad'>
            <div className='mui-panel products-item__panel'>
                <div className='products-item__media'>
                    <img src={src} alt='Some ad' />
                </div>
            </div>
        </div>
    )
}
