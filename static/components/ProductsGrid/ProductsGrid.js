import React, { PropTypes } from 'react'
import { Product, Loading } from 'components'
import './styles.scss'

ProductsGrid.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAppending: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    productsData: PropTypes.array.isRequired
}

export default function ProductsGrid ({isLoading, isAppending, isEnd, productsData}) {
    const products = productsData.map((item) => (
        <Product
            key={item.id}
            price={item.price}
            size={item.size}
            face={item.face}
            date={item.date} />
    ))

    if (isAppending) {
        return (
            <div className='products-grid isAppending'>
                {products}
                <Loading />
            </div>
        )
    }
    else if (isEnd) {
        return (
            <div className='products-grid'>
                {products}
                <p className='products-grid__end'>{'~ end of catalogue ~'}</p>
            </div>
        )
    }
    else if (isLoading) {
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
