import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Product, AdItem, Loading } from 'components'
import './styles.scss'

function ProductsList ({productsData}) {
    const products = productsData.map((item, i) => (
        item.ad
            ? <AdItem key={i + '-ad'} src={item.src} />
            : <Product
                key={item.id}
                price={item.price}
                size={item.size}
                face={item.face}
                date={item.date} />
    ))

    return (
        <ReactCSSTransitionGroup
            component='div' className='anim-wrapper'
            transitionName='itemShow'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {products}
        </ReactCSSTransitionGroup>
    )
}

ProductsList.propTypes = {
    productsData: PropTypes.array.isRequired
}

ProductsGrid.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isAppending: PropTypes.bool.isRequired,
    isEnd: PropTypes.bool.isRequired,
    productsData: PropTypes.array.isRequired
}

export default function ProductsGrid ({isLoading, isAppending, isEnd, productsData}) {
    return (
        <div className={'products-grid' + (isAppending ? ' isAppending' : '')}>
            {isLoading
                ? <Loading />
                : <ProductsList productsData={productsData} />}

            {isAppending ? <Loading /> : null}
            {isEnd
                ? <p className='products-grid__end'>{'~ end of catalogue ~'}</p>
                : null}
        </div>
    )
}
