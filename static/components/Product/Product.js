import React, { PropTypes } from 'react'
import { formatPrice, formatDate } from 'utils/productHelper'
import './styles.scss'

Product.propTypes = {
    face: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
}

export default function Product ({face, size, price, date}) {
    return (
        <div className='products-item'>
            <div className='mui-panel'>
                <div className='products-item__media mui--divider-bottom'>
                    <span style={{fontSize: size}}>{face}</span>
                </div>
                <div className='products-item__content'>
                    <p className='products-item__size'><strong>Size:</strong> {size}</p>
                    <p className='products-item__price'><strong>Price:</strong> {formatPrice(price)}</p>
                    <p className='products-item__date'><strong>Date added:</strong> {formatDate(date)}</p>
                </div>
            </div>
        </div>
    )
}
