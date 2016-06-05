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

    var output = []

    if (isAppending) {
        output = products.concat(<Loading key='append-loader'/>)
    }
    else if (isEnd) {
        output = products.concat(<p key='end-msg' className='products-grid__end'>{'~ end of catalogue ~'}</p>)
    }
    else if (isLoading) {
        output = <Loading/>
    }
    else {
        output = products
    }

    const transitionDuration = isLoading || isAppending || isEnd ? 100 : 500

    return (
        <div className={isAppending ? 'products-grid isAppending' : 'products-grid'}>
            {isLoading ? output
                : <ReactCSSTransitionGroup
                component='div' className='anim-wrapper'
                transitionName='itemShow'
                transitionAppear={true}
                transitionAppearTimeout={transitionDuration}
                transitionEnterTimeout={transitionDuration}
                transitionLeaveTimeout={transitionDuration}>
                {output}
            </ReactCSSTransitionGroup>}
        </div>
    )
}
