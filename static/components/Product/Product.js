import React, { PropTypes } from 'react'
import './styles.scss'

export default function Product (props) {
    return (
        <div className="mui-col-xs-6 mui-col-s-4 mui-col-md-3 mui-col-lg-2 products-item">
            <div className="mui-panel">
                <div className="products-item__media">
                    <img className="ad" src={'/ad/?r=' + Math.floor(Math.random()*1000)}/>
                </div>
                <div className="products-item__content">
                    <h3 className="products-item__title">Item 1</h3>
                    <p className="products-item__size"><strong>Size:</strong> 16px</p>
                    <p className="products-item__price"><strong>Price:</strong> $3.51</p>
                    <p className="products-item__date"><strong>Date added:</strong> 3 days ago</p>
                </div>
            </div>
        </div>
    )
}