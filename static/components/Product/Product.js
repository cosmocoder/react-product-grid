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
        <div className='mui-col-xs-6 mui-col-s-4 mui-col-md-3 mui-col-lg-2 products-item'>
            <div className='mui-panel'>
                <div className='products-item__media'>
                    <img className='ad' src={'/ad/?r=' + Math.floor(Math.random() * 1000)}/>
                    <span>{face}</span>
                </div>
                <div className='products-item__content'>
                    <h3 className='products-item__title'>Item 1</h3>
                    <p className='products-item__size'><strong>Size:</strong> {size}</p>
                    <p className='products-item__price'><strong>Price:</strong> {formatPrice(price)}</p>
                    <p className='products-item__date'><strong>Date added:</strong> {formatDate(date)}</p>
                </div>
            </div>
        </div>
    )
}
