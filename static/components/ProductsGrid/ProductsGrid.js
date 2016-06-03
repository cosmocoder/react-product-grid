import React, { PropTypes } from 'react'
import { Product, Loading } from 'components'
import './styles.scss'

ProductsGrid.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAppending: PropTypes.bool.isRequired,
    productsData: PropTypes.array.isRequired
}

export default function ProductsGrid ({isLoading, isAppending, productsData}) {
    const products = productsData.map((item) => (
        <Product
            key={item.id}
            price={item.price}
            size={item.size}
            face={item.face}
            date={item.date} />
    ))

    if (isAppending === true) {
        return (
            <div className='products-grid isAppending'>
                {products}
                <Loading />
            </div>
        )
    }
    else if (isLoading === true) {
        return (
            <div className='products-grid'>
                <Loading/>
            </div>
        )
    }
    else {
        return (
            <div className='products-grid'>
                {products}
            </div>
        )
    }
}
