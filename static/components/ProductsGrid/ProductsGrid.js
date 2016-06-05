import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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

    return (
        <div className={isAppending ? 'products-grid isAppending' : 'products-grid'}>
            {isLoading
                ? <Loading />
                : <ReactCSSTransitionGroup
                    component='div' className='anim-wrapper'
                    transitionName='itemShow'
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {products}
                </ReactCSSTransitionGroup>}

            {isAppending ? <Loading /> : null}
            {isEnd
                ? <p key='end-msg' className='products-grid__end'>{'~ end of catalogue ~'}</p>
                : null}
        </div>
    )
}
