import React, { PropTypes } from 'react'
import { Product } from 'components'

ProductsGrid.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    productsData: PropTypes.array.isRequired
}

export default function ProductsGrid ({isLoading, productsData}) {
    const products = productsData.map((item) => (
        <Product
            key={item.id}
            price={item.price}
            size={item.size}
            face={item.face}
            date={item.date} />
    ))

    return (
        <div className='products-grid'>
            {isLoading === true
                ? 'Loading...'
                : <div className='mui-row'>
                    {products}
                </div>}
        </div>
    )
}
