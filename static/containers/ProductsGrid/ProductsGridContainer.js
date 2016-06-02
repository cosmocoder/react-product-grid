import React, { PropTypes } from 'react'
import { ProductsGrid } from 'components'
import { getProducts } from 'utils/productHelper'
import './styles.scss'

const ProductsGridContainer = React.createClass({
    propTypes: {
        limit: PropTypes.number
    },

    getDefaultProps () {
        return {
            limit: 20
        }
    },

    getInitialState () {
        return {
            isLoading: true,
            productsData: [],
            page: 1
        }
    },

    componentDidMount () {
        getProducts(this.props.limit, this.state.page)
            .then((data) => (
                this.setState({
                    isLoading: false,
                    productsData: data,
                    page: this.state.page + 1
                })
            ))
    },

    render () {
        return (
            <ProductsGrid productsData={this.state.productsData} isLoading={this.state.isLoading} />
        )
    }
})

export default ProductsGridContainer
